import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { LinkContainer } from "react-router-bootstrap"
import "../styles/NavbarApp.css"

export function NavbarApp() {
  const auth = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>

        <Navbar.Brand as={Link} to="/">
          UNAHUR Anti-Social Net
        </Navbar.Brand>

        

        <Navbar.Collapse id="navbar">

          <Nav className="ms-auto align-items-center">

            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
          </Nav>

          <Nav>

           { auth?.user ? (
            <>
            <LinkContainer to="/profile">
            <Button variant="light" className="me-2">Perfil</Button>
            </LinkContainer>

            <LinkContainer to="/" >
            <Button variant="outline-light" onClick={auth.logout}>Cerrar sesion</Button>
            </LinkContainer>
            </>
            ):(
            <>
            <LinkContainer to="/login">
            <Button variant="light" className="me-2">Login</Button>
            </LinkContainer>

            <LinkContainer to="/register">
            <Button variant="light">Registrarse</Button>
            </LinkContainer>
            </>
            )}

          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}