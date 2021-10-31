<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Requests\SignupRequest;
use App\Http\Requests\LoginRequest;

use App\Repositories\UserRepository;

use Hash;

class AuthController extends Controller{
    private $userRepository;
    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }

    // using FormRequest for validations
    public function signup(SignupRequest $req) {
        // adding user
        $data = $req->only("name", "email");
        $data['password'] = Hash::make($req->password);

        $user = $this->userRepository->create($data);

        return response()->custom("Signup successful", true, 200, compact("user"));
    }

    public function login(LoginRequest $req) {
        if(auth()->attempt($req->only("email", 'password'))) {
            $user = auth()->user();

            // issuing token
            $token =  $user->createToken(config('app.name'))->plainTextToken;
            return response()->custom("Login successful", true, 200, compact("token", "user"));
        }

        return response()->custom("Incorrect Password !!", false, 403);
    }

    public function logout(Request $req) {
        $auth_user = auth()->user();
        $auth_user->tokens()->delete();

        return response()->custom("logged out.", true);
    }
}
