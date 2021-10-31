<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Post;

class DatabaseSeeder extends Seeder {
    public function run() {
        // adding some users and posts of those users
        User::factory(3)
            ->has(Post::factory()->count(1))
            ->create();
    }
}
