import React, { createContext, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {children}
      </LoginContext.Provider>
    </NavigationContainer>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
