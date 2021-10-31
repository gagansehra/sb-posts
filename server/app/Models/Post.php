<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends BaseModel {
    use HasFactory;

    protected $guarded = [];

    protected $hidden = [
        "user_id",
        "updated_at"
    ];

    public function getCreatedAtAttribute($date) {
        return \Carbon\Carbon::parse($date)->format('d M, Y | H:i');
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
