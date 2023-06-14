import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/asyncActions/productAsync";
import { useNavigate } from "react-router-dom";
import { HiTrash , HiPencilAlt} from "react-icons/hi";


import React from "react";

const ModalDeleteProduct = ({pk}) => {
  const [show, setShow] = useState(false);

  const [pkid, setPK] = useState(pk);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  


  const deletePost = () => {
    dispatch(deleteProduct(pkid))
    handleClose();
    navigate('/products')
  };

  return (
    <>
      <Button className="btn btn-danger" onClick={handleShow}>
        <HiTrash/>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deletePost}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteProduct;
