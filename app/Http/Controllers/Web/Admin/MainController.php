<?php

namespace App\Http\Controllers\Web\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MainController extends Controller
{
    public function index()
    {
        return view('admin.index');
    }

    public function view($url)
    {
        return view('admin.index', [
            'component' => 'admin/'.$url
        ]);
    }

    public function profile()
    {
        return view('admin.index', [
            'component' => 'Profile'
        ]);
    }
}
