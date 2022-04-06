<?php

namespace App\Http\Controllers\Api\Admin\Academic;

use App\Http\Controllers\Api\Admin\LogController;
use App\Models\General\Profile;
use App\Models\Academics\Assessment;
use App\Models\Academics\Grade;
use App\Models\Academics\Term;
use App\Models\Academics\TermClass;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class GradeApprovalController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('scope:ad-23.2');
    }

    public function store(Request $request)
    {
        $user = $request->user();
////*pass         abort_errors_if(
//            $user->checkPassword($request['password'])['code'] != 202,
//            [['Invalid password confirmation.']]
//        );

        $logs = [];

        DB::beginTransaction();
        try {

            foreach ($request['grades'] as $grade)
            {
                DB::table((new Grade())->getTable())->where('id', $grade)->update([
                        'approved_by_profile_id' => $user->profile_id,
                    ]);

                array_push($logs, [
                    'id' => $grade,
                    'approved_by_profile_id' => $user->profile_id,
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
            'success' => 'Grades successfully approved',
        ]);
    }

    public function terms()
    {
        return response()->json([
            'terms' => Term::get()
//                whereDate('ending_at', '<', now())
//                ->whereDate('ending_at', '>=', now()->addYears(-1))
//                ->get(),
        ]);
    }

    public function classes($term)
    {
        return response()->json([
            'term_classes' => TermClass::with('course')->where('term_id', $term)->get(),
            'term' => Term::find($term),
        ]);
    }

    public function grades($class)
    {
        return response()->json([
            'term_class' => TermClass::with(['course','term'])->find($class),
            'grades' => Grade::with(['student_profile.user','uploaded_by_profile.user'])->where('term_class_id', $class)->get(),
        ]);
    }
}
