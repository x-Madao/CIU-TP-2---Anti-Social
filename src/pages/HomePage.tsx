import { useEffect, useState} from "react";
import { Container, Card, Col, Row, Spinner, Alert } from "react-bootstrap";
import {getPosts} from "../services/postService";
import type {Post} from "../types/post";
import PostCard from "../components/PostCard";


export function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
    <Container className="mt-5">

    <Row className="justify-content-center mb-5">

      <Col md={10} lg={10}>

        <Card className="shadow border-0">

          <Card.Body className="text-center p-5">
            <h1 className="display-1 mb-3">
              <img src="Logo.png" alt="logoUNAHUR" width={100} height={100} />
            </h1>

            <h1>UNAHUR Anti-Social Net</h1>

            <p className="lead text-muted">La red social de la comunidad universitaria.</p>

            <p>Un espacio pensado para compartir ideas, interactuar con otros estudiantes y mantener tu perfil actualizado.</p>
            
            <hr className="my-4" />

            <Row className="mt-4 g-4">
              <Col md={4}>
              <Card className="shadow-sm h-100 border-0 bg-light">
                <Card.Body>
                  <h1 className="mb-3">📢</h1>
                  <Card.Title> Comparti</Card.Title>
                  <Card.Text>Publica ideas, noticias o novedades para toda la comunidad.</Card.Text>
                </Card.Body>
              </Card>
              </Col>
              
              <Col md={4}>
              <Card className="shadow-sm h-100 border-0 bg-light">
                <Card.Body>
                  <h1 className="mb-3">🤝</h1>
                  <Card.Title>Interactuá</Card.Title>
                  <Card.Text>Conectá con estudiantes mediante comentarios y publicaciones.</Card.Text>
                </Card.Body>
              </Card>
              </Col>
              
              <Col md={4}>
              <Card className="shadow-sm h-100 border0 bg-light">
                <Card.Body>
                  <h1 className="mb-3">🔒</h1>
                  <Card.Title>Gestioná tu perfil</Card.Title>
                  <Card.Text>Administra tu perfil y mantene actualizada tu informacion.</Card.Text>
                </Card.Body>
              </Card>
              </Col>
            </Row>
          </Card.Body>

        </Card>

      </Col>

    </Row>

    <Row className="justify-content-center pb-5">
      <Col md={8} lg={6}>
      <div className="text-center">
        <h2 className="mb-4 text-center fw-bold text-white bg-dark bg-opacity-75 p-2 rounded d-inline-block">Últimas Publicaciones</h2>
      </div>
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Cargando el feed...</p>
        </div>
      ) : error? (
        <Alert variant="danger" className="text-center shadow-sm">
          Hubo un problema al cargar el feed: {error}
        </Alert>
      ) : posts.length === 0 ? (
        <Alert variant="info" className="text-center shadow-sm">
          Todavía no hay publicaciones. ¡Registrate e iniciá sesión para ser el primero en compartir!
        </Alert>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
      </Col>
    </Row>

</Container>
</>
);
}