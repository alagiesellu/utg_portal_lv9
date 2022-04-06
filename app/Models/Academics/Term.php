<?php

namespace App\Models\Academics;

use App\Models\General\Department;
use App\Models\Students\Set;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Term extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name',
        'starting_at',
        'ending_at',
        'registration_deadline',
        'unregistration_deadline',
        'department_id', // under which is the term registered. Med/Nursing/UTG
        'departments_excepted',
        'departments_only',
        'sets_excepted',
        'set_id',
        'registration_required',
        'external_exam_percentage',
        'term_id',
        'pay_per_class',
    ];

    protected $casts = [
        // 'starting_at' => 'datetime:Y-m-d',
        // 'ending_at' => 'datetime:Y-m-d',
        'departments_excepted' => 'array',
        'departments_only' => 'array',
        'sets_excepted' => 'array',
        'registration_required' => 'boolean',
        'pay_per_class' => 'boolean',
    ];

    public function canDelete()
    {
        $ret = [];

        return $ret;
    }

    public function term_classes()
    {
        return $this->hasMany(TermClass::class, 'term_id');
    }

    public function departments_excepted()
    {
        return Department::find($this->departments_excepted);
    }

    public function departments_only()
    {
        return Department::find($this->departments_only);
    }

    public function sets_excepted()
    {
        return Set::find($this->sets_excepted);
    }

    public function sets_only()
    {
        return Set::find($this->sets_only);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function set()
    {
        return $this->belongsTo(Set::class);
    }

    public function term()
    {
        return $this->belongsTo(Term::class);
    }

    public function terms()
    {
        return $this->hasMany(Term::class);
    }
}
