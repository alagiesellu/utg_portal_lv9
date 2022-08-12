<?php

namespace App\Models\General;

use App\Http\Controllers\Api\Admin\LogController;
use App\Models\Students\Set;
use App\Models\Academics\ClassRegistration;
use App\Models\Academics\Grade;
use App\Models\Academics\Term;
use App\Models\Finance\Payment;
use App\Models\Finance\TermReceipt;
use App\Models\General\ClassFile;
use App\Models\General\Option;
use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Log;

// retire
class Profile extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'roles',
        'active',
        'type',
        'set_id',
        'user_id',
        'department_id',
        'major_department_id',
        'minor_department_id',
        'group_id',
        'enrolled_at',
        'completed_at',
    ];

    protected $casts = [
        'roles' => 'array',
        'active' => 'boolean',
    ];

    public function createClearance($term_id)
    {
        if ($this->term_receipts()->where('term_id', $term_id)->count() === 0)
        {
            $rate = null;
            $currency = 'GMD';
            $local_foreign = 'local';
            if ($this->user->nationality != 'GM')
            {
                $currency = '$';
                $local_foreign = 'foreign';
                $rate = Option::where('key', 'exchange_rate')->first()->value;
            }
            $term = Term::find($term_id);
            if ($term->pay_per_class)
                $amount = 0;
            else {
                if (!$this->major_department->is_major)
                    return [['Invalid student major.']];
                else {
                    $amount = $this->department->fee_per_term[$local_foreign];
                    Log::info($this->department);
                    Log::info($local_foreign);
                }
            }
            $term_receipt = TermReceipt::create([
                'term_id' => $term_id,
                'admin_profile_id' => 0,
                'student_profile_id' => $this->id,
                'currency_key' => $currency,
                'rate' => $rate,
                'amount' => $amount ?: 0,
            ]);

            LogController::logModel($this->user_id, 'create', $term_receipt);
        }
        return [];
    }

    public function checkClearance($term_id, $class_term_id = null)
    {

        $errors = [];
        return $errors;
        $balance = 0;

        foreach ($this->payments as $payment)
            if ($payment->cancelled_by_admin_profile_id === null)
                $balance += $payment->amount;

        foreach ($this->term_receipts as $term_receipt)
            if ($term_receipt->cancelled_by_admin_profile_id === null)
                $balance -= $term_receipt->amount;

        $term = Term::find($term_id);
        $local_foreign = $this->user->nationality === 'GM' ? 'local':'foreign';
        $ppc = Option::where('key', 'ppc')->first();

        if (
            TermReceipt::where([
                ['term_id', $term_id],
                ['student_profile_id', $this->id],
                ['cancelled_by_admin_profile_id', null]
            ])->count() === 0
        )
        {
            if ($term->pay_per_class)
            { // summer semester
                array_push($errors, ['Summer semesters not supported yet.']);
            }
            else
            { // normal semester
                if ($balance < (($ppc->value/100)*$this->major_department->fee_per_term[$local_foreign]))
                    array_push($errors, ['You don\'t have clearance to register for a class.']);
            }
        }

        return $errors;
    }

    public function canDelete()
    {
        $ret = [];

        $grade_count = 0;
        foreach ($this->grades as $grade)
            $grade_count += 1;

        if ($grade_count)
            array_push($ret, ["{$grade_count} grade/s recorded."]);

        if (count($ret))
            array_push($ret, ["Cannot delete {$this->type()} profile."]);

        return $ret;
    }

    public function type()
    {
        switch ($this->type)
        {
            case 'ad':
                return 'admin';

            case 'ac':
                return 'academic';

            default:
                return 'student';
        }
    }

    public function class_registrations()
    {
        return $this->hasMany(ClassRegistration::class);
    }

    public function class_files()
    {
        return $this->hasMany(ClassFile::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'student_profile_id');
    }

    public function term_receipts()
    {
        return $this->hasMany(TermReceipt::class, 'student_profile_id');
    }

    public function set()
    {
        return $this->belongsTo(Set::class);
    }

    public function grades()
    {
        return $this->hasMany(Grade::class, 'student_profile_id')->where('resit_grade_id', null);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function major_department()
    {
        return $this->belongsTo(Department::class);
    }

    public function minor_department()
    {
        return $this->belongsTo(Department::class);
    }

    public function group()
    {
        return $this->belongsTo(Group::class);
    }
}
