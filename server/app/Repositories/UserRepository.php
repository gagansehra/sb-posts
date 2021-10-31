<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository {
    public function create($user) {
        return User::create($user);
    }

    public function findByCol($col, $val) {
        return User::where([$col => $val])
            ->first();
    }

    public function usersToFollow($page, $limit) {
        $auth_user = auth()->user();

        return User::select(["id", 'name', 'follower_count'])
            ->whereNotIn("id", function($query) use ($auth_user) {
                $query->select('user_id')
                    ->from('followers')
                    ->where('follower_id', $auth_user->id);
            })
            ->where("id", "!=", $auth_user->id)
            ->customPaginate($page, $limit)
            ->get();
    }
}