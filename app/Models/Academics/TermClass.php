<?php

namespace App\Models\Academics;

use App\Models\General\Profile;
use App\Models\General\ClassFile;
use App\Models\General\Venue;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TermClass extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'course_id',
        'term_id',
        'venue_id',
        'times',
        'size',
        'term_class_id',
    ];

    protected $casts = [
        'times' => 'array',
    ];

    public function canDelete()
    {
        $ret = [];

        return $ret;
    }

    public function delete()
    {
        ClassFile::where("term_class_id", $this->id)->delete();
        Assessment::where("term_class_id", $this->id)->delete();
        Grade::where("term_class_id", $this->id)->delete();
        ClassRegistration::where("term_class_id", $this->id)->delete();
        ClassLecturer::where("term_class_id", $this->id)->delete();

        // delete the user
        return parent::delete();
    }

    public function scores()
    {
        $score = 0;
        foreach ($this->assessments as $assessment)
            $score += $assessment->score;

        return $score;
    }

    public function class_files()
    {
        return $this->hasMany(ClassFile::class);
    }

    public function assessments()
    {
        return $this->hasMany(Assessment::class);
    }

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }

    public function class_registrations()
    {
        return $this->hasMany(ClassRegistration::class, 'term_class_id');
    }

    public function class_lecturers()
    {
        return $this->hasMany(ClassLecturer::class, 'term_class_id');
    }

    public function term_class()
    {
        return $this->belongsTo(TermClass::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function term()
    {
        return $this->belongsTo(Term::class);
    }

    public function venue()
    {
        return $this->belongsTo(Venue::class)->withDefault([
            'name' => 'Venue unassigned.',
            'type' => '',
            'description' => '',
            'address' => '',
            'capacity' => '',
        ]);
    }
}
