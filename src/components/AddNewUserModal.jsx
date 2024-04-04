import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createUser } from '../services/userService'; // Adjust based on your actual implementation

const AddNewUserModal = ({ show, handleClose, refreshUsers }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [privilege, setPrivilege] = useState('dealership-owner');
  const [profilePicture, setProfilePicture] = useState('https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password, name, privilege, profilePicture };
    createUser(userData).then(() => {
      handleClose(); // Close modal
      refreshUsers(); // Refresh the list of users
    }).catch(error => {
      console.error("Failed to create user:", error);
      // Handle error (e.g., show error message)
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Privilege</Form.Label>
            <Form.Select value={privilege} onChange={(e) => setPrivilege(e.target.value)}>
              <option value="dealership-owner">Dealership Owner</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Profile Picture URL</Form.Label>
            <Form.Control type="text" placeholder="Profile Picture URL" required value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddNewUserModal;
