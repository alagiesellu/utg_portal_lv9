<?php

namespace App\Http\Controllers\Api\Academic;

use App\Models\General\Profile;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StudentsController extends Controller
{
    private $with = [
        'set',
        'department',
        'grades.grading_system',
        'grades.class_registration.term_class.course',
        'grades.term_class.assessments',
        'grades.term_class.term',
        'grades.term_class.course',
    ];
    private $error = [
        ['Student profile not found.']
    ];

    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('scope:ac-1');
    }

    public function index()
    {
        return response()->json([
            'users' => User::where('profile_type', 's')->orderByDesc('id')->paginate(),
        ]);
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
        ])->with($this->with)->first();

        return response()->json([
            'user' => $user,
            'profile' => $profile,
        ]);
    }
}
