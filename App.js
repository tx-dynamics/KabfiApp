import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import CurrentNavigator from "./src/navigation/CurrentNavigator";
import LoginProvider from "./src/context/LoginProvider";
console.disableYellowBox = true;
import { useLogin } from "./src/context/LoginProvider";
import { Provider } from 'react-redux';
import { store, persistor } from './src/Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <LoginProvider />
        </SafeAreaView>
      </PersistGate>
    </Provider>
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
