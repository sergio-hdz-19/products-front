import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


import { Link, NavLink } from "react-router-dom";
import { load_user, logoutAct } from "../redux/asyncActions/userAsync";
import { useSelector, useDispatch } from "react-redux";

const NavBar = () => {
  
  const userIn = useSelector((state) => state.userReducer);
  const { user, isAuthenticated } = userIn;
  const dispatch = useDispatch();

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logoutAct());
      dispatch(load_user());
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Products Crud</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
              
            {!isAuthenticated && <Link to="/sign-up" className="nav-link active">Sign Up</Link>}

            {isAuthenticated && <Link to="/products" className="nav-link active">Products</Link>}

            {isAuthenticated && (
              <Link to="/add-product" className="nav-link active">Add Product</Link>
            )}

            {isAuthenticated ? (
              
              <Link to="/" onClick={logout} className="nav-link active">Log Out</Link>
            ) : (
              <Link to="/login" className="nav-link active">Login</Link>
            )}
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
