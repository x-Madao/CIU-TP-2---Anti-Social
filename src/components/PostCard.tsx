import {useState, useContext} from 'react';
import {Card, Badge, Button, ButtonGroup, Modal} from 'react-bootstrap';
import { Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import { reactToPost} from '../services/postService';
import type {Post} from '../types/Post';

type PostCardProps = {
    post: Post;
};

const ANTI_REACTIONS = [
    { type: 'yawn', emoji: '🥱', label: 'Me aburre' },
    { type: 'angry', emoji: '😡', label: 'Me enoja' },
    { type: 'vomit', emoji: '🤮', label: 'Me da asco' },
    { type: 'boo', emoji: '👻', label: 'Abucheo' }
];
export default function PostCard({ post }: PostCardProps) {
    console.log(post);

    const auth = useContext(AuthContext);
    const [currentPost, setCurrentPost] = useState<Post>(post);
    const [isReacting, setIsReacting] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    
    const currentUserId = auth?.user?._id || (auth?.user as any)?.id;

    const handleReaction = async (reactionType: string) => {
        if (!currentUserId) {
            alert("Debes iniciar sesión para reaccionar.");
            return;
        }

        setIsReacting(true);
        try {
            const response = await reactToPost(currentPost._id, currentUserId, reactionType);
            
            if (response.data) {
                setCurrentPost((prevPost) => ({
                    ...response.data,   
                    user: prevPost.user, 
                    tags: prevPost.tags  
                }));
            }
        } catch (error) {
            console.error("Error al reaccionar:", error);
        } finally {
            setIsReacting(false);
        }
    };

    
    const countReactions = (type: string) => {
        return currentPost.reactions?.filter(r => r.reactionType === type).length || 0;
    };

    
    const hasReacted = (type: string) => {
        return currentPost.reactions?.some(r => r.user === currentUserId && r.reactionType === type);
    };

    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center">
                <strong>@{currentPost.user?.nickName || 'Usuario Desconocido'}</strong>
                <small className="text-muted">
                    {currentPost.createdAt ? new Date(currentPost.createdAt).toLocaleDateString() : ''}
                </small>
            </Card.Header>
            
            <Card.Body>
                <Card.Text>{currentPost.description}</Card.Text>
                
                
                {currentPost.images && currentPost.images.length > 0 && (
                    <div className="d-flex flex-wrap gap-2 mt-3 mb-3">
                        {currentPost.images.map((img, idx) => {
                            const imageUrl = typeof img === 'string' ? img : img.url;
                            const imageId = typeof img === 'string' ? idx : (img._id || idx);
                            if (!imageUrl) return null;
                            return (
                                <img
                                    key={imageId}
                                    src={imageUrl}
                                    alt="Imagen adjunta"
                                    className="img-fluid rounded border shadow-sm"
                                    style={{ maxHeight: '300px', objectFit: 'cover', flex: '1 1 auto', cursor: 'pointer' }}
                                    onClick={() => setSelectedImage(imageUrl)}
                                />
                            );
                        })}
                    </div>
                )}
                
                <div className="mb-3">
                    {currentPost.tags?.map((tag) => {
                        const tagName = typeof tag === 'string' ? tag : tag.nombre;
                        const tagId = typeof tag === 'string' ? tag : (tag._id || tagName);
                        if (!tagName) return null;
                        return (
                        <Badge bg="secondary" className="me-1" key={tagId}>
                            #{tagName}
                        </Badge>
                     );
                    })}
                </div>
                
                
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center border-top pt-3 mt-3">
                    <ButtonGroup size="sm" className="mb-3 mb-sm-0">
                        {ANTI_REACTIONS.map((reaction) => (
                            <Button 
                                key={reaction.type}
                                variant={hasReacted(reaction.type) ? "danger" : "outline-secondary"}
                                onClick={() => handleReaction(reaction.type)}
                                disabled={isReacting || !currentUserId}
                                title={reaction.label}
                            >
                                {reaction.emoji} {countReactions(reaction.type) > 0 && countReactions(reaction.type)}
                            </Button>
                        ))}
                    </ButtonGroup>

                    <Link to={`/post/${currentPost._id}`}>
                        <Button variant="outline-primary" size="sm">
                            Ver comentarios
                        </Button>
                    </Link>
                </div>
            </Card.Body>

            <Modal show={Boolean(selectedImage)} onHide={() => setSelectedImage(null)} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Imagen del post</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center bg-dark">
                    {selectedImage && (
                        <img
                            src={selectedImage}
                            alt="Imagen del post ampliada"
                            className="img-fluid rounded"
                            style={{ maxHeight: '75vh', objectFit: 'contain' }}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </Card>
    );
}
