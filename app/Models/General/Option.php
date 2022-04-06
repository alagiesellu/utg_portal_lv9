<?php

namespace App\Models\General;

use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    protected $fillable = [
        'key',
        'value',
    ];
}
