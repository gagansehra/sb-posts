<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable {
    use HasApiTokens, HasFactory, Notifiable;

    protected $guarded = [];

    protected $hidden = [
        'password',
        'remember_token',
        "updated_at"
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // setting a getter for created_at
    public function getCreatedAtAttribute($date) {
        return \Carbon\Carbon::parse($date)->format('d M, Y | H:i');
    }

    public function posts() {
        return $this->hasMany(Post::class, "user_id");
    }

    public function followers() {
        return $this->hasMany(Follower::class);
    }

    public function followees() {
        return $this->hasMany(Follower::class, "follower_id");
    }

    // for custom pagination
    public function scopeCustomPaginate($query, $page = 1, $limit = 10) {
        $page = $page && intval($page) ? intval($page) : 1;
        $limit = $page && intval($limit) ? intval($limit) : 10;

        $skip = ($page - 1) * $limit;

        return $query->skip($skip)
            ->limit($limit);
    }
}
