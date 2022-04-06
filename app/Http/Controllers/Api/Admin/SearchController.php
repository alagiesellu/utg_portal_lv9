<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Academics\Course;
use App\Models\General\Venue;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SearchController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function courses(Request $request)
    {
        return response()->json([
            'courses' => Course::
            where('code', 'LIKE', '%'.$request['search'].'%')->
            orWhere('name', 'LIKE', '%'.$request['search'].'%')->
            get()
        ]);
    }

    public function users(Request $request)
    {
        return response()->json([
            'users' => User::where('email', 'LIKE', '%'.$request['search'].'%')->get()
        ]);
    }

    public function venues(Request $request)
    {
        return response()->json([
            'venues' => Venue::where('name', 'LIKE', '%'.$request['search'].'%')->get()
        ]);
    }

    public function lecturers(Request $request)
    {
        $lecturers = [];

        foreach (
            User::with('profiles')
                ->where('email', 'LIKE', '%'.$request['search'].'%')
                ->orWhere('last_name', 'LIKE', '%'.$request['search'].'%')
                ->get()
            as $user
        )
        {
            foreach ($user->profiles as $profile)
                if ($profile->type == 'ac')
                {
                    array_push($lecturers, [
                        'user' => $user,
                        'profile' => $profile
                    ]);
                    break;
                }
        }

        return response()->json([
            'lecturers' => $lecturers
        ]);
    }
}
