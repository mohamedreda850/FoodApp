import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const AuthContext = createContext(null);

export default function AuthContextProvider(props) {
 
  const [loginData, setLoginData] = useState(null);
  const [loading, setLoading] = useState(true);
  let saveLoginData = () => {
    let decodedToken = localStorage.getItem("foodAppToken");
    let encodedToken = jwtDecode(decodedToken);
    setLoginData(encodedToken);
    console.log(loginData);
  };
  useEffect(() => {
    if (localStorage.getItem("foodAppToken")) {
      saveLoginData();
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("foodAppToken");
    if (token) {
      // Simulate an async call to fetch user data
      setTimeout(() => {
        setLoginData({ userGroup: "SystemUser" }); // Replace with real API call
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        loginData,
        saveLoginData,
        loading 
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
