<?php

namespace App\Models\General;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Venue extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name',           // room name
        'type',         // auditorium, class, lab
        'description',  // description, useful info
        'address',      // address, campus, building, etc
        'capacity',     // maximum capacity
    ];

    public function canDelete()
    {
        $ret = [];

        return $ret;
    }
}
