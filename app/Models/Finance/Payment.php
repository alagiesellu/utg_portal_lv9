<?php

namespace App\Models\Finance;

use App\Models\General\Profile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    protected $fillable = [
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
