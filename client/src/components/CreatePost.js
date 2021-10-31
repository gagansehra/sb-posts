import axios from 'axios';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function CreatePost() {
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    function create(event) {
        event.preventDefault();

        axios.post("http://localhost/Learning/Laravel/sb-posts/server/api/posts", {
            content
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => window.location = "/posts")
        .catch(exception => setError(exception.response.data.message));
    }

    return (
        <div className="std_div">
            <h3>Add a new post</h3>
            <Form onSubmit={create}>
                <Form.Group className="mb-3">
                    <Form.Label>Enter Content</Form.Label>
                    <Form.Control onChange={(event) => { setContent(event.target.value) }} as="textarea" rows={3} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            {error && (<div class="alert alert-danger mt-2">{error}</div>)}
        </div>
    );
}

export default CreatePost;