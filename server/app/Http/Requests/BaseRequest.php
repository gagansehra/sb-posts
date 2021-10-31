<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest as BaseFormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Hashing\Hasher;
use Illuminate\Validation\Factory as ValidationFactory;

/**
 * for overriding original formRequest
 */
class BaseRequest extends BaseFormRequest{
    protected function failedValidation(Validator $validator) {
        throw new HttpResponseException(response()->custom($validator->errors()->first(), false, 400));
    }
}
