import React from "react";
import { Button, TouchableOpacity, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "../screens/home/Main";
import Settings from "../screens/home/Settings";
import EditProfile from "../screens/home/EditProfile";
import ResetPassword from "../screens/home/ResetPassword";
import NewsFeed from "../screens/NewsFeed";
import CommentScreen from "../screens/CommentScreen/CommentScreen";

const Stack = createStackNavigator();

const StackNavigatorAfter = (props) => {
  function getOptions(screenName, navigation) {
    var title = "";
    var headerLeft = "";
    var headerRight = "";
    if (screenName === "settings") {
      (title = "Settings"), (headerLeft = this.renderHeaderLeft);
      headerRight = null;
    } else if (screenName === "editProfile") {
      (title = "Edit Profile"),
        (headerLeft = () => (
          <TouchableOpacity
            style={{ padding: 20 }}
            onPress={() => navigation.navigate("Main")}
          >
            <Text style={{ color: "#197AFF" }}>Back</Text>
          </TouchableOpacity>
        )),
        (headerRight = () => (
          <TouchableOpacity style={{ padding: 20 }}>
            <Text style={{ color: "#727272" }}>Save</Text>
          </TouchableOpacity>
        ));
    }

    return {
      headerLeft: headerLeft,
      headerRight: headerRight,
      title: title,
      headerTitleAlign: "center",
      headerTintColor: "black",
      headerStyle: {
        backgroundColor: "#F9F9F9",
      },
      headerTitleStyle: {
        alignSelf: "center",
      },
      headerTitleStyle: {
        color: "black",
      },
      HeaderBackButton: {
        // tintColor:'yellow'
      },
    };
  }

  return (
    <Stack.Navigator initialRouteName="NewsFeed">
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={getOptions("settings")}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={({ navigation }) => getOptions("editProfile", navigation)}
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
    </Stack.Navigator>
  );
};
export default StackNavigatorAfter;
