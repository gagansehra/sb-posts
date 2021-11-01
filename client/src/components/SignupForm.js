import axios from 'axios';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
const navigate = useNavigate()

function SignupForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");

    function signup(event) {
        event.preventDefault();

        axios.post("/auth/signup", {
            name, email, password
        })
        .then(response => navigate("/sb-posts/client/login"))
        .catch(exception => setError(exception.response.data.message));
    }

    return (
        <div className="std_div">
            <h3>Signup</h3>
            <Form onSubmit={signup}>
                <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control onChange={(event) => {setName(event.target.value)}} type="text" placeholder="Enter Full Name" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={(event) => {setEmail(event.target.value)}} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
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

export default SignupForm;