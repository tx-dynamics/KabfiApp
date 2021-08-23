import React from "react";
import { Button, TouchableOpacity, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "../screens/home/Main";
import Settings from "../screens/home/Settings";
import EditProfile from "../screens/home/EditProfile";
import ResetPassword from "../screens/home/ResetPassword";
import Legal from "../screens/home/Legal";
import NewsFeed from "../screens/NewsFeed";
import CommentScreen from "../screens/CommentScreen/CommentScreen";
import PrivacyPolicy from "../screens/extra/PrivacyPolicy";
import TermsAndConditions from "../screens/extra/TermsAndConditions";
import Map from "../screens/home/Map";
import CreatePost from "../screens/home/CreatePost";
import savedPost from "../screens/home/savedPost";
import HeatMap from "../screens/home/HeatMap";
import feedback1 from "../screens/extra/feedback1";
import feedback2 from "../screens/extra/feedback2";
import feedback3 from "../screens/extra/feedback3";
import feedback4 from "../screens/extra/feedback4";
import feedback5 from "../screens/extra/feedback5";
import feedback6 from "../screens/extra/feedback6";
const Stack = createStackNavigator();

const StackNavigatorAfter = (props) => {
  return (
    // <NavigationContainer>
    <Stack.Navigator initialRouteName="NewsFeed">
      <Stack.Screen
        name="feedback1"
        component={feedback1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="feedback2"
        component={feedback2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="feedback3"
        component={feedback3}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="feedback4"
        component={feedback4}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="feedback5"
        component={feedback5}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="feedback6"
        component={feedback6}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="savedPost"
        component={savedPost}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewsFeed"
        component={NewsFeed}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CommentScreen"
        component={CommentScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Legal"
        component={Legal}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Map"
        component={Map}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HeatMap"
        component={HeatMap}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
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
    </Stack.Navigator>
    // </NavigationContainer>
  );
};
export default StackNavigatorAfter;
