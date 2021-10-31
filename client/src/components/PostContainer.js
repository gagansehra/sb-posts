import { useEffect, useState } from "react";
import Post from "./Post";
import axios from 'axios';

function PostContainer() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      axios.get("http://localhost/Learning/Laravel/sb-posts/server/api/posts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
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