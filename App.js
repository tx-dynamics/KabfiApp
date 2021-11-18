
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import LoginProvider from "./src/context/LoginProvider";
import StackNavigatorAfter from './src/navigation/StackNavigatorAfter'
import StackNavigator from './src/navigation/StackNavigator'
console.disableYellowBox = true;
import AsyncStorage from '@react-native-async-storage/async-storage';
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
