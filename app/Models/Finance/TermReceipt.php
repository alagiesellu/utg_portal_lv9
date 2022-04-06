<?php

namespace App\Models\Finance;

use App\Models\General\Profile;
use App\Models\Academics\Term;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TermReceipt extends Model
{
    protected $fillable = [
        'term_id',
        'admin_profile_id',
        'cancelled_by_admin_profile_id',
        'student_profile_id',
        'currency_key',
        'rate',
        'amount',
    ];

    public function canDelete()
    {
        $ret = [];

        return $ret;
    }

    public function term()
    {
        return $this->belongsTo(Term::class);
    }

    public function admin_profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function cancelled_by_admin_profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function student_profile()
    {
        return $this->belongsTo(Profile::class);
    }
}
