// src/components/AddNewDealershipModal.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createDealership } from "../services/dealershipService"; // Ensure correct import path

const AddNewDealershipModal = ({ show, handleClose, refreshDealerships }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [ownerId, setOwnerId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dealershipData = {
      name,
      location,
      contact: { phone, email },
      image,
      owner: ownerId, // Include the ownerId in the data sent to the backend
    };

    try {
      await createDealership(dealershipData);
      handleClose(); // Close the modal
      refreshDealerships(); // Refresh the list of dealerships
    } catch (error) {
      console.error("Error creating dealership:", error);
      // Optionally handle the error (e.g., show error message)
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Dealership</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Form fields for dealership data */}
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Owner ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Owner ID"
                required
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
              />
            </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddNewDealershipModal;
