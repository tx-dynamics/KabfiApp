import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { bar } from "../../assets";

const HeaderRight = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("CreatePost")}
      style={{ alignItems: "center" }}
    >
      <ImageBackground
        source={bar}
        resizeMode={"contain"}
        style={{
          height: 40,
          width: 40,
          alignItems: "flex-end",
          alignSelf: "center",
          // backgroundColor: 'tomato',
        }}
      ></ImageBackground>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    //fontFamily: Fonts.GoogleSansBold,
    // color: theme.colors.primaryDark,
  },
});
export default HeaderRight;
