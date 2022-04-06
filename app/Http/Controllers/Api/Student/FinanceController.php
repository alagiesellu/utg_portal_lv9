<?php

namespace App\Http\Controllers\Api\Student;

use App\Models\General\Profile;
use App\Models\Academics\Term;
use App\Models\Finance\Payment;
use App\Models\Finance\TermReceipt;
use App\Models\General\Option;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use phpseclib\System\SSH\Agent\Identity;

class FinanceController extends Controller
{
    private $with = [
        'set',
        'department',
        'payments',
        'term_receipts.term',
    ];

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
        $user = $request->user();

        $profile = Profile::where([
            ['type', 's'],
            ['user_id', $user->id]
        ])->with($this->with)->first();

        return response()->json([
            'user' => $user,
            'profile' => $profile,
        ]);
    }

    public function get_payment($id)
    {
        return response()->json([
            'payment' => Payment::with([
                'cancelled_by_admin_profile.user',
                'admin_profile.user',
            ])->find($id),
        ]);
    }

    public function get_receipt($id)
    {
        return response()->json([
            'receipt' => TermReceipt::with([
                'term',
                'cancelled_by_admin_profile.user',
                'admin_profile.user',
            ])->find($id),
        ]);
    }
}
