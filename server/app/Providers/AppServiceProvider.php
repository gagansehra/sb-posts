<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Response;

class AppServiceProvider extends ServiceProvider {
    public function register() {
        //
    }

    // Registering custom response
    public function boot() {
        Response::macro('custom', function ($message, $success = true, $status = 200, $data = null) {
            return Response::json([
                "success" => $success,
                "message" => $message,
                "data" => $data ?? new \stdClass
            ], $status);
        });
    }
}
