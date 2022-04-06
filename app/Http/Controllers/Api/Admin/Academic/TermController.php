<?php

namespace App\Http\Controllers\Api\Admin\Academic;

use App\Http\Controllers\Api\Admin\LogController;
use App\Models\General\Department;
use App\Models\Students\Set;
use App\Models\Academics\Assessment;
use App\Models\Academics\Grade;
use App\Models\Academics\Term;
use App\Models\Academics\TermClass;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class TermController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('scope:ad-0')->only(['index','show']);
//        $this->middleware('scope:ad-12')->except(['index','show','addLecturer']);
        $this->middleware('scope:ad-6')->only('addLecturer');
        $this->middleware('scope:ad-3')->only('external_grades');
        $this->middleware('scope:ad-4')->only(['storeRotation','editRotation']);
    }

    public function index(Request $request)
    {
        $term = Term::with(['department','set'])->where('department_id', '!=', null);

        if ($request->query('search'))
            $term->where('name', 'LIKE', '%'.$request->query('search').'%');

        return response()->json([
            'terms' => $term->orderByDesc('id')->paginate()
            //'terms' => Term::with(['department','set'])->whereDate('ending_at', '>', Carbon::now()->addMonths(-1))->orderByDesc('id')->paginate(),
        ]);
    }

    public function show(Request $request, $id)
    {

        $term = Term::with(['department','set.profiles', 'terms'])->find($id);

        $term->departments_excepted = $term->departments_excepted();
//        $term->departments_only = $term->departments_only();
//        $term->sets_excepted = $term->sets_excepted();
//        $term->sets_only = $term->sets_only();

        return response()->json([
            'term' => $term,
        ]);
    }

    public function external_grades(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'course' => 'required',
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

        $term_class = TermClass::with(['term.set.profiles', 'assessments'])->find($request['course']);
        abort_errors_if(
            is_null($term_class) || is_null($term_class->term),
            [['Invalid course selected.']]
        );

        if (!is_null($term_class->term->external_exam_percentage))
        {
            if (count($term_class->assessments) < 1) {

                $assessment = Assessment::create([
                    'name' => $term_class->term->name.': External Exams',
                    'term_class_id' => $term_class->id,
                    'lecturer_profile_id' => $request->user()->profile_id,
                    'starting_at' => now(),
                    'ending_at' => now(),
                    'info' => '',
                    'score' => $term_class->term->external_exam_percentage,
                ]);

                $grades = [];

                foreach ($term_class->term->set->profiles as $profile)
                    array_push(
                        $grades,
                        [
                            'term_class_id' => $term_class->id,
                            'student_profile_id' => $profile->id,
                            'class_registration_id' => 0,
                            'scores' => '{"'.$assessment->id.'":null}',
                            'grading_system_id' => $term_class->term->set->grading_system_id,
                        ]
                    );
                Grade::insert($grades);
            } else {

                $assessment = null;
                if (!is_null($term_class))
                    $assessment = Assessment::where('term_class_id', $term_class->id)->first();
            }

            Log::info(Grade::where('term_class_id', $term_class->id)->count());

            return response()->json([
                'term' => $term_class->term,
                'term_class' => $term_class,
                'grades' => Grade::with('student_profile.user')->where('term_class_id', $term_class->id)->get(),
                'assessment' => $assessment,
                'yours' => $assessment->lecturer_profile_id == $user->profile_id
            ]);
        }
    }

    public function storeRotation(Request $request)
    {
        $request['term'] = Term::find($request['id']);
        $validator = Validator::make($request->all(), [
            'term' => 'required',
            'name' => 'required|max:225',
            'starting_at' => 'required|date',
            'ending_at' => 'required|date',
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

        $term = Term::create([
            'name' => $request['name'],
            'starting_at' => $request['starting_at'],
            'ending_at' => $request['ending_at'],
            'term_id' => $request['id'],
            'set_id' => $request['term']->set_id,
            'registration_required' => 0,
        ]);

        LogController::logModel($user->id, 'create', $term);

        return response()->json([
            'success' => $request['name'] . ' rotation successfully created.',
            'terms' => Term::where('term_id', $request['id'])->get(),
            //'terms' => Term::with('department')->whereDate('ending_at', '>', Carbon::now()->addMonths(-1))->orderByDesc('id')->paginate(),
        ]);
    }

    public function editRotation(Request $request)
    {
        $term = Term::find($request['id']);

        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:terms',
            'name' => 'required|max:225',
            'starting_at' => 'required|date',
            'ending_at' => 'required|date',
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

        $term->update([
            'name' => $request['name'],
            'starting_at' => $request['starting_at'],
            'ending_at' => $request['ending_at'],
        ]);

        LogController::logModel($user->id, 'update', $term);

        return response()->json([
            'success' => $request['name'] . ' rotation successfully created.',
            'terms' => Term::where('term_id', $request['id'])->get(),
            //'terms' => Term::with('department')->whereDate('ending_at', '>', Carbon::now()->addMonths(-1))->orderByDesc('id')->paginate(),
        ]);
    }

    public function store(Request $request)
    {

        if ($request['pay_per_class'] == null)
            $request['pay_per_class'] = false;

        if ($request['registration_required'] == null)
            $request['registration_required'] = false;

        $reg_val = '';
        if ($request['registration_deadline'] != null)
            $reg_val = 'required|date';//|after:starting_at|before:ending_at';

        $unreg_val = '';
        if ($request['unregistration_deadline'] != null)
            $unreg_val = 'required|date';//|after:starting_at|before:ending_at';

        $exams_val = '';
        $set_val = '';
        if ($request['external_exam_percentage'] != null) {
            $exams_val = 'required|numeric|min:0|max:100';
            $set_val = 'required|exists:sets,id';
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:225',
            'starting_at' => 'required|date',
            'ending_at' => 'required|date',
            'registration_deadline' => $reg_val,
            'unregistration_deadline' => $unreg_val,
            'department_id' => 'required|exists:departments,id',
            'external_exam_percentage' => $exams_val,
            'set_id' => $set_val,
//            'pay_per_class' => 'required|boolean',
            //*pass 'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $user = $request->user();

        // if don't have "Admin: CUD Semester" role and creating semester
        abort_forbidden_if(
            $request['external_exam_percentage'] == null && !$user->haveScope('ad-1')
        );

        // if don't have "Admin: Medical Year" role and creating medical year
        abort_forbidden_if(
            $request['external_exam_percentage'] != null && !$user->haveScope('ad-2')
        );

////*pass         abort_errors_if(
//            $user->checkPassword($request['password'])['code'] != 202,
//            [['Invalid password confirmation.']]
//        );

        $term = Term::create([
            'name' => $request['name'],
            'starting_at' => $request['starting_at'],
            'ending_at' => $request['ending_at'],
            'registration_deadline' => $request['registration_deadline'],
            'unregistration_deadline' => $request['unregistration_deadline'],
            'department_id' => $request['department_id'],
            'registration_required' => $request['registration_required'],
//            'pay_per_class' => $request['pay_per_class'],
            'external_exam_percentage' => $request['external_exam_percentage'],
            'set_id' => $request['set_id'],
        ]);

        LogController::logModel($user->id, 'create', $term);

//        $set = Set::with('profile')->find();
//        if (!$request['registration_required'] and $set) {
//
//
//        }

        return response()->json([
            'success' => $request['name'] . ' successfully created.',
            'term' => $term,
            //'terms' => Term::with('department')->whereDate('ending_at', '>', Carbon::now()->addMonths(-1))->orderByDesc('id')->paginate(),
        ]);
    }

    public function edit(Request $request)
    {
        $term = Term::with('department')->find($request['id']);

        if ($request['pay_per_class'] == null)
            $request['pay_per_class'] = false;

        $reg_val = '';
        $unreg_val = '';
        if ($request['registration_required']) {
            $reg_val = 'required|date';//|after:starting_at|before:ending_at';
            $unreg_val = 'required|date';//|after:starting_at|before:ending_at';
        } else {
            $request['registration_deadline'] = null;
            $request['unregistration_deadline'] = null;
        }

        $exams_val = '';
        $set_val = '';
        if ($request['external_exam_percentage'] != null) {
            $exams_val = 'required|numeric|min:0|max:100';
            $set_val = 'required|exists:sets,id';
        }

        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:terms',
            'name' => 'required|max:225',
            'starting_at' => 'required|date',
            'ending_at' => 'required|date',
            'registration_deadline' => $reg_val,
            'unregistration_deadline' => $unreg_val,
            'department_id' => 'required|exists:departments,id',
            'external_exam_percentage' => $exams_val,
            'set_id' => $set_val,
//            'pay_per_class' => 'required|boolean',
            'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        // if don't have "Admin: CUD Semester" role and creating semester
        abort_forbidden_if (
            $request['external_exam_percentage'] == null && !$request->user()->haveScope('ad-1')
        );

        // if don't have "Admin: Medical Year" role and creating medical year
        abort_forbidden_if (
            $request['external_exam_percentage'] != null && !$request->user()->haveScope('ad-2')
        );

        $user = $request->user();
        abort_errors_if(
            $user->checkPassword($request['password'])['code'] != 202,
            [['Invalid password confirmation.']]
        );

        $term->update([
            'name' => $request['name'],
            'starting_at' => $request['starting_at'],
            'ending_at' => $request['ending_at'],
            'registration_deadline' => $request['registration_deadline'],
            'unregistration_deadline' => $request['unregistration_deadline'],
            'department_id' => $request['department_id'],
            'registration_required' => $request['registration_required'],
//            'pay_per_class' => $request['pay_per_class'],
            'external_exam_percentage' => $request['external_exam_percentage'],
            'set_id' => $request['set_id'],
        ]);

        LogController::logModel($user->id, 'update', $term);

        return response()->json([
            'success' => $request['name'] . ' successfully edited.',
            'terms' => Term::with('department')->whereDate('ending_at', '>', Carbon::now()->addMonths(-1))->orderByDesc('id')->paginate(),
            'term' => $term,
        ]);
    }

    public function destroy(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:terms',
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

        $term = Term::find($request['id']);

        $can_delete = $term->canDelete();

        abort_errors_if(
            count($can_delete),
            $can_delete
        );

        $term_name = $term->name;

        LogController::logModel($user->id, 'delete', $term);

        $term->delete();

        return response()->json([
            'success' => $term_name . ' successfully deleted.',
            //'terms' => Term::with('department')->whereDate('ending_at', '>', Carbon::now()->addMonths(-1))->orderByDesc('id')->paginate(),
        ]);
    }

    public function storeAdd(Request $request)
    {

        $departments = Department::where('is_admin', 0)->orderByDesc('id')->paginate();

        $departments_excepted = [];
        foreach ($departments as $department)
            if ($request['de_'.$department->id])
                array_push($departments_excepted, $department->id);

        $term = Term::find($request['id']);

        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:terms',
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

        $term->update([
            'departments_excepted' => $departments_excepted,
        ]);

        LogController::logModelArray($user->id, 'delete', [
            [
                'id' => $term->id,
                'departments_excepted' => $departments_excepted,
            ]
        ], new Term());

        return response()->json([
            'success' => 'Departments exception successfully updated.'
        ]);
    }

    public function getAddList(Request $request, $type, $id)
    {
        $term = Term::find($id);

        return response()->json([
            // don't paginate, because this getting list of academics departments when storing exceptions
            'list' => Department::whereNotIn('id', $term->departments_excepted)->where('is_admin', 0)->get(),
        ]);
    }
}
