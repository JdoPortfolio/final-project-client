
// src/components/DealershipOwnerNavbar.jsx
import React, { useContext } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const DealershipOwnerNavbar = () => {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Navbar.Brand href="#home">KonduceAuto</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Link className="nav-link" to="/dealership-owner-view?section=profiles">Profiles</Link>
          <Link className="nav-link" to="/dealership-owner-view?section=inventory">Inventory</Link>
          <Link className="nav-link" to="/dealership-owner-view?section=leads">Leads</Link>
        </Nav>
      </Navbar.Collapse>
      {isLoggedIn && <Button onClick={logOutUser}>Logout</Button>}
    </Navbar>
  );
};

export default DealershipOwnerNavbar;

// // src/components/DealershipOwnerNavbar.jsx
// import React, { useContext } from 'react';
// import { Navbar, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom'; // Import Link
// import { AuthContext } from '../context/auth.context';

// const DealershipOwnerNavbar = () => {
//   const { isLoggedIn, logOutUser } = useContext(AuthContext);
  
//   return (
//     <>
//       <Navbar bg="light" expand="lg" fixed="top">
//         <Navbar.Brand href="#home">KonduceAuto</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">
//             <Link to="/dealership-owner-view?section=profiles">Profiles</Link>
//             <Link to="/dealership-owner-view?section=inventory">Inventory</Link>
//             <Link to="/dealership-owner-view?section=leads">Leads</Link>
//           </Nav>
//         </Navbar.Collapse>
//         {isLoggedIn && <Button onClick={logOutUser}>Logout</Button>}
//       </Navbar>
//     </>
//   );
// };

// export default DealershipOwnerNavbar;



// // src/components/NavbarComponent.jsx
// import React, { useState, useContext } from 'react';
// import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
// import { AuthContext } from '../context/auth.context'; 
// import { post } from '../services/authService';

// const DealershipOwnerNavbar = () => {
//   const [showLogin, setShowLogin] = useState(false);

//   const { storeToken, authenticateUser, isLoggedIn, logOutUser } = useContext(AuthContext);

//   const handleShowLogin = () => setShowLogin(true);
//   const handleCloseLogin = () => setShowLogin(false);

//   const handleLoginSubmit = (event) => {
//     event.preventDefault();
//     const email = event.target.formBasicEmail.value;
//     const password = event.target.formBasicPassword.value;
  
//     post("/auth/login", { email, password })
//       .then((response) => {

//         if (response && response.data && response.data.authToken) {
//           const { authToken } = response.data;
//           storeToken(authToken);
//           authenticateUser();
//         } else {

//           console.error("Invalid response structure:", response);
       
//         }
//       })
//       .catch((error) => {
//         console.error("Login failed:", error);

//       });
//   };
  
//   return (
//     <>
//       <Navbar bg="light" expand="lg" fixed="top">
//     <h1 style={{color: "black"}}>This is the Dealership Owner Navbar</h1>
//         <Navbar.Brand href="#home">KonduceAuto</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">
//             <Nav.Link href="#about-us">About us</Nav.Link>
//             <Nav.Link href="#our-partners">Our Partners</Nav.Link>
//             <Nav.Link href="#join-us">Join us</Nav.Link>
//             {/* {!isLoggedIn && <Nav.Link onClick={handleShowLogin}>Login</Nav.Link>} */}
//           </Nav>
//         </Navbar.Collapse>
//         {isLoggedIn && <Button onClick={logOutUser}>Logout</Button>}
//       </Navbar>

//     </>
//   );
// };

// export default DealershipOwnerNavbar;