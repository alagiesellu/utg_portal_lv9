<?php

namespace App\Http\Controllers\Api\Admin\Finance;

use App\Http\Controllers\Api\Admin\LogController;
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

class FinanceController extends Controller
{
    private $with = [
        'set',
        'department',
        'payments',
        'term_receipts.term',
    ];
    private $error = [['Student profile not found.']];

    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('scope:ad-17')->only(['search','show','get_payment','get_receipt']);
        $this->middleware('scope:ad-18')->only('payment');
        $this->middleware('scope:ad-19')->only('clearance');
        $this->middleware('scope:ad-20')->only('cancel_payment');
        $this->middleware('scope:ad-21')->only('cancel_receipt');
    }

    public function search(Request $request)
    {
        $user = User::where('num', $request['search'])->first();

        abort_errors_if(
            is_null($user),
            $this->error
        );

        $profile = Profile::with($this->with)->where([
            ['type', 's'],
            ['user_id', $user->id]
        ])->first();


        abort_errors_if(
            is_null($profile),
            $this->error
        );

        return response()->json([
            'user' => $user,
            'profile' => $profile,
        ]);
    }

    public function show($id)
    {
        $user = User::where('num', $id)->first();

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

    public function cancel_payment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $user = $request->user();
        abort_errors_if(
            $user->checkPassword($request['password'])['code'] != 202,
            [['Invalid password confirmation.']]
        );

        $payment = Payment::find($request['id']);

        $payment->update([
            'cancelled_by_admin_profile_id' => $user->profile_id
        ]);

        LogController::logModelArray($user->id, 'update', [
            [
                'id' => $payment->id,
                'cancelled_by_admin_profile_id' => $user->profile_id
            ]
        ], new Payment());

        return response()->json([
            'success' => 'Payment successfully cancelled.',
        ]);
    }

    public function cancel_receipt(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $user = $request->user();
        abort_errors_if(
            $user->checkPassword($request['password'])['code'] != 202,
            [['Invalid password confirmation.']]
        );

        $receipt = TermReceipt::find($request['id']);

        $receipt->update([
            'cancelled_by_admin_profile_id' => $user->profile_id
        ]);

        LogController::logModelArray($user->id, 'update', [
            [
                'id' => $receipt->id,
                'cancelled_by_admin_profile_id' => $user->profile_id
            ]
        ], new TermReceipt());

        return response()->json([
            'success' => 'Clearance successfully cancelled.',
        ]);
    }

    public function payment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'amount' => 'required|numeric|min:0',
            'currency' => 'required|in:GMD,$',
            'student_profile_id' => 'required',
            'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $user = $request->user();
        abort_errors_if(
            $user->checkPassword($request['password'])['code'] != 202,
            [['Invalid password confirmation.']]
        );

        $profile = Profile::with('user')->find($request['student_profile_id']);

        abort_errors_if(
            !$profile || $profile->type != 's',
            [['Invalid student profile.']]
        );

        $rate = null;

        if ($profile->user->nationality != 'GM')
            $rate = Option::where('key', 'exchange_rate')->first()->value;

        $payment = Payment::create([
            'admin_profile_id' => $user->id,
            'student_profile_id' => $request['student_profile_id'],
            'currency_key' => $request['currency'],
            'rate' => $rate,
            'amount' => $request['amount'],
        ]);

        LogController::logModel($user->id, 'create', $payment);

        return response()->json([
            'success' => 'Payment successfully recorded.',
            'profile' => Profile::with($this->with)->find($request['student_profile_id']),
            'user' => $profile->user,
        ]);
    }

    public function clearance(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'term_id' => 'required',
            'currency' => 'required|in:GMD,$',
            'student_profile_id' => 'required',
            'password' => 'required',
        ]);

        abort_errors_if(
            $validator->fails(),
            $validator->errors()->toArray()
        );

        $user = $request->user();
        abort_errors_if(
            $user->checkPassword($request['password'])['code'] != 202,
            [['Invalid password confirmation.']]
        );

        $profile = Profile::with([
            'user',
            'department',
        ])->find($request['student_profile_id']);

        abort_errors_if(
            is_null($profile) || $profile->type != 's',
            [['Invalid student profile.']]
        );

        $term = Term::find($request['term_id']);
        abort_errors_if(
            is_null($term),
            [['Invalid academic term selected.']]
        );

        abort_errors_if(
            !Carbon::parse($term->registration_deadline)->isFuture(),
            [['The registration deadline of this academic term has passed.']]
        );

        $rate = null;

        if ($profile->user->nationality != 'GM') {
            $rate = Option::where('key', 'exchange_rate')->first()->value;
            $local_foreign = 'foreign';
        } else {
            $local_foreign = 'local';
        }
        if ($term->pay_per_class)
            $request['amount'] = 0;
        else {
            abort_errors_if(
                !$profile->department->is_major || !$profile->department->fee_per_term,
                [['Invalid student profile major.']]
            );

            $request['amount'] = $profile->department->fee_per_term[$local_foreign];
        }

        abort_errors_if(
            $profile->term_receipts()->where('term_id', $request['term_id'])->count(),
            [['Student is already cleared for this academic term.']]
        );

        $receipt = TermReceipt::create([
            'term_id' => $request['term_id'],
            'admin_profile_id' => $user->id,
            'student_profile_id' => $request['student_profile_id'],
            'currency_key' => $request['currency'],
            'rate' => $rate,
            'amount' => $request['amount'],
        ]);

        LogController::logModel($user->id, 'create', $receipt);

        return response()->json([
            'success' => 'Payment successfully recorded.',
            'profile' => Profile::with($this->with)->find($request['student_profile_id']),
            'user' => $profile->user,
        ]);
    }
}
