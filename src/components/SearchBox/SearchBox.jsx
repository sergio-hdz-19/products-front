import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { load_products } from "../../redux/asyncActions/productAsync";

const SearchBox = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(load_products(0,name));
  };

  return (
    <Form className="d-flex" onSubmit={handleSubmit}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        value={name}
        onChange={(e) => setName(e.target.value)}

      />
      <Button type="submit" variant="outline-success">Search</Button>
    </Form>
  );
};

export default SearchBox;
