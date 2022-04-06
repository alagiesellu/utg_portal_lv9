<?php

namespace App\Models\General;

use App\Models\Academics\Term;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Department extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name',
        'description',
        'department_id',
        'email',
        'tel',
        'is_admin',
        'is_major',
        'has_rotation',
        'fee_per_term',
    ];

    protected $casts = [
        'is_admin' => 'boolean',
        'is_major' => 'boolean',
        'has_rotation' => 'boolean',
        'fee_per_term' => 'array',
    ];

    public function canDelete()
    {
        $ret = [];

        return $ret;
    }

    public function groups()
    {
        return $this->hasMany(Group::class);
    }

    public function terms()
    {
        return $this->hasMany(Term::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function departments()
    {
        return $this->hasMany(Department::class);
    }
}
