// src/components/NavbarComponent.jsx

import React, { useState, useContext } from 'react';
import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import { AuthContext } from '../context/auth.context'; // Adjust the import path based on your project structure

const NavbarComponent = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { isLoggedIn, user } = useContext(AuthContext);

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // Authentication logic goes here
  };

  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand href="#home">
          <img
            src = "https://res.cloudinary.com/dxaiqsqy4/image/upload/v1712175812/final-project/Final-Project-Images/general-uploads/logo_zbpadb.png"// Adjust the path to your logo
            width="150"
            height="60"
            className="d-inline-block align-top"
            alt="KonduceAuto logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#about-us">About us</Nav.Link>
            <Nav.Link href="#our-partners">Our Partners</Nav.Link>
            <Nav.Link href="#join-us">Join us</Nav.Link>
            {!isLoggedIn && <Nav.Link onClick={handleShowLogin}>Login</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavbarComponent;
