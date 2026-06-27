
import { Container, Card, Col, Row } from "react-bootstrap";


export function HomePage() {

  return (
    <>
    <Container className="mt-5">

    <Row className="justify-content-center">

      <Col md={8} lg={6}>

        <Card className="shadow">

          <Card.Body className="text-center">
            <h1 className="display-1 mb-3">
              <img src="Logo.png" alt="logoUNAHUR" width={100} height={100} />
            </h1>

            <h1>UNAHUR Anti-Social Net</h1>

            <p className="lead">La red social de la comunidad universitaria.</p>

            <p>Un espacio pensado para compartir ideas, interactuar con otros estudiantes y mantener tu perfil actualizado.</p>
            
            <hr className="my-4" />

            <Row className="mt-5">
              <Col md={4}>
              <Card className="shadow">
                <Card.Body>
                  <h1>📢</h1>
                  <Card.Title> Comparti</Card.Title>
                  <Card.Text>Publica ideas, noticias o novedades para toda al comunidad.</Card.Text>
                </Card.Body>
              </Card>
              </Col>
              
              <Col md={4}>
              <Card className="shadow">
                <Card.Body>
                  <h1>🤝</h1>
                  <Card.Title>Interactua</Card.Title>
                  <Card.Text>Conecta con estudiantes mediante comentarios y publicaciones.</Card.Text>
                </Card.Body>
              </Card>
              </Col>
              
              <Col md={4}>
              <Card className="shadow">
                <Card.Body>
                  <h1>🔒</h1>
                  <Card.Title>Gestiona tu perfil</Card.Title>
                  <Card.Text>Administra tu perfil y mantene actualizada tu informacion.</Card.Text>
                </Card.Body>
              </Card>
              </Col>
            </Row>
          </Card.Body>

        </Card>

      </Col>

    </Row>

</Container>
</>

)};