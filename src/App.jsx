import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/auth.context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import HomePage from './pages/HomePage';
import AdminViewPage from './pages/AdminViewPage';
import FooterComponent from './components/FooterComponent';
import ContextProviderWrapper from './context/ContextProviderWrapper';
import AdminNavbar from './components/AdminNavbar';
import DealershipOwnerNavbar from './components/DealershipOwnerNavbar';
import DealershipOwnerViewPage from './pages/DealershipOwnerViewPage';

function App() {

  // const [adminNav, setAdminNav] = useState(false)

  const { admin, isLoggedIn } = useContext(AuthContext)

  const isAdmin = () => {
    return localStorage.getItem('isAdmin')
  }

  const isDealershipOwner = () => {
    return localStorage.getItem('isDealershipOwner')
  }

  useEffect(() => {
    console.log("Admin is changing!!!!!!!!")
    isAdmin()
    isDealershipOwner()
  }, [admin, isLoggedIn])

  return (

      <ContextProviderWrapper>
        <div className="App">
          {
              isAdmin() ? 
              
                <AdminNavbar />

              :
            
              isDealershipOwner() ?
            
                <DealershipOwnerNavbar />

              : 

                <NavbarComponent />
          }
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin-view" element={<AdminViewPage />} />
            <Route path="/dealership-owner-view" element={<DealershipOwnerViewPage />} />
          </Routes>
          <FooterComponent />
        </div>
      </ContextProviderWrapper>

  );
}

export default App;







// import "./App.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Routes, Route, Navigate, Outlet } from "react-router-dom";
// import ContextProviderWrapper from "./context/ContextProviderWrapper";
// import NavbarComponent from "./components/NavbarComponent";
// import HomePage from "./pages/HomePage";
// import SignupPage from "./pages/SignupPage";
// import LoginPage from "./pages/LoginPage";
// import FooterComponent from "./components/FooterComponent";

// function App() {
//   const getToken = () => {
//     return localStorage.getItem("authToken");
//   };

//   const LoggedIn = () => {
//     return getToken() ? <Outlet /> : <Navigate to="/login" />;
//   };

//   const NotLoggedIn = () => {
//     return !getToken() ? <Outlet /> : <Navigate to="/" />;
//   };

//   return (

//     <ContextProviderWrapper>
//     <div className="App">
//         {/* <Navbar /> */}
//         <NavbarComponent />

//         <Routes>
//           <Route exact path="/" element={<HomePage />} />

//           {/* <Route element={<LoggedIn />}></Route> */}

//           {/* <Route element={<NotLoggedIn />}>
//             <Route path="/signup" element={<SignupPage />} />
//             <Route path="/login" element={<LoginPage />} />
//           </Route> */}
//         </Routes>
//         <FooterComponent/>
//       </div>
//     </ContextProviderWrapper>
      
//   );
// }

// export default App;
