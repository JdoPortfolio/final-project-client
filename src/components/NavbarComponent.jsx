// src/components/NavbarComponent.jsx
import React, { useState, useContext } from 'react';
import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import { AuthContext } from '../context/auth.context'; 
import { post } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
  const [showLogin, setShowLogin] = useState(false);

  const { storeToken, authenticateUser, isLoggedIn, logOutUser } = useContext(AuthContext);

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const navigate = useNavigate()

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const email = event.target.formBasicEmail.value;
    const password = event.target.formBasicPassword.value;
  
    post("/auth/login", { email, password })
      .then((response) => {
        setShowLogin(false)

        console.log("this is our user", response.data)

        if (response.data.privilege === 'admin') {
          localStorage.setItem('isAdmin', true)
          navigate('/admin-view');
        } else if (response.data.privilege === 'dealership-owner') {
          // console.log("WE HAVE AN OWNER")
          localStorage.setItem('isDealershipOwner', true)
          navigate('/dealership-owner-view');
          // navigate('/')
        }

        if (response && response.data && response.data.authToken) {
          const { authToken } = response.data;
          storeToken(authToken);
          authenticateUser();
        } else {

          console.error("Invalid response structure:", response);
       
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);

      });
  };
  
  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand href="#home">KonduceAuto</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#about-us">About us</Nav.Link>
            <Nav.Link href="#our-partners">Our Partners</Nav.Link>
            <Nav.Link href="#join-us">Join us</Nav.Link>
            {!isLoggedIn && <Nav.Link onClick={handleShowLogin}>Login</Nav.Link>}
          </Nav>
          {isLoggedIn && <Button onClick={logOutUser}>Logout</Button>}
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


// // src/components/NavbarComponent.jsx
// import React, { useState, useContext } from 'react';
// import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
// import { AuthContext } from '../context/auth.context'; // Ensure this path matches your project structure
// import { post } from '../services/authService'; // Adjust if necessary

// const NavbarComponent = () => {
//   const [showLogin, setShowLogin] = useState(false);
//   const { storeToken, authenticateUser } = useContext(AuthContext);

//   const handleShowLogin = () => setShowLogin(true);
//   const handleCloseLogin = () => setShowLogin(false);

//   const handleLoginSubmit = async (event) => {
//     event.preventDefault();
//     const email = event.target.elements.formBasicEmail.value;
//     const password = event.target.elements.formBasicPassword.value;

//     try {
//       const response = await post("/auth/login", { email, password });
//       const { authToken } = response.data;
//       storeToken(authToken);
//       await authenticateUser(); // This now redirects users based on their privilege
//       handleCloseLogin();
//     } catch (error) {
//       console.error("Login failed:", error.response.data);
//       // Here, you can add logic to display an error message to the user
//     }
//   };
  

//   return (
//     <>
//       <Navbar bg="light" expand="lg" fixed="top">
//         <Navbar.Brand href="#home">
//         KonduceAuto
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">
//             <Nav.Link href="#about-us">About us</Nav.Link>
//             <Nav.Link href="#our-partners">Our Partners</Nav.Link>
//             <Nav.Link href="#join-us">Join us</Nav.Link>
//             {!isLoggedIn && <Nav.Link onClick={handleShowLogin}>Login</Nav.Link>}
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>

//       <Modal show={showLogin} onHide={handleCloseLogin}>
//         <Modal.Header closeButton>
//           <Modal.Title>Login</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleLoginSubmit}>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control type="email" placeholder="Enter email" required />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" placeholder="Password" required />
//             </Form.Group>

//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default NavbarComponent;
