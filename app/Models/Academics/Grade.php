<?php

namespace App\Models\Academics;

use App\Models\General\Profile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Grade extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'term_class_id',
        //'assessment_id',
        //'course_id',
        'student_profile_id',
        'class_registration_id',
        'scores',
        'grading_system_id',
        //'total_score',
        'uploaded_by_profile_id',
        'approved_by_profile_id',
        'resit_grade_id',
    ];

    protected $casts = [
        'scores' => 'array',
    ];

    public function canDelete()
    {
        $ret = [];

        return $ret;
    }

    public function delete()
    {
        Grade::where("resit_grade_id", $this->id)->delete();

        // delete the user
        return parent::delete();
    }

    public function resit_grades()
    {
        return $this->hasMany(Grade::class, 'resit_grade_id');//->orderByDesc();
    }

    public function grading_system()
    {
        return $this->belongsTo(GradingSystem::class);
    }

    public function class_registration()
    {
        return $this->belongsTo(ClassRegistration::class);
    }

    public function term_class()
    {
        return $this->belongsTo(TermClass::class);
    }

    public function student_profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function uploaded_by_profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function approved_by_profile()
    {
        return $this->belongsTo(Profile::class);
    }
}
