import {Card, Badge, Button} from 'react-bootstrap';
import { Link} from 'react-router-dom';
import type {Post} from '../types/post';

type PostCardProps = {
    post: Post;
};

export default function PostCard({post}: PostCardProps) {
    return(
        <Card className="mb4 shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center">
                <strong>@{post.user?.nickName || 'Usuario Desconocido'}</strong>
                <small className="text-muted">
                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}
                </small>
            </Card.Header>
            {post.images && post.images.length > 0 && (
                <Card.Img variant="top" src={post.images[0]} alt="Post image" style={{maxHeight: '400px', objectFit: 'cover'}} />
            )}
            <Card.Body>
                <Card.Text>{post.description}</Card.Text>
                <div className="mb-3">
                    {post.tags?.map((tag) =>(
                        <Badge bg="secondary" className="me-1" key={tag._id}>
                            #{tag.nombre}
                        </Badge>
                    ))}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                        {post.commentsCount || 0} comentarios
                    </small>
                    <Link to={`/post/${post._id}`}>
                        <Button variant="outline-primary" size="sm">
                        Ver más 
                        </Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
}