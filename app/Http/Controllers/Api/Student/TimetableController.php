<?php

namespace App\Http\Controllers\Api\Student;

use App\Models\Academics\TermClass;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TimetableController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request, $term)
    {
        return response()->json([
            'term_classes' => TermClass::with([
                'course', 'venue'
            ])->where('term_id', $term)->get(),
        ]);
    }

    public function term($term)
    {
        return response()->json([
            'term_class' => TermClass::with([
                'course',
                'venue',
                'class_lecturers.profile.user'
            ])->find($term),
        ]);
    }
}
