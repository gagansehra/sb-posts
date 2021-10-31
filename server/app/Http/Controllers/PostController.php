<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\PostRepository;

use App\Http\Requests\CreatePostRequest;

class PostController extends Controller{
    private $postRepository;
    public function __construct(PostRepository $postRepository) {
        $this->postRepository = $postRepository;
    }

    public function create(CreatePostRequest $req) {
        $user = auth()->user();
        
        // adding post by current user
        $post = $user->posts()->create($req->only("content"));

        return response()->custom("Post created successfully", true, 200, compact("post"));
    }

    public function list(Request $req) {
        $posts = $this->postRepository->list($req->page, $req->limit);
        return response()->custom("Posts fetched", true, 200, compact("posts"));
    }
}
