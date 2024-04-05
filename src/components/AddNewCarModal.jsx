// src/components/AddNewCarModal.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createCar } from "../services/carService"; // Ensure correct import path

const AddNewCarModal = ({ show, handleClose, refreshCars, dealershipId }) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("new");
  const [mileage, setMileage] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const carData = {
      make,
      model,
      year: parseInt(year), // Ensure year is an integer
      price: parseFloat(price), // Ensure price is a float
      condition,
      mileage: parseInt(mileage), // Ensure mileage is an integer
      images: images.split(", "), // Assuming images are submitted as a comma-separated string and converted to an array
      dealershipId
    };

    try {
      await createCar(carData);
      handleClose(); // Close the modal
      refreshCars(); // Refresh the list of cars
    } catch (error) {
      console.error("Error creating car:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Car</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Make</Form.Label>
            <Form.Control type="text" value={make} onChange={(e) => setMake(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Model</Form.Label>
            <Form.Control type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Year</Form.Label>
            <Form.Control type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
          </Form.Group>

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

          <Form.Group className="mb-3">
            <Form.Label>Images ( URL)</Form.Label>
            <Form.Control type="text" value={images} onChange={(e) => setImages(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddNewCarModal;

