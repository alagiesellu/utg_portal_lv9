<?php

namespace App\Models\Academics;

use App\Models\General\Profile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClassRegistration extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'term_class_id',
        'profile_id',
        'approved_by_profile_id',
        'active',
    ];

    protected $cast = [
        'active' => 'boolean',
    ];

    public function canDelete()
    {
        $ret = [];

        return $ret;
    }

    public function grades()
    {
        return $this->hasOne(Grade::class);
    }

    public function term_class()
    {
        return $this->belongsTo(TermClass::class);
    }

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }
}
