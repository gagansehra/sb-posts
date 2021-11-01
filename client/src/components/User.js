import axios from "axios";
import { useNavigate } from "react-router-dom";
const navigate = useNavigate()

function User({ user }) {
    function followUser(id) {
        axios.post(`/users/${id}/follow`, {})
        .then(response => navigate('/posts'));
    }

    return (
        <div className="user">
            <h3>{user.name}</h3>
            <button onClick={() => followUser(user.id)} className="btn btn-info text-white">Follow</button>
            <small className="mx-2">{user.follower_count} Followers</small> 
        </div>
    )
}

export default User