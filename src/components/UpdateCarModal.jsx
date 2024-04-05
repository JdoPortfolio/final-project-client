// src/components/UpdateCarModal.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateCar } from "../services/carService"; // Ensure this is correctly implemented to hit your backend

const UpdateCarModal = ({ show, handleClose, carData, refreshCars }) => {
    const [price, setPrice] = useState(carData?.price || 0);
    const [condition, setCondition] = useState(carData?.condition || 'new');
    const [mileage, setMileage] = useState(carData?.mileage || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCarData = {
      // Keep unchanged data as is
      make: carData.make,
      model: carData.model,
      year: carData.year,
      dealershipId: carData.dealershipId,
      images: carData.images,
      // Update only the fields that can change
      price,
      condition,
      mileage: condition === 'used' ? mileage : undefined,
    };

    try {
      await updateCar(carData._id, updatedCarData);
      handleClose(); // Close the modal after successful update
      refreshCars(); // Refresh the cars list to show the updated data
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Car</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Condition</Form.Label>
            <Form.Select value={condition} onChange={(e) => setCondition(e.target.value)} required>
              <option value="new">New</option>
              <option value="used">Used</option>
            </Form.Select>
          </Form.Group>

          {condition === 'used' && (
            <Form.Group className="mb-3">
              <Form.Label>Mileage</Form.Label>
              <Form.Control type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} required />
            </Form.Group>
          )}

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateCarModal;
