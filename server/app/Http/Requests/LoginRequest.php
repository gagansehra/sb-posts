<?php

namespace App\Http\Requests;

class LoginRequest extends BaseRequest {
    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            "email" => "required|email|exists:users,email|max:50",
            "password" => "required|string|min:6|max:20"
        ];
    }

    public function messages() {
        return [
            "email.exists" => "User not found with given email address !!"
        ];
    }
}
