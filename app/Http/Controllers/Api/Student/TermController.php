<?php

namespace App\Http\Controllers\Api\Student;

use App\Models\Academics\Term;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TermController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
        $now = Carbon::now();
        return response()->json([
            'terms' => Term::
                where('registration_required', 1)->
                whereDate('starting_at', '<=', $now)->
                whereDate('ending_at', '>=', $now)->
                paginate()
        ]);
    }

    public function show($id)
    {
        return response()->json([
            'term' => Term::find($id),
        ]);
    }
}
