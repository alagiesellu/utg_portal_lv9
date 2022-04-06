<?php

namespace App\Models\Academics;

use App\Models\Students\Set;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GradingSystem extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name',
        'grades',
        'active',
    ];

    protected $casts = [
        'grades' => 'array',
    ];

    public function canDelete()
    {
        $ret = [];

        return $ret;
    }

    public function sets()
    {
        return $this->hasMany(Set::class);
    }
}
