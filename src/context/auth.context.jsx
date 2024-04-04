// src/context/auth.context.jsx

import { useState, useEffect, createContext } from "react";

import { useNavigate } from "react-router-dom";

import { get } from "../services/authService";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false)

  const navigate = useNavigate()

  /* 
    Functions for handling the authentication status (isLoggedIn, isLoading, user)
    will be added here later in the next step
  */

  const storeToken = (token) => {
    //  <==  ADD
    localStorage.setItem("authToken", token);
  };

  const removeToken = () => {
    // <== ADD
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
    localStorage.clear()
    setAdmin(false)
  };


  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      get("/auth/verify")
        .then((response) => {
          const user = response.data;
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
          // Redirect based on user privilege
          if (response.data.privilege === 'admin') {
            console.log("This is an admin!!!")
            setAdmin(true)
          } else {
            setAdmin(false)
          }
        })
        .catch((error) => {
          removeToken();
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };
  
  // const authenticateUser = () => {
  //   //  <==  ADD
  //   // Get the stored token from the localStorage
  //   const storedToken = localStorage.getItem("authToken");

  //   // If the token exists in the localStorage
  //   if (storedToken) {
  //     // We must send the JWT token in the request's "Authorization" Headers
  //     get("/auth/verify")
  //       .then((response) => {
  //         // If the server verifies that the JWT token is valid
  //         const user = response.data;
  //         // Update state variables
  //         setIsLoggedIn(true);
  //         setIsLoading(false);
  //         setUser(user);
  //       })
  //       .catch((error) => {
  //         // If the server sends an error response (invalid token)
  //         // Update state variables
  //         removeToken();
  //         setIsLoggedIn(false);
  //         setIsLoading(false);
  //         setUser(null);
  //       });
  //   } else {
  //     // If the token is not available (or is removed)
  //     setIsLoggedIn(false);
  //     setIsLoading(false);
  //     setUser(null);
  //   }
  // };

  const logOutUser = () => {
    // <== ADD
    // To log out the user, remove the token
    removeToken();
    // and update the state variables
    // setAdmin(false)
    
    authenticateUser();
    navigate('/')
  };

  useEffect(() => {
    authenticateUser(); //  <==  ADD
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        admin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };