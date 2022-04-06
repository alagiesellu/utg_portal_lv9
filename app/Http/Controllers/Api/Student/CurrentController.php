<?php

namespace App\Http\Controllers\Api\Student;

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

    public function calendar(Request $request)
    {
        $now = now();
        $assessments = [];
        foreach (
            ClassRegistration::with(['term_class.assessments','term_class.term','term_class.course'])->where('profile_id', $request->user()->profile_id)->get()
            as $cr)
            if ($cr->term_class->term->starting_at <= $now && $cr->term_class->term->ending_at >= $now)
                foreach ($cr->term_class->assessments as $assessment) {
                    $assessment->course = $cr->term_class->course;
                    array_push($assessments, $assessment);
                }

        return response()->json([
            'assessments' => $assessments
        ]);
    }
}
