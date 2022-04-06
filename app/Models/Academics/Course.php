<?php

namespace App\Models\Academics;

use App\Models\General\Department;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'code',
        'name',
        'description',
        'department_id',
        'credit_hours',
    ];

    public function canDelete()
    {
        $ret = [];
        if ($this->term_classes()->count())
            array_push(
                $ret,
                ['Cannot be deleted. Classes registered with this course.']
            );
        return $ret;
    }

    public function term_classes()
    {
        return $this->hasMany(TermClass::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }


}
