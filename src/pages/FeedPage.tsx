import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import {Link} from "react-router-dom";
import { getPosts } from "../services/postService";
import PostCard from "../components/PostCard";
import type { Post } from "../types/Post";

export function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err: any) {
        setError(err.message || "Error al cargar las publicaciones.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
    <Container className="mt-5">
      <Row className="justify-content-center pb-5">
        <Col md={8} lg={6}>
            <div className="text-center mb-4">
                <h2 className="fw-bold text-success bg-white shadow-sm px-4 py-2 rounded-pill d-inline-block" style={{border: '1px solid #e0e0e0'}}>
                    Últimas publicaciones
                </h2>
            </div>

          {loading ? (
            <div className="text-center mt-5 bg-white p-4 rounded shadow-sm">
              <Spinner animation="border" variant="success" />
              <p className="text-muted mt-2 mb-0">Cargando el feed...</p>
            </div>
            ) : error ? (
              <Alert variant="danger" className="text-center shadow-sm">
                Hubo un problema al cargar el feed: {error}
              </Alert>
            ) : posts.length === 0 ? (
                <Alert variant="info" className="text-center shadow-sm bg-white border-0">
              Aún no hay publicaciones. ¡Sé el primero en escribir algo!
                </Alert>
            ) : (
                posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
        </Col>
      </Row>
    </Container>
    <Link to="/new-post">
        <Button 
          variant="success" 
          className="rounded-circle shadow-lg d-flex justify-content-center align-items-center bg-white text-success border border-success border-2"
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            width: '65px',
            height: '65px',
            fontSize: '40px',
            lineHeight: '0',
            paddingBottom: '10px',
            zIndex: 1000,
            transition: 'transform 0.2s ease-in-out'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.backgroundColor = "#f8f9fa";
        }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor= 'white'
        }}
          title="Crear nueva publicación"
        >
          +
        </Button>
      </Link>
    </>
  );
}