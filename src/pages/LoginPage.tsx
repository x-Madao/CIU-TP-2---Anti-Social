import { useState, useContext } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { getUsers } from "../services/userService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



export function LoginPage() {
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [toast,setToast] = useState("") 

  const auth = useContext(AuthContext)

  const navigate = useNavigate();

  function mostrarMensaje(mensaje:string){
    setToast(mensaje);
    setTimeout(() => {setToast("");}, 2000)
  }

  function validarCampos(){
        if(!nickName || !password){
            mostrarMensaje("Complete todos los campos obligatorios");
            return false
        }
        setToast("")
        return true
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      if(!validarCampos()) return;
      
        const users = await getUsers();

        const user = users.find(
            u => u.nickName === nickName
        );

        if (!user) {
            mostrarMensaje("El usuario no existe");
            return;
        }

        if (password !== "123456") {
            mostrarMensaje("Contraseña incorrecta");
            return;
        }
        auth?.login(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");

        console.log(user);

    } catch (error) {
       if(error instanceof Error){
        mostrarMensaje(error.message);
       }
       else{
        mostrarMensaje("Error al conectar con el servidor")
       }
        console.error(error);
    }
};

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "28rem" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">
            Iniciar sesión
          </Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <p>{toast}</p>

            <Button type="submit" className="w-100">
              Iniciar sesión
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}