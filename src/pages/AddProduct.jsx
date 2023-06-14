import React from "react";
import {useNavigate} from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../redux/asyncActions/productAsync";
import { load_providers } from "../redux/asyncActions/providerAsync";
import { load_categories } from "../redux/asyncActions/categoryAsync";



const AddProduct = () => {
  const providerState = useSelector((state) => state.providerReducer);
  const providers = providerState.providers;
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );

  const categoryState = useSelector((state) => state.categoryReducer);
  const categories = categoryState.categories;

  // const uploading = useSelector((state) => state.productReducer.uploading);
  const [name, setNameInput] = useState("");
  const [provider, setProviderInput] = useState("");
  const [category, setCategoryInput] = useState("");
  const [description, setDescriptionInput] = useState("");
  const [sale_price, setPriceInput] = useState("");

  const [image1, setImage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(load_providers());
    dispatch(load_categories());

    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [dispatch]);

  const imageChanged = (e) => {
    setImage(e.target.files[0]);
  };

  const submitProduct = () => {
    const uploadData = new FormData();
    uploadData.append("name", name);
    uploadData.append("provider", provider);
    uploadData.append("category", category);
    uploadData.append("description", description);
    uploadData.append("sale_price", sale_price);
    image1 && uploadData.append("image1", image1);
    dispatch(addProduct(uploadData));
    setImage(null);
    setNameInput("");
    navigate('/products')
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
          <Form.Select aria-label="Provider" value={provider} onChange={(e) => setProviderInput(e.target.value)}>
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
          <Form.Control as="textarea" rows={3}  value={description} onChange={(e) => setDescriptionInput(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>

          <Form.Select aria-label="Category" value={category} onChange={(e) => setCategoryInput(e.target.value)}>
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
          <Form.Control type="number" placeholder="price" value={sale_price} onChange={(e) => setPriceInput(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Default file input example</Form.Label>
          <Form.Control type="file"  onChange={imageChanged}/>
        </Form.Group>
        <Button variant="primary" onClick={submitProduct}>Primary</Button>{" "}
      </Form>
    </Container>
  );
};

export default AddProduct;
