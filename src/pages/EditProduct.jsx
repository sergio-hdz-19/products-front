import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editProduct, product_detail } from "../redux/asyncActions/productAsync";
import { load_providers } from "../redux/asyncActions/providerAsync";
import { load_categories } from "../redux/asyncActions/categoryAsync";

const EditProduct = () => {
  //Edit Product
  const product = useSelector((state) => state.productReducer.singleProduct);

  const providerState = useSelector((state) => state.providerReducer);
  const providers = providerState.providers;

  const categoryState = useSelector((state) => state.categoryReducer);
  const categories = categoryState.categories;

  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );

  const [name, setNameInput] = useState(product.name);
  const [provider, setProviderInput] = useState(product.provider);
  const [category, setCategoryInput] = useState(product.category);
  const [description, setDescriptionInput] = useState(product.description);
  const [sale_price, setPriceInput] = useState(product.sale_price);


  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(load_providers());
    dispatch(load_categories());
    dispatch(product_detail(id));
    
    if (!isAuthenticated) {
      navigate("/login");
    }

  }, [isAuthenticated, dispatch]);

 

  const submitProduct = () => {
    const uploadData = new FormData();
    uploadData.append("name", name);
    uploadData.append("provider", provider);
    uploadData.append("category", category);
    uploadData.append("description", description);
    uploadData.append("sale_price", sale_price);
    dispatch(editProduct(
        id,
        name, 
        provider,
        category,
        description,
        sale_price
        
    ));
    navigate("/");
  };
  return (
    <Container>
      <Form className="mt-3">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setNameInput(e.target.value)}
            type="text"
            placeholder="name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Provider</Form.Label>
          <Form.Select
            aria-label="Provider"
            value={provider}
            onChange={(e) => setProviderInput(e.target.value)}
          >
            {providers.map((provider, index) => {
              return (
                <option key={index} value={provider.id}>
                  {provider.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>

          <Form.Select
            aria-label="Category"
            value={category}
            onChange={(e) => setCategoryInput(e.target.value)}
          >
            {categories.map((category, index) => {
              return (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="price"
            value={sale_price}
            onChange={(e) => setPriceInput(e.target.value)}
          />
        </Form.Group>
       
        <Button variant="primary" onClick={submitProduct}>
          Primary
        </Button>{" "}
      </Form>
    </Container>
  );
};

export default EditProduct;