// // src/components/AdminNavbar.jsx
// import React, { useContext } from 'react';
// import { Navbar, Nav, Button } from 'react-bootstrap';
// import { AuthContext } from '../context/auth.context';

// const AdminNavbar = ({ onDisplayChange }) => {
//   const { logOutUser, isLoggedIn } = useContext(AuthContext);

//   return (
//     <>
//       <Navbar bg="light" expand="lg" fixed="top">
//         <Navbar.Brand href="#home">KonduceAuto</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">
//             <Nav.Link onClick={() => onDisplayChange('dealershipOwner')}>Dealership-Owner</Nav.Link>
//             <Nav.Link onClick={() => onDisplayChange('dealership')}>Dealership</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//         {isLoggedIn && <Button onClick={logOutUser}>Logout</Button>}
//       </Navbar>
//     </>
//   );
// };

// export default AdminNavbar;


// src/components/NavbarComponent.jsx
import React, { useState, useContext } from 'react';
import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import { AuthContext } from '../context/auth.context'; 
import { post } from '../services/authService';

const AdminNavbar = ({onDisplayChange}) => {
 const { logOutUser, isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand href="#home">KonduceAuto</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={() => onDisplayChange('dealershipOwner')}>Dealership-Owner</Nav.Link>
            <Nav.Link onClick={() => onDisplayChange('dealership')}>Dealership</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {isLoggedIn && <Button onClick={logOutUser}>Logout</Button>}
      </Navbar>
    </>
  );
};

export default AdminNavbar;
