import { useState, useRef, useContext } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../ui/toast/NotificationToast";
import { validateEmail, validatePassword } from "../auth.services";
import AuthenticationContext from "../AuthContextProvider";

//Saqué "{ onLogin }" como props
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });

  const navigate = useNavigate();

  //Para hacer foco si alguno de los campos está incompleto
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { handleUserLogin } = useContext(AuthenticationContext);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setErrors({ ...errors, email: true });
      emailRef.current.focus();
      errorToast("El email es inválido.");
      return;
    } else {
      setErrors({ ...errors, email: false });
    }
    // Solo validamos que la password no esté vacía
    if (!validatePassword(password, 1)) {
      setErrors({ ...errors, password: true });
      passwordRef.current.focus();
      errorToast("La contraseña es requerida.");
      return;
    } else {
      setErrors({ ...errors, password: false });
    }

    //CÓDIGO EN DESUSO AL USAR LAS VALIDACIONES DE VALIDATIONS.JS
    // if (!emailRef.current.value) {
    //     setErrors({ ...errors, email: true });
    //     emailRef.current.focus();
    //     return;
    // }

    // if (!passwordRef.current.value) {
    //     setErrors({ ...errors, password: true });
    //     passwordRef.current.focus();
    //     return;
    // }

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      //agregamos una función asíncrona para capturar correctamente el error del back
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Error desconocido");
        }

        return data;
      })
      .then((token) => {
        // Esta línea la manejamos desde el contexto:
        // localStorage.setItem("book-champions-token", token);
        handleUserLogin(token);
        successToast("Inicio de sesión exitoso.");
        navigate("/libros");
      })
      .catch((err) => {
        errorToast(err.message || "Error al iniciar sesión.");
        console.log(err);
        return;
      });
  };

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  return (
    <Card className="mt-5 mx-3 p-3 px-5 shadow">
      <Card.Body>
        <Row className="mb-2">
          <h5>¡Bienvenidos a Books Champion!</h5>
        </Row>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-4">
            <Form.Control
              type="text"
              ref={emailRef}
              placeholder="Ingresar email"
              onChange={handleEmailChange}
              value={email}
              className={errors.email && "border border-danger"}
            />

            {errors.email && (
              <Form.Label className="border border-danger">
                Debe ingresar un correo válido
              </Form.Label>
            )}
          </FormGroup>
          <FormGroup className="mb-4">
            <Form.Control
              type="password"
              ref={passwordRef}
              placeholder="Ingresar contraseña"
              onChange={handlePasswordChange}
              value={password}
            />
            {errors.password && (
              <Form.Label className="border border-danger">
                Debe ingresar un password válido
              </Form.Label>
            )}
          </FormGroup>

          <Row>
            <Col />
            <Col md={6} className="d-flex justify-content-end">
              <Button variant="secondary" type="submit">
                Iniciar sesión
              </Button>
            </Col>
            <Col md={6} className="justify-content-center">
              <p>¿Aún no tienes una cuenta?</p>
              <Button variant="primary" onClick={handleNavigateToRegister}>
                Registrarse
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Login;
