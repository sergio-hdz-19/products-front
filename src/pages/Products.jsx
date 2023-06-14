import React from "react";
import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { HiOutlineEye } from "react-icons/hi";

import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";

import { load_products } from "../redux/asyncActions/productAsync";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
  const productState = useSelector((state) => state.productReducer);
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );

  const products = productState.products;
  const totalCount = productState.count;
  const paginasTotales = Math.ceil(totalCount / 8);

  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(load_products(currentPage, name));

    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, currentPage, name, dispatch]);

  const loadProductsForPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    const totalPages = Math.ceil(totalCount / 4); // 4 is the number of products per page
    if (currentPage < totalPages) {
      loadProductsForPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      loadProductsForPage(currentPage - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(load_products(currentPage, name));
  };

  return (
    <Container className="mt-5">
      <Row>
        <Form className="d-flex mb-5" onSubmit={handleSubmit}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit" variant="outline-success">
            Search
          </Button>
        </Form>
      </Row>
      <Row xs={1} md={4} className="g-4">
        {products.map((product, index) => {
          return (
            <Col key={index}>
              <Card style={{ maxwidth: "18rem" }} className="m-auto">
                <Card.Img variant="top" src={product.image1} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>${product.sale_price}</Card.Text>
                  <Link
                    to={`/product/detail/${product.id}`}
                    className="btn btn-primary"
                  >
                    View <HiOutlineEye />
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col>
          <ButtonGroup aria-label="Basic example" className="mt-2">
            <Button
              variant="secondary"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              onClick={nextPage}
              disabled={currentPage >= paginasTotales}
            >
              Next
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Products;
