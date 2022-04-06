<?php

namespace App\Http\Controllers\Api\Student;

use App\Models\General\Department;
use App\Models\General\Group;
use App\Models\General\Profile;
use App\Models\Students\Set;
use App\Models\Academics\ClassRegistration;
use App\Models\Academics\Term;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GetController extends Controller
{
    private $with = [
        'set',
        'department',
        'major_department',
        'minor_department',
        'grades.resit_grades',
        'grades.grading_system',
        'grades.class_registration.term_class.course',
        'grades.term_class.assessments',
        'grades.term_class.term',
        'grades.term_class.course',
    ];
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function transcript(Request $request)
    {
        $user = $request->user();

        $profile = Profile::where([
            ['type', 's'],
            ['user_id', $user->id],
            ['active', 1],
        ])->with($this->with)->first();

        return response()->json([
            'user' => $user,
            'profile' => $profile,
        ]);
    }

    public function current_classes(Request $request)
    {
        return response()->json([
            'classes' =>
                ClassRegistration::with('term_class.course')
                    ->where([
                        ['profile_id', $request->user()->profile_id],
                        ['active', 1],
                    ])->get()
        ]);
    }

    public function active_terms()
    {
        $now = Carbon::now();
        return response()->json([
            'terms' => Term::whereDate('starting_at', '<=', $now)->whereDate('ending_at', '>=', $now)->orderByDesc('id')->paginate(),
        ]);
    }
}
