<?php

namespace App\Http\Controllers\Web\Student;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MainController extends Controller
{
    public function index()
    {
        return view('student.index', [
            'component' => 'student/index'
        ]);
    }

    public function view($url)
    {
        return view('student.index', [
            'component' => 'student/'.$url
        ]);
    }

    public function profile()
    {
        return view('student.index', [
            'component' => 'Profile'
        ]);
    }
}
