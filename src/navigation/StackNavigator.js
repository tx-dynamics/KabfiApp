import React from "react";
import { Button, TouchableOpacity, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Signin from "../screens/authentication/Signin";
import Signup from "../screens/authentication/signup/Signup";
import ForgotPassword from "../screens/authentication/ForgotPassword";
import SendEmail from "../screens/authentication/SendEmail";

import TermsAndConditions from "../screens/extra/TermsAndConditions";
import PrivacyPolicy from "../screens/extra/PrivacyPolicy";

import Verify from "../screens/authentication/Verify";
import PhoneAuth from "../screens/authentication/phoneAuth"
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

const StackNavigator = (props) => {
  return (
    // <NavigationContainer>
    <Stack.Navigator initialRouteName="Signin">
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SendEmail"
        component={SendEmail}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
        options={{
          headerShown: true,
          title: "Terms & Conditions",
          headerTitleStyle: { alignSelf: "center" },
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerShown: true,
          title: "Privacy Policy",
          headerTitleStyle: { alignSelf: "center" },
        }}
      />

      <Stack.Screen
        name="Verify"
        component={Verify}
        options={{ headerShown: false }}
      />

    <Stack.Screen
        name="PhoneAuth"
        component={PhoneAuth}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};
export default StackNavigator;
