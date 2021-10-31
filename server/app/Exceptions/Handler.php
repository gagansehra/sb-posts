<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable, ErrorException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Laravel\Socialite\Two\InvalidStateException;

// Global Exception handler
class Handler extends ExceptionHandler {
    protected $dontReport = [
        //
    ];

    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    public function report(Throwable $exception) {
        parent::report($exception);
    }

    // used response macro custom (defined in AppServiceProvider) to send customized response
    public function render($request, Throwable $exception){
        // for sennding 404 for an invalid URL
        if ($exception instanceof NotFoundHttpException){
            return response()->custom("I think you are lost", false, 404);
        }

        // for sending if resource not found if not found in DB
        if ($exception instanceof ModelNotFoundException){
            return response()->custom("Resource not found", false, 404);
        }

        // for sending exception if incorrect request method is used
        if ($exception instanceof MethodNotAllowedHttpException){
            return response()->custom($exception->getMessage(), false, 400);
        }

        // for handling INTERNEL SERVER ERROR
        if ($exception instanceof InvalidStateException || $exception instanceof ErrorException){
            return response()->custom("Something went wrong, please try again later !", 500);
        }

        return parent::render($request, $exception);
    }

    // for handling invalid token
    protected function unauthenticated($request, AuthenticationException $exception){
        return response()->custom('Session Expired', false, 401);
    }
}
