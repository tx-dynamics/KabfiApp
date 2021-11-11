import React, { createContext, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "../navigation/StackNavigator";
import StackNavigatorAfter from "../navigation/StackNavigatorAfter";
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginContext = createContext();
import { connect } from 'react-redux'

const LoginProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {/* <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {children}
      </LoginContext.Provider> */}

      {props.isLogin ?
        <StackNavigatorAfter />

        :
        <StackNavigator />

      }

    </NavigationContainer>
  );
};


// export default LoginProvider;
const mapStateToProps = (state) => {
  return {
    isLogin: state.AuthReducer.isLogin
  }
}
export default connect(mapStateToProps, null)(LoginProvider);
