<?php

namespace App\Http\Controllers;

use App\Models\Follower;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;

use App\Repositories\FollowerRepository;
use App\Repositories\UserRepository;

class FollowerController extends Controller {
    public function create(User $user) {
        $auth_user = auth()->user();

        // checking if user is following himself
        if($auth_user->id === $user->id) {
            return response()->custom("You cannot follow yourself !!", false, 400);
        }

        // checking if already followed
        if($auth_user->followees()->where(["user_id" => $user->id])->first()) {
            return response()->custom("Already Followed !!", false, 409);
        }

        $auth_user->followees()->create(["user_id" => $user->id]);
        $user->update(["follower_count" => $user->follower_count + 1]);

        return response()->custom("Followed", true);
    }

    // to fetch only those users which are not followed by auth user
    public function userList(Request $req) {
        $users = UserRepository::usersToFollow($req->page, $req->limit);

        return response()->custom("Users fetched", true, 200, compact("users"));
    }
}
