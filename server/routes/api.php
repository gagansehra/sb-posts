<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group(["namespace" => 'App\Http\Controllers'], function() {
    Route::group(["prefix" => "auth"], function() {
        Route::post("signup", "AuthController@signup");
        Route::post("login", "AuthController@login");
    });

    Route::group(['middleware' => ['auth:sanctum']], function() {
        Route::group(["prefix" => "posts"], function() {
            Route::post("/", "PostController@create");
            Route::get("/", 'PostController@list');
        });
    
        Route::group(["prefix" => "/users"], function() {
            Route::get("/", "FollowerController@userList");
            Route::post("/{user}/follow", "FollowerController@create");
        });

        Route::delete("auth/logout", "AuthController@logout");
    });
});
