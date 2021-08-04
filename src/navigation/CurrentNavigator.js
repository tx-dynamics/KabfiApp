import firebase from "firebase";
import React, { useEffect, useState } from "react";
import StackNavigator from "./StackNavigator";
import StackNavigatorAfter from "./StackNavigatorAfter";
import { useLogin } from "../context/LoginProvider";

// import { useIsFocused, NavigationContainer } from "@react-navigation/native";
const CurrentNavigator = () => {
  // const isFocused = useIsFocused();
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  useEffect(() => {
    // setDataUpdated(!dataUpdated);
    if (firebase.auth().currentUser) {
      setIsLoggedIn(true);
    }
  }, []);

  return isLoggedIn ? <StackNavigatorAfter /> : <StackNavigator />;
  // return <StackNavigatorAfter />;
};

export default CurrentNavigator;
