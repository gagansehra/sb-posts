<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory {
    public function definition() {
        return [
            'content' => $this->faker->paragraph(mt_rand(1, 5))
        ];
    }
}
