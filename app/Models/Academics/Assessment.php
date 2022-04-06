<?php

namespace App\Models\Academics;

use App\Models\General\Profile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Assessment extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name',
        'term_class_id',
        'lecturer_profile_id',
        'starting_at',
        'ending_at',
        'info',
        'score',
    ];

    protected $casts = [
//        'starting_at' => 'datetime:dS/m/Y - H:i',
//        'ending_at' => 'datetime:dS/m/Y - H:i',
    ];

    public function canDelete(): array
    {
        $ret = [];

        foreach (Grade::where('term_class_id', $this->term_class_id)->get() as $grade)
            if ($grade->scores[$this->id] != null)
                array_push($ret, ['Grades already recorded for this assessment.']);

        return $ret;
    }

    public function term_class()
    {
        return $this->belongsTo(TermClass::class);
    }

    public function lecturer_profile()
    {
        return $this->belongsTo(Profile::class);
    }
}
