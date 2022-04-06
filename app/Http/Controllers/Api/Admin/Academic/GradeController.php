<?php

namespace App\Http\Controllers\Api\Admin\Academic;

use App\Http\Controllers\Api\Admin\LogController;
use App\Models\General\Profile;
use App\Models\Academics\Assessment;
use App\Models\Academics\Grade;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class GradeController extends Controller
{
    private $with_simple = [
        'grades.term_class.term',
        'grades.term_class.course',
    ];
    private $with_detailed = [
        'resit_grades',
//        'grading_system',
        'class_registration.term_class.course',
        'term_class.assessments',
        'term_class.term',
        'term_class.course',
        'uploaded_by_profile.user',
        'approved_by_profile.user',
    ];

    private $error = [
        ['Student profile not found.']
    ];

    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('scope:ad-23')->only(['search','show','get']);
        $this->middleware('scope:ad-3')->only('external');
        $this->middleware('scope:ad-23.1')->only('update');
        $this->middleware('scope:ad-23.2')->only('approve');
    }

    public function external(Request $request)
    {
        $user = $request->user();
////*pass         abort_errors_if(
//            $user->checkPassword($request['password'])['code'] != 202,
//            [['Invalid password confirmation.']]
//        );

        $assignment = Assessment::find($request['assessment']);

        $errors = [
            'grades' => []
        ];

//        if ($assignment['lecturer_profile_id'] != $user->profile_id)
//            array_push($errors['grades'], 'You cannot upload grades. Assessment not created by you.');

        foreach ($request['grades'] as $grade) {
            if ($grade['scores'][$request['assessment']] < 0 || $grade['scores'][$request['assessment']] > $assignment->score)
                array_push($errors['grades'], 'Invalid grade');
        }

        abort_errors_if(
            count($errors['grades']),
            $errors
        );

        DB::beginTransaction();
        try {

            $column = 'scores->'.$request['assessment'];

            $logs = [];

            foreach ($request['grades'] as $grade)
            {
                DB::table((new Grade())->getTable())
                    ->where('id', $grade['id'])
                    ->whereJsonContains($column, null)
                    ->update([
                        'uploaded_by_profile_id' => $user->profile_id,
                        $column => $grade['scores'][$request['assessment']]
                    ]);

                array_push($logs, [
                    'id' => $grade['id'],
                    'scores' => $grade['scores'],
                    'uploaded_by_profile_id' => $user->profile_id,
                ]);
            }

            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception);
            abort_errors([['Operations fail. Try again!']]);
        }

        LogController::logModelArray($user->id, 'approve', $logs, new Grade());

        return response()->json([
            'grades' => Grade::with('student_profile.user')->where('term_class_id', $assignment->term_class_id)->get(),
            'success' => 'Grades successfully updated.',
        ]);
    }

    public function resit(Request $request)
    {
        $request['grade'] = Grade::find($request['grade_id']);
        $validator = Validator::make($request->all(), [
            'grade' => 'required',
            'score' => 'required|numeric',
            //*pass 'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $user = $request->user();
////*pass         abort_errors_if(
//            $user->checkPassword($request['password'])['code'] != 202,
//            [['Invalid password confirmation.']]
//        );

        abort_errors_if(
            $request['grade']->approved_by_profile_id != null,
            [[
                'Grade have already being approved.',
                'Grade resit cannot be added.'
            ]]
        );

        $grade = Grade::create([
            'term_class_id' => $request['grade']->term_class_id,
            'student_profile_id' => $request['grade']->student_profile_id,
            'class_registration_id' => $request['grade']->class_registration_id,
            'grading_system_id' => $request['grade']->grading_system_id,
            'uploaded_by_profile_id' => $user->profile_id,
            'scores' => [
                0 => $request['score']
            ],
            'resit_grade_id' => $request['grade']->id,
        ]);

        return response()->json([
            'success' => 'Resit grade successfully added.',
            'grade' => Grade::with($this->with_detailed)->find($request['grade']->id),
        ]);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'grade' => 'required|numeric',
            'score' => 'required|numeric',
            'assessment' => 'required|numeric',
            'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $user = $request->user();
////*pass         abort_errors_if(
//            $user->checkPassword($request['password'])['code'] != 202,
//            [['Invalid password confirmation.']]
//        );

        $grade = Grade::find($request['grade']);
        $assessment_score = 0;

        if ($request['assessment'] == 0)
        {
            $assessment = 0;
            $assessment_score = 100;
        }
        else
        {
            $assessment = Assessment::find($request['assessment']);
            if (!is_null($assessment))
                $assessment_score = $assessment->score;
        }

        abort_errors_if(
            $grade == null
            ||
            is_null($assessment)
            ||
            $request['score'] > $assessment_score,
            [['Bad request.']]
        );

        abort_errors_if(
            $grade->approved_by_profile_id != null,
            [[
                'Grade have already being approved.',
                'Grade cannot be updated.'
            ]]
        );

        $scores = $grade->scores;

        $scores[$request['assessment']] = $request['score'];

        $grade->update([
            'scores' => $scores,
        ]);

        return response()->json([
            'success' => 'Grade successfully updated.',
            'grade' => Grade::with($this->with_detailed)->find(
                $grade->resit_grade_id != null ? $grade->resit_grade_id : $grade->id
            ),
        ]);
    }

    public function search(Request $request)
    {
        $user = User::where('num', $request['search'])->first();

        abort_errors_if(
            is_null($user),
            $this->error
        );

        $profile = Profile::with($this->with_simple)->where([
            ['type', 's'],
            ['user_id', $user->id]
        ])->first();

        abort_errors_if(
            is_null($profile),
            $this->error
        );

        return response()->json([
            'user' => $user,
            'profile' => $profile,
        ]);
    }

    public function show($id)
    {
        $user = User::where('num', $id)->first();

        $profile = Profile::where([
            ['type', 's'],
            ['user_id', $user->id]
        ])->with($this->with_simple)->first();

        return response()->json([
            'user' => $user,
            'profile' => $profile,
        ]);
    }

    public function get($id)
    {
        return response()->json([
            'grade' => Grade::with($this->with_detailed)->find($id),
        ]);
    }

    public function approve(Request $request)
    {

    }
}
