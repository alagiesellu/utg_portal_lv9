<?php

namespace App\Models\General;

use App\Models\General\Profile;
use App\Models\Academics\TermClass;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ClassMail extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'term_class_id',
        'profile_id',
        'subject',
        'message',
    ];

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function term_class()
    {
        return $this->belongsTo(TermClass::class);
    }
}
