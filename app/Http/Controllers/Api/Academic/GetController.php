<?php

namespace App\Http\Controllers\Api\Academic;

use App\Models\Academics\ClassLecturer;
use App\Models\Academics\Term;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GetController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function current_classes(Request $request)
    {
        return response()->json([
            'classes' =>
                ClassLecturer::with('term_class.course')
                    ->where([
                        ['profile_id', $request->user()->profile_id],
                        ['active', 1],
                    ])->get()
        ]);
    }
}
