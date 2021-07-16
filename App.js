import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CurrentNavigator from './src/navigation/CurrentNavigator';
import { NavigationContainer  } from '@react-navigation/native';
import LoginProvider from './src/context/LoginProvider';
// import StackNavigator from './src/navigation/StackNavigator';
// import StackNavigatorAfter from './src/navigation/StackNavigatorAfter';

export default function App() {
  return (
    <LoginProvider>
        <NavigationContainer>
        
        <CurrentNavigator />

        {/* <StackNavigator /> */}
        {/* <StackNavigatorAfter /> */}
        {/* <StatusBar style="light" />              */}
      </NavigationContainer>
    </LoginProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
