import { useContext } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LinkContainer } from "react-router-bootstrap";
import "../styles/NavbarApp.css";

export function NavbarApp() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (auth?.logout) {
      auth.logout();
      navigate("/");
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm sticky-top">
      <Container>
        
        <Navbar.Brand as={Link} to={auth?.user ? "/feed" : "/"}>
          UNAHUR Anti-Social Net
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar" />    
        <Navbar.Collapse id="navbar">
          
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to={auth?.user ? "/feed" : "/"}>
              Inicio
            </Nav.Link>
          </Nav>

          <Nav>
           
            {auth?.user && (
              <div className="d-flex flex-column flex-lg-row gap-2">
                <LinkContainer to="/profile">
                  <Button variant="light" >Mi Perfil</Button>
                </LinkContainer>

                <Button variant="outline-danger" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              </div>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}