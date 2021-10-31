<?php

namespace App\Http\Requests;

// using BaseRequest that extends the FormRequest
class SignupRequest extends BaseRequest {
    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            "name" => "required|string|max:100|regex:/^([a-zA-Z ]+)$/",
            "email" => "required|email|unique:users,email|max:50",
            "password" => "required|string|min:6|max:20"
        ];
    }
}
