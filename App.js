import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CurrentNavigator from "./src/navigation/CurrentNavigator";
import LoginProvider from "./src/context/LoginProvider";
console.disableYellowBox = true;
import { useLogin } from "./src/context/LoginProvider";
export default function App() {
  return (
    <LoginProvider>
      <CurrentNavigator />
    </LoginProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
