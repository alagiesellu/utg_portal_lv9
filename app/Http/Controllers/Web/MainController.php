<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;

/**
 * Open web controlling
 */
class MainController extends Controller
{
    public function welcome()
    {
        return view('welcome');
    }

    public function private()
    {
        return view('private');
    }
    public function password()
    {
        return redirect(url(config('app.auth.address').'/auth/public/forget-password/redirect='.request()->getHttpHost()));
    }
    public function public()
    {
        return view('public');
    }
}
