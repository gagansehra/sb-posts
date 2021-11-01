import axios from 'axios';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function LoginForm() {
    if(localStorage.getItem("token")) {
        <Redirect to="/posts" />
    }
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function login(event) {
        event.preventDefault();

        axios.post("/auth/login", {
            email, password
        })
        .then(response => response.data)
        .then(response => { 
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            window.location = "/sb-posts/client/posts";
        })
        .catch(exception => setError(exception.response.data.message));
    }

    return (
        <div className="std_div">
            <h3 className="mb-4">Login</h3>
            <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={(event) => {setEmail(event.target.value)}} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(event) => {setPassword(event.target.value)}} type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            {error && (<div class="alert alert-danger mt-2">{error}</div>)}
        </div>
    );
}

export default LoginForm;