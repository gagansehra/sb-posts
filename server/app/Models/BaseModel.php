<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model {
    use HasFactory;
    protected $guarded = [];

    // for custom pagination
    public function scopeCustomPaginate($query, $page = 1, $limit = 10) {
        $page = $page && intval($page) ? : 1;
        $limit = $limit && intval($limit) ? : 10;

        $skip = ($page - 1) * $limit;

        return $query->skip($skip)
            ->limit($limit);
    }
}
