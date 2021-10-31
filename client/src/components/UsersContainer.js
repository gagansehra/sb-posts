import User from "./User";
import { useEffect, useState } from 'react';
import axios from "axios";

function PostContainer() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost/Learning/Laravel/sb-posts/server/api/users?page=1&limit=4", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => response.data)
        .then(response => setUsers(response.data.users));
    }, []);

    return (
        <div className='user-container'>
            {users.map((user) => {
                return <User user={user} />
            })}
            {!users.length && (<h4>No unfollowed users found !!</h4>)}
        </div>
    );
}

export default PostContainer;