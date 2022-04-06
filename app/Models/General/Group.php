<?php

namespace App\Models\General;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Group extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name',
        'description',
        'department_id',
        'roles',
    ];

    protected $casts = [
        'roles' => 'array',
    ];

    public function canDelete()
    {
        $ret = [];
        if ($this->profiles()->count())
            array_push(
                $ret,
                ['Cannot be deleted. Profiles registered with this group.']
            );
        return $ret;
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function profiles()
    {
        return $this->hasMany(Profile::class);
    }
}
