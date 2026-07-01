import { useContext, useEffect } from "react";
import { Container, Card, Col, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export function HomePage() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  // Si el usuario ya está logueado, lo enviamos al Feed
  useEffect(() => {
    if (auth?.user) {
      navigate("/feed");
    }
  }, [auth?.user, navigate]);

  return (
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
                      <Card.Title>Compartí</Card.Title>
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
                  <Card className="shadow-sm h-100 border-0 bg-light">
                    <Card.Body>
                      <h1 className="mb-3">🔒</h1>
                      <Card.Title>Gestioná tu perfil</Card.Title>
                      <Card.Text>Administra tu perfil y mantene actualizada tu informacion.</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              
              <div className="d-flex gap-3 justify-content-center mt-4 mb-2">
                <Link to="/login">
                  <Button variant="primary" size="lg" className="px-4 shadow-sm">Iniciar Sesión</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline-dark" size="lg" className="px-4 shadow-sm">Registrarse</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}