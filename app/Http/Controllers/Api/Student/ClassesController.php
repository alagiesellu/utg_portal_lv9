<?php

namespace App\Http\Controllers\Api\Student;

use App\Http\Controllers\Api\Admin\LogController;
use App\Models\Academics\ClassRegistration;
use App\Models\Academics\Grade;
use App\Models\Academics\TermClass;
use App\Models\General\ClassFile;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class ClassesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
//        $this->middleware('scope:s-1');
    }

    public function index(Request $request)
    {
        return response()->json([
            'class_registrations' => ClassRegistration::with([
                'term_class.course',
                'term_class.venue',
            ])->where('profile_id', $request->user()->profile_id)->orderByDesc('id')->paginate(),
        ]);
    }

    public function show(Request $request, $id)
    {
        $user = $request->user();
        $term_class = TermClass::with([
            'course',
            'term',
            'venue',
            'class_registrations',
            'class_lecturers.profile.user',
        ])->find($id);

        return response()->json([
            'term_class' => $term_class,
            'user' => [
                'can_reg' => $user->canRegister($term_class->term_id, $id),
                'registrations' => $user->profile->class_registrations->where('active', 1)->where('term_class_id', $id),
            ],
        ]);
    }

    public function files(Request $request, $id)
    {
        return response()->json([
            'files' => ClassFile::with('profile.user')->where('term_class_id', $id)->orderByDesc('id')->paginate(),
        ]);
    }

        public function grades(Request $request, $id)
    {
        return response()->json([
            'grades' => Grade::
                with('term_class.assessments')->
                where([
                    ['term_class_id', $id],
                    ['student_profile_id', $request->user()->profile_id],
                ])->first(),
        ]);
    }

    public function register(Request $request)
    {
        $request['class'] = TermClass::with(['assessments','course'])->find($request['class']);
        $validator = Validator::make($request->all(), [
            'class' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        abort_errors_if(
            !Carbon::parse($request['class']->term->registration_deadline)->isFuture(),
            [['Un registration deadline has elapsed!']]
        );

        $user = User::with('profile.set')->find($request->user()->id);
        $can_reg = $user->canRegister($request['class']->term_id, $request['class']->id);

        abort_errors_if(
            !$can_reg['value'],
            [[$can_reg['reasons']]]
        );

        $createClearance = $user->profile->createClearance($request['class']->term_id);

        abort_errors_if(
            count($createClearance),
            $createClearance
        );

        $cr = ClassRegistration::create([
            'term_class_id' => $request['class']->id,
            'profile_id' => $user->profile_id,
        ]);

        LogController::logModel($user->id, 'create', $cr);

        $scores = [];

        foreach ($request['class']->assessments as $assessment)
            $scores[$assessment->id] = null;

        $grade = Grade::create([
            'term_class_id' => $request['class']->id,
            'student_profile_id' => $user->profile_id,
            'grading_system_id' => $user->profile->set->grading_system_id,
            'class_registration_id' => $cr->id,
            'scores' => $scores,
        ]);

        LogController::logModel($user->id, 'create', $grade);

        return response()->json([
            'success' => 'You have successfully registered for '. $request['class']->course->name,
        ]);
    }

    public function unregister(Request $request)
    {
        $request['class'] = TermClass::with('course')->find($request['class']);
        $validator = Validator::make($request->all(), [
            'class' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        abort_errors_if(
            !Carbon::parse($request['class']->term->unregistration_deadline)->isFuture(),
            [['Un registration deadline has elapsed!']]
        );

        $user = $request->user();

        $cr = ClassRegistration::where([
            'term_class_id' => $request['class']->id,
            'profile_id' => $user->profile_id,
        ])->first();

        $grade = Grade::where('class_registration_id', $cr->id)->first();

        LogController::logModel($user->id, 'delete', $grade);
        $grade->delete();

        LogController::logModel($user->id, 'delete', $cr);
        $cr->delete();

        return response()->json([
            'success' => 'You have successfully unregistered for '. $request['class']->course->name,
        ]);
    }
}
