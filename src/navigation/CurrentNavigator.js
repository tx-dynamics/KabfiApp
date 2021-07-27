import firebase from "firebase";
import React, { useEffect } from "react";
import StackNavigator from "./StackNavigator";
import StackNavigatorAfter from "./StackNavigatorAfter";
import { useLogin } from "../context/LoginProvider";

const CurrentNavigator = () => {
  const { isLoggedIn } = useLogin();
  // return isLoggedIn ? <StackNavigatorAfter /> : <StackNavigator />;
  return <StackNavigatorAfter />;
};

export default CurrentNavigator;
