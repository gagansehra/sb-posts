import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MyHeader() {
    function logout() {
        axios.delete("/auth/logout")
        .then(response => {
            localStorage.clear();
            window.location = '/sb-posts/cliet/login'
        });
    }

    return (
        <header>
            <Navbar>
                <Container>
                    <Navbar.Brand href="#home">SB Posts</Navbar.Brand>
                    <Navbar.Toggle />
                    {localStorage.getItem('token') && (<Navbar.Collapse className="justify-content-end">
                        <Navbar.Brand className="mr-2">
                            <h3>{JSON.parse(localStorage.getItem("user")).name}</h3>
                        </Navbar.Brand>
                        <Navbar.Brand className="mr-2">
                            <Link to="/posts/create" className="btn btn-success">Add Post</Link>
                        </Navbar.Brand>
                        <Navbar.Text>
                            <Button onClick={logout} className="btn btn-danger">Logout</Button>
                        </Navbar.Text>
                    </Navbar.Collapse>)}

                    {!localStorage.getItem('token') && (<Navbar.Text>
                        <Link to="/signup" className="btn btn-success text-white">Signup</Link>
                    </Navbar.Text>)}
                </Container>
            </Navbar>
        </header>
    );
}

export default MyHeader;