<?php

namespace App\Http\Controllers\Api\Academic;

use App\Http\Controllers\Api\Admin\LogController;
use App\Models\Academics\Assessment;
use App\Models\Academics\Grade;
use DemeterChain\B;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class GradesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('scope:ac-3')->only('store');
    }

    public function get($id)
    {
        return response()->json([
            'grades' => Grade::with('student_profile.user')->where([
                ['term_class_id', $id],
                ['resit_grade_id', null]
            ])->get(),
        ]);
    }

    public function upload(Request $request)
    {
        return $request;
    }

    public function store(Request $request)
    {
        $user = $request->user();

// //*pass        abort_errors_if(
//            $user->checkPassword($request['password'])['code'] != 202,
//            [['Invalid password confirmation.']]
//        );

        $assignment = Assessment::find($request['assessment']);

        $errors = [
            'grades' => []
        ];

        if ($assignment['lecturer_profile_id'] != $user->profile_id)
            array_push($errors['grades'], 'You cannot upload grades. Assessment not created by you.');

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

        LogController::logModelArray($user->id, 'update', $logs, new Grade());

        return response()->json([
            'grades' => Grade::with('student_profile.user')->where('term_class_id', $assignment->term_class_id)->get(),
            'success' => 'Grades successfully updated.',
        ]);
    }
}
