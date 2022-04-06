<?php

namespace App\Models\Students;

use App\Models\General\Department;
use App\Models\General\Profile;
use App\Models\Academics\GradingSystem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Set extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name',
        'degree',
        'department_id',
        'school_department_id',
        'start_date',
        'expected_years',
        'grading_system_id'
    ];

    protected $casts = [
//        'start_date' => 'datetime:dS M, Y',
//        'expected_years' => 'year',
    ];

    public function canDelete()
    {
        $ret = [];
        if ($this->profiles()->count())
            array_push(
                $ret,
                ['Cannot be deleted. Profiles registered with this set.']
            );
        return $ret;
    }

    public function grading_system()
    {
        return $this->belongsTo(GradingSystem::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function school_department()
    {
        return $this->belongsTo(Department::class);
    }

    public function profiles()
    {
        return $this->hasMany(Profile::class);
    }
}
