import React, { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import AppContext from "../AppContext.js";

function CreateItemModal({ showModal, onCloseModal }) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const { userList, currentUser, itemList, setItemList } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClose = () => {
    setItemName("");
    setDescription("");
    setQuantity("");
    onCloseModal();
  };

  const handleCreateItem = () => {
    const maxId = Math.max(...itemList.map((item) => item.id));
    const nextAvailableId = maxId + 1;

    const newItem = {
      id: nextAvailableId,
      user_id: currentUser.id,
      item_name: itemName,
      description,
      quantity,
    };
    fetch("http://localhost:3001/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then((data) => {
        setItemList((prevItemList) => [...prevItemList, data]);
        handleClose();
      })
      .catch((error) => {
        console.error("Error creating item:", error);
      });
      navigate('/myaccount')
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="itemId" className="form-label">
              ID
            </label>
            <input
              type="text"
              className="form-control"
              id="itemId"
              value={itemList.length === 0 ? 1 : Math.max(...itemList.map((item) => item.id)) + 1}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userId" className="form-label">
              User ID
            </label>
            <input
              type="text"
              className="form-control"
              id="userId"
              value={currentUser.id}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="itemName" className="form-label">
              Item Name
            </label>
            <input
              type="text"
              className="form-control"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              type="text"
              className="form-control"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateItem}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateItemModal;
