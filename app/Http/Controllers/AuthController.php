<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Laravel\Socialite\Facades\Socialite;

/**
 * Basic open api request:
 *      :no middleware
 *
 *      login(Request)  :   authenticate from auth service
 *
 */
class AuthController extends Controller
{
    public function auth_redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function auth_callback(): JsonResponse
    {
        try {
            $user = Socialite::driver('google')->user();

            $email = $user->getEmail();

            if (
                explode('@', $email)[1] !== config('data.utg.domain')
            )
                return response()->json([
                    'error' => [
                        'Only UTG emails are allowed to sign in.',
                    ]
                ]);

            $user = \App\User::firstOrCreate(
                [
                    'email' => $email
                ],
                [
                    '_id' => $user->getId(),
                    'name' => $user->getName(),
                    'roles' => [],
                ]
            );

            return response()->json(['success' => [
                'token' => $user->createToken('token', $user->roles)->accessToken,
            ]]);
        } catch (\Exception $exception) {
            return response()->json([
                'error' => [
                    'Fail to sign in. Try again.',
                ]
            ]);
        }
    }
}
