<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Academics\ClassRegistration;
use App\Models\Academics\GradingSystem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CurrentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function department(Request $request)
    {
        return response()->json([
            'department' => $request->user()->profile->department,
        ]);
    }

    public function grading_systems(Request $request)
    {
        return response()->json([
            'grading_systems' => GradingSystem::where('active', 1)->get(),
        ]);
    }
}
