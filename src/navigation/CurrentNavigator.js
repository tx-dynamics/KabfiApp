import React, { useEffect } from "react";
import StackNavigator from "./StackNavigator";
import StackNavigatorAfter from "./StackNavigatorAfter";
import { useLogin } from "../context/LoginProvider";
import firebase from "firebase";
const CurrentNavigator = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <StackNavigatorAfter /> : <StackNavigator />;
};

export default CurrentNavigator;
