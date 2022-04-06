<?php

namespace App\Http\Controllers\Web\Academic;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MainController extends Controller
{
    public function index()
    {
        return view('academic.index', [
            'component' => 'academic/index'
        ]);
    }

    public function view($url)
    {
        return view('academic.index', [
            'component' => 'academic/'.$url
        ]);
    }

    public function profile()
    {
        return view('academic.index', [
            'component' => 'Profile'
        ]);
    }
}
