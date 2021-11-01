import { useEffect, useState } from "react";
import Post from "./Post";
import axios from 'axios';
import { Redirect } from "react-router-dom";

function PostContainer() {
  if(!localStorage.getItem("token")) {
    <Redirect to="/login" />
  }

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/posts")
    .then(response => response.data)
    .then(response => {
      setPosts(response.data.posts)
    });
  }, []);

  // fetchPosts();

  return (
      <div>
          {posts.map(post => {
              return <Post post={post} />
          })}

          {!posts.length && (<h4 className="p-5">Please follow some users to see their posts </h4>)}
      </div>
  );
}

export default PostContainer;