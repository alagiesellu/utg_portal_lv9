<?php

namespace App\Http\Controllers\Api\Admin\Academic;

use App\Http\Controllers\Api\Admin\LogController;
use App\Models\General\Profile;
use App\Models\Academics\Assessment;
use App\Models\Academics\ClassLecturer;
use App\Models\Academics\ClassRegistration;
use App\Models\Academics\Grade;
use App\Models\Academics\Term;
use App\Models\Academics\TermClass;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class TermClassController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('scope:ad-5')->only(['store','destroy']);
        $this->middleware('scope:ad-6')->only('addLecturer', 'registerSet');
        $this->middleware('scope:ad-5.1')->only('resetAssessment');
    }

    public function index(Request $request, $term)
    {
        return response()->json([
            'term' => Term::find($term),
            'class_terms' => TermClass::with(['course','venue'])->where('term_id', $term)->orderByDesc('id')->paginate()
        ]);
    }

    public function resetAssessment(Request $request)
    {
        $request['term_class'] =
            TermClass::with(['course','term','venue', 'class_lecturers.profile.user', 'assessments'])->find($request['term_class_id']);

        $request['assessment'] =
            $request['term_class']->assessments->where('id', $request['id'])->first();

        $validator = Validator::make($request->all(), [
            'term_class' => 'required',
            'assessment' => 'required',
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

        $request['assessment']->update([
            'score' => $request['score']
        ]);

        $grades_table_name = (new Grade())->getTable();
        DB::beginTransaction();
        try {

            abort_errors_if(
                DB::table($grades_table_name)->where([
                    ['term_class_id', $request['term_class_id']],
                    ['approved_by_profile_id', '!=', null]
                ])->count() != 0,
                [['Assessment cannot be reset.', 'At least a grade have being approved.']]
            );

            foreach (
                DB::table($grades_table_name)->where('term_class_id', $request['term_class_id'])->get() as $grade
            )
            {
                $scores = json_decode($grade->scores, true);
                $scores[$request['id']] = null;
                DB::table((new Grade())->getTable())
                    ->where('id', $grade->id)
                    ->update([
                        'scores' => json_encode($scores)
                    ]);
            }

            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception);
            abort_errors([['Operations fail. Try again!']]);
        }

        return response()->json([
            'success' => 'Assessment successfully reset..',
            'term_class' => $request['term_class'],
        ]);
    }

    public function show($id)
    {
        $term_class = TermClass::with(['course','term','venue', 'class_lecturers.profile.user', 'assessments', 'term_class.course'])->find($id);
        $term_class->taken = ClassRegistration::where([
            ['term_class_id', $id],
            ['active', 1],
        ])->count();
        return response()->json([
            'term_class' => $term_class,
        ]);
    }

    public function destroy(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
//            'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $user = $request->user();
//        abort_errors_if(
//            $user->checkPassword($request['password'])['code'] != 202,
//            [['Invalid password confirmation.']]
//        );

        $term_class = TermClass::find($request['id']);

        LogController::logModel($user->id, 'delete', $term_class);

        $can_delete = $term_class->canDelete();

        abort_errors_if(
            count($can_delete),
            $can_delete
        );

        $term_class->delete();

        return response()->json([
            'success' => 'Class successfully deleted.',
        ]);
    }

    /**
     * Assign lecturers (& teaching assistance) to classes
    */
    public function addLecturer(Request $request)
    {
        $request['term_class'] = TermClass::with(['course','term','venue', 'class_lecturers.profile.user'])->find($request['term_class_id']);

        $validator = Validator::make($request->all(), [
            'term_class' => 'required',
//            'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $user = $request->user();
//        abort_errors_if(
//            $user->checkPassword($request['password'])['code'] != 202,
//            [['Invalid password confirmation.']]
//        );

        if ($request['profile_id'])
        {
            abort_errors_if(
                ClassLecturer::
                where('term_class_id', $request['term_class_id'])->
                where('profile_id', $request['profile_id'])->
                where('active', 1)->count(),
                [['Duplicate course allocation cannot be done.']]
            );

            $cl = ClassLecturer::create([
                'term_class_id' => $request['term_class_id'],
                'profile_id' => $request['profile_id'],
            ]);

            LogController::logModel($user->id, 'create', $cl);
        }
        if ($request['remove_id'])
        {
            $cl = ClassLecturer::find($request['remove_id'])->delete();
            LogController::logModel($user->id, 'delete', $cl);
        }

        $request['term_class']->taken = ClassRegistration::where([
            ['term_class_id', $request['term_class_id']],
            ['active', 1],
        ])->count();

        return response()->json([
            'success' => 'Lecturer allocation successfully.',
            'term_class' => $request['term_class'],
        ]);
    }

    public function store(Request $request)
    {
        $request['term_id'] *= 1;
        $request['term'] = Term::with(['set.profiles', 'term'])->find($request['term_id']);

        $venue_id_val = $times_val = $major_course_id_val = '';
        if ($request['term']->term && $request['term']->term->external_exam_percentage && !is_null($request['major_course_id']))
            $major_course_id_val = 'required|exists:term_classes,id';

        if (is_null($request['term']->external_exam_percentage))
        {
            $venue_id_val = 'required|exists:venues,id';
            $times_val = 'required|array';
        } else {
            $request['times'] = null;
            $request['venue_id'] = 0;
        }

        $validator = Validator::make($request->all(), [
            'course_id' => 'required|exists:courses,id',
            'term' => 'required',
            'venue_id' => $venue_id_val,
            'major_course_id' => $major_course_id_val,
            'times' => $times_val,
            'size' => 'required|integer|min:0',
//            'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $check_dup = TermClass::
        //            where('course_id', $request['course_id'])->
        where('term_id', $request['term_id'])->
        where('venue_id', $request['venue_id'])->
        where('times', $request['times']);

        if ($request['term']->term && $request['term']->term->external_exam_percentage && !is_null($request['major_course_id']))
            $check_dup->where('term_class_id', $request['major_course_id']);

        abort_errors_if(
            $check_dup->count(),
            [['Duplicate class cannot be registered at the same time and venue.']]
        );

        $user = $request->user();
//        abort_errors_if(
//            $user->checkPassword($request['password'])['code'] != 202,
//            [['Invalid password confirmation.']]
//        );

        $tc = [
            'term_class_id' => $request['major_course_id'],
            'course_id' => $request['course_id'],
            'term_id' => $request['term_id'],
            'venue_id' => $request['venue_id'],
            'times' => json_encode($request['times']),
            'size' => $request['size'],
        ];

        DB::beginTransaction();
        try {

            $term_class_id = DB::table((new TermClass())->getTable())->insertGetId($tc);

            $tc['id'] = $term_class_id;

            if ($request['term']->set_id != null)
            {
                foreach ($request['term']->set->profiles as $profile)
                {
                    $class_registration_id = DB::table((new ClassRegistration())->getTable())
                        ->insertGetId([
                            'term_class_id' => $term_class_id,
                            'profile_id' => $profile->id,
                        ]);

                    DB::table((new Grade())->getTable())
                        ->insert([
                            'term_class_id' => $term_class_id,
                            'student_profile_id' => $profile->id,
                            'class_registration_id' => $class_registration_id,
                            'grading_system_id' => $request['term']->set->grading_system_id,
                            'scores' => '[]',
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                }
            }

            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception);
            abort_errors([['Operations fail. Try again!']]);
        }

        LogController::logModelArray($user->id, 'delete', [$tc], new TermClass());

        return response()->json([
            'success' => 'Cass successfully registered.',
        ]);
    }

    public function student($id, $class)
    {
        return response()->json([
            'profile' => Profile::with([
                'user',
                'grades',
            ])->find($id),
            'term_class' => TermClass::with([
                'term',
                'course',
                'venue',
                'assessments.lecturer_profile.user',
            ])->find($class),
            'grade' => Grade::with([
                'grading_system',
                'uploaded_by_profile.user',
            ])->where([
                'term_class_id' => $class,
                'student_profile_id' => $id,
            ])->first(),
        ]);
    }

    public function registrations($id)
    {
        return response()->json([
            'class_registrations' =>
                ClassRegistration::with(
                    [
                        'profile.user',
                        'profile.grades',
//                        'term_class.course',
//                        'term_class.term',
//                        'term_class.venue',
                    ]
                )->
                where([
                    ['term_class_id', $id],
                    ['active', 1]
                ])->orderByDesc('id')->paginate(),
        ]);
    }

    public function registrationsAll($id)
    {
        return response()->json([
            'class_registrations' => ClassRegistration::
            with([
                'profile.user',
//                'term_class.course',
//                'term_class.term',
//                'term_class.venue'
            ])->
            where([
                ['term_class_id', $id],
                ['active', 1]
            ])->get()
        ]);
    }


    public function registerSet(Request $request)
    {
        $request['class'] = TermClass::with([
            'assessments', 'course', 'term.set.profiles.user', 'term.term.set.profiles.user'
        ])->find($request['class']);

        $validator = Validator::make($request->all(), [
            'class' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        abort_errors_if(
            $this->registrationDeadlineHaveExpired($request['class']->term),
            [['Registration deadline has elapsed!']]
        );

        DB::transaction(function () use ($request) {

            $profiles = $this->getProfiles($request['class']);
            $auth_profile = $request->user()->profile;

            foreach ($profiles as $profile)
                $this->registerProfileToClass($profile, $request['class'], $auth_profile->id);

        });

        return response()->json([
            'term_class' => $request['class'],
            'success' => 'You have successfully registered all students to '. $request['class']->course->name,
        ]);
    }

    private function registerProfileToClass($profile, $class, $auth_profile_id)
    {
        $can_reg = $profile->user->canRegister($class->term_id, $class->id);

        abort_errors_if(
            !$can_reg['value'],
            [[$can_reg['reasons']]]
        );

        $createClearance = $profile->createClearance($class->term_id);

        abort_errors_if(
            count($createClearance),
            $createClearance
        );

        $cr = ClassRegistration::firstOrCreate([
            'term_class_id' => $class->id,
            'profile_id' => $profile->id,
            'approved_by_profile_id' => $auth_profile_id,
        ]);

        $scores = [];

        foreach ($class->assessments as $assessment)
            $scores[$assessment->id] = null;

        $grade = Grade::firstOrCreate([
            'term_class_id' => $class->id,
            'student_profile_id' => $profile->id,
            'grading_system_id' => $profile->set->grading_system_id,
            'class_registration_id' => $cr->id,
        ], [
            'scores' => $scores,
        ]);

        LogController::logModel($profile->user_id, 'create', $grade);
    }

    private function getProfiles($class)
    {
        $set = $class->term->set;

        if (is_null($set))
            $set = $class->term->term->set;

        return $set->profiles;
    }

    public function edit(Request $request)
    {
        $request['class'] = TermClass::find($request['id']*1);
        $validator = Validator::make($request->all(), [
            'class' => 'required',
            'venue_id' => 'required|exists:venues,id',
            'times' => 'required|array',
            'size' => 'required|integer|min:0',
            'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $user = $request->user();
        abort_errors_if(
            $user->checkPassword($request['password'])['code'] != 202,
            [['Invalid password confirmation.']]
        );

        $request['class']->update([
            'venue_id' => $request['venue_id'],
            'times' => $request['times'],
            'size' => $request['size'],
        ]);

        LogController::logModel($user->id, 'update', $request['class']);

        return response()->json([
            'success' => 'Class successfully updated.',
        ]);
    }

    private function registrationDeadlineHaveExpired($term): bool
    {
        if (is_null($term->registration_deadline))
            return false;

        return Carbon::parse($term->registration_deadline)->isPast();
    }
}
