<?php

namespace App\Http\Requests;

class CreatePostRequest extends BaseRequest {
    public function authorize() {
        return true;
    }

    public function rules(){
        return [
            "content" => "required|min:10|max:1000"
        ];
    }
}
