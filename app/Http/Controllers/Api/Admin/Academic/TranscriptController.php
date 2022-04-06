<?php

namespace App\Http\Controllers\Api\Admin\Academic;

use App\Models\General\Profile;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TranscriptController extends Controller
{
    private $with = [
        'set.department',
        'set.school_department',
        'department',
        'major_department',
        'minor_department',
        'grades.resit_grades',
        'grades.grading_system',
        'grades.class_registration.term_class.course',
        'grades.term_class.assessments',
        'grades.term_class.term.term',
        'grades.term_class.term.terms',
        'grades.term_class.course',
    ];
    private $error = [
        'errors' => [
            ['Student profile not found.']
        ],
    ];

    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('scope:ad-15');
    }

    public function search(Request $request)
    {
        $user = User::where('num', $request['search'])->first();

        abort_errors_if(
            is_null($user),
            $this->error
        );

        $profile = Profile::with($this->with)->where([
                ['type', 's'],
                ['user_id', $user->id],
                ['active', 1],
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
            ['user_id', $user->id],
            ['active', 1],
        ])->with($this->with)->first();

        return response()->json([
            'user' => $user,
            'profile' => $profile,
        ]);
    }
}
