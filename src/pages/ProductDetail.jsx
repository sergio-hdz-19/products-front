import React from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { product_detail } from "../redux/asyncActions/productAsync";
import { useState, useRef, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { Link, useNavigate } from "react-router-dom";

import {HiPencilAlt} from "react-icons/hi";
import ModalDeleteProduct from "../components/ModalComponent/ModalDeleteProduct";




const ProductDetail = () => {
  const product = useSelector((state) => state.productReducer.singleProduct);

  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(product_detail(id));
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, dispatch, id]);

  return (
    <Container>
      <Row className="mt-5">
        <Col sm={6}>
          <Image fluid src={product.image1} />
        </Col>

        <Col className="text-black bg-opacity-50  mt-2"  sm={6}>
          <h1>{product.name}</h1>
          <h2>Description</h2>
          <p>{product.description}</p>
          <h2>Price: ${product.sale_price}</h2>
          <h3>
            Category <Badge bg="info">{product.categoria}</Badge>
          </h3>

          <Link
            to={`/product/edit/product/${product.id}`}
            className="btn btn-warning m-2"
          >
            <HiPencilAlt/>
          </Link>

         
          <ModalDeleteProduct pk={id}/>
        </Col>
      </Row>
      
    </Container>
  );
};

export default ProductDetail;
