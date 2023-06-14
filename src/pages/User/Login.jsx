import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/asyncActions/userAsync";
import useForm from "../../hooks/useForm";

const Login = () => {
  const user = useSelector((state) => state.userReducer);
  const { isAuthenticated } = user;
  const [values, handleChange] = useForm();
  const [type, setType] = useState("password");
  const { username, password } = values;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    isAuthenticated && navigate("/products");
  }, [navigate, isAuthenticated]);

  const loginMe = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };
  const changetype = () => {
    if (type === "password") {
      setType("text");
    }
    if (type === "text") {
      setType("password");
    }
  };
  return (
    <Container>
      <h1 className="py-3">Login</h1>
      <Form onSubmit={loginMe}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder="Enter username"
            value={username || ""}
            onChange={handleChange}
            type="text"
            name="username"
          />
          <Form.Text className="text-muted">
            We'll never share your username with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            placeholder="Password"
            value={password || ""}
            onChange={handleChange}
            type={type}
            name="password"
          />
        </Form.Group>
        
        <Button variant="primary" type="submit" disabled={!username || !password}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
