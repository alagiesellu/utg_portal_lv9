<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\RedirectResponse;

class OpenController extends Controller
{

    public function auth_redirect(): RedirectResponse|\Illuminate\Http\RedirectResponse
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

            $user = User::where('email', $email)->first();

            return response()->json(['success' => [
                'token' => $user->createToken('token', $user->profile->roles)->accessToken,
            ]]);
        } catch (\Exception $exception) {
            Log::info($exception);
            return response()->json([
                'error' => [
                    'Fail to sign in. Try again.',
                ]
            ]);
        }
    }
}
