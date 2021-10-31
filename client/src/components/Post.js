import { Card } from 'react-bootstrap';

function Post({ post }) {
    console.log("SINGLE", post);

    return (
        <Card className="shadow mb-4 bg-white rounded">
            <Card.Header># {post.id}</Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                <p>
                    <small>{post.content}</small>
                </p>
                <footer className="blockquote-footer" style={{textAlign: "right"}}>
                    {post.user.name}
                </footer>
                </blockquote>
            </Card.Body>
        </Card>
    );
}

export default Post;