<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DatabaseLog extends Model
{
    protected $fillable = [
        'user_id',
        'info',
        'data',
        'model',
        'model_id',
    ];

    protected $casts = [
        'data' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
