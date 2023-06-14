import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../redux/asyncActions/userAsync";
import useForm from "../../hooks/useForm";

const Signup = () => {
  const [values, handleChange, disabled] = useForm();
  const { username, email, password, re_password } = values;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userReducer);
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );

  const registerMe = (e) => {
    e.preventDefault();
    dispatch(register(username, email, password, re_password));
    navigate("/login");

  };
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container>
      <h1 className="py-3">Sign up</h1>
      <Form onSubmit={registerMe} autoComplete="false" >
        <Form.Group className="mb-3" >
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username || ""}
            onChange={handleChange}
            type="text"
            name="username"
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email || ""}
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          type="password" 
          placeholder="Password" 
          value={password || ""}
          onChange={handleChange}
          name="password"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control 
          type="password" 
          placeholder="Repeat password" 
          value={re_password || ""}
          onChange={handleChange}
          name="re_password"
          />
        </Form.Group>
        {user.error && user.error }
        <Button variant="primary" type="submit" disabled={!username || !password || !email || !password || !re_password}>
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
