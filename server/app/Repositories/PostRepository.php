<?php

namespace App\Repositories;

use App\Models\Post;

class PostRepository {
    public function create($post) {
        return Post::create($post);
    }

    public function list($page, $limit) {
        $auth_user = auth()->user();

        // customPaginate is a scope defined in BaseModel
        return Post::with("user:id,name,follower_count")
            ->whereIn("user_id", function($query) use ($auth_user) {
                $query->select('user_id')
                    ->from('followers')
                    ->where('follower_id', $auth_user->id);
            })
            ->orWhere("user_id", $auth_user->id)
            ->orderByDesc("id")
            ->customPaginate($page, $limit)
            ->get();
        

        // sends extra keys
        // return Post::with("user:id,name")
        //     ->simplePaginate($limit);
    }
}