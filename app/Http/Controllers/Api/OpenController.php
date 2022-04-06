<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\General\Profile;
use App\User;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/**
 * Basic open api request:
 *      :no middleware
 *
 *      login(Request)  :   authenticate from auth service
 *
 */
class OpenController extends Controller
{
    public function login(Request $request)
    {

        $user = User::with('profile')->where('email', $request['username'])->first();

        if ($user == null) // 404 - Not Found
        {
            return response()->json([
                'error' => [
                    'Invalid username.',
                ]
            ]);
        }

        $response = $user->checkPassword($request['password']);

        if ($response == null)
        {
            return response()->json([
                'error' => [
                    'System Error. Report to system admin.',
                ]
            ]);
        }
        elseif ($response['code'] == 202) // 202 - Accepted
        {
            if (!$user->profile)
            {
                $profile = Profile::where('user_id', $user->id)->first();

                $user->update([
                    'profile_type' => $profile->type,
                    'profile_id' => $profile->id,

                ]);

                $user->profile = $profile;
            }

            return response()->json(['success' => [
                'user' => [
                    'name' => $user->name(),
                    'img' => $user->img(),
                    'email' => $user->email,
                    'roles' => $user->profile->roles,
                    'type' => $user->profile->type,
                    'token' => $user->createToken('token', $user->profile->roles)->accessToken,
                ]
            ]]);

        }
        elseif ($response['code'] == 404) // 404 - Not Found
        {
            return response()->json([
                'error' => [
                    'Invalid credentials.',
                ]
            ]);
        }

        elseif ($response['code'] == 'NC') // NC - Invalid Client
        {
            Log::emergency($response);

            return response()->json([
                'error' => [
                    'Report to system admin',
                ]
            ]);
        }
        else // 401 - Unauthorized
        {
            return response()->json([
                'error' => [
                    'Invalid credentials. Unknown.',
                ]
            ]);
        }
    }
}
