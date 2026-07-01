
import { useContext, useEffect, useState } from "react";
import { Alert, Badge, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { getPosts } from "../services/postService";
import type { Post } from "../types/Post";
import type { User } from "../types/User";

function getUserImage(user: User) {
    return user.image || user.avatar || user.foto || user.profileImage || "";
}

function getInitials(user: User) {
    const baseName = user.nombre || user.nickName || user.email;
    const words = baseName.trim().split(/\s+/).filter(Boolean);

    if (words.length >= 2) {
        return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }

    return (baseName.slice(0, 2) || "U").toUpperCase();
}

export function Profile() {
    const auth = useContext(AuthContext);
    const user = auth?.user;
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (error) {
                console.error(error);
                setError("No se pudo cargar la cantidad de publicaciones");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (!user) {
        return (
            <Container className="mt-5">
                <Alert variant="warning">No hay usuario logueado.</Alert>
            </Container>
        );
    }

    const userImage = getUserImage(user);
    const userPostsCount = posts.filter((post) => post.user?._id === user._id).length;

    return (
        <Container className="mt-5 mb-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Body className="p-4 text-center">
                            <div className="d-flex justify-content-center mb-3">
                                {userImage ? (
                                    <img
                                        src={userImage}
                                        alt={`Foto de perfil de ${user.nickName}`}
                                        className="rounded-circle border shadow-sm"
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            objectFit: "cover",
                                        }}
                                    />
                                ) : (
                                    <div
                                        className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center shadow-sm"
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            fontSize: "42px",
                                            fontWeight: 700,
                                        }}
                                    >
                                        {getInitials(user)}
                                    </div>
                                )}
                            </div>

                            <h1 className="h3 mb-1">{user.nombre}</h1>
                            <p className="text-muted mb-3">@{user.nickName}</p>

                            <div className="text-start bg-light rounded p-3 mb-3">
                                <p className="mb-2">
                                    <strong>Email:</strong> {user.email}
                                </p>
                                <p className="mb-0">
                                    <strong>Nickname:</strong> {user.nickName}
                                </p>
                            </div>

                            {error && <Alert variant="danger">{error}</Alert>}

                            <Badge bg="success" className="fs-6 px-3 py-2">
                                {loading ? (
                                    <>
                                        <Spinner animation="border" size="sm" className="me-2" />
                                        Cargando publicaciones...
                                    </>
                                ) : (
                                    `${userPostsCount} publicaciones`
                                )}
                            </Badge>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
