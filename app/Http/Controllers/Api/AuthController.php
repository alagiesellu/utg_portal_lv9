<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


/**
 * Basic authenticated api requests:
 *      :middleware(auth:api)
 *
 *      user(Request)   :   get authenticated user
 *      logout(Request) :   logout user, delete access token
 */
class AuthController extends Controller
{

    /**
     * Instantiate a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function loggedIn(Request $request)
    {
        return response()->json([
            'success' => 'authenticated',
        ]);
    }

    public function user(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'user' => [
                'name' => $user->name(),
                'img' => $user->img(),
                'email' => $user->email,
                'roles' => $user->profile->roles,
                'type' => $user->profile->type,
            ]
        ]);
    }

    public function logout(Request $request)
    {
        if ($request->user()->token()->delete())
            return response()->json([
                'success' => 'Successfully logged out.',
            ]);
    }
}
