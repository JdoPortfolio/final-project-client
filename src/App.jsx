import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import ContextProviderWrapper from "./context/ContextProviderWrapper";
import NavbarComponent from "./components/NavbarComponent";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/login" />;
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  return (

    <ContextProviderWrapper>
    <div className="App">
        {/* <Navbar /> */}
        <NavbarComponent />

        <Routes>
          <Route exact path="/" element={<HomePage />} />

          {/* <Route element={<LoggedIn />}></Route> */}

          {/* <Route element={<NotLoggedIn />}>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route> */}
        </Routes>
      </div>
    </ContextProviderWrapper>
      
  );
}

export default App;
