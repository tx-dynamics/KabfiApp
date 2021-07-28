import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground
} from "react-native";

import { Button } from "react-native-elements";
import { back } from "../../../assets";
import Ionicons from "react-native-vector-icons/Ionicons";
// import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";

const HeaderLeftComponent = ({ navigation, icon }) => {
  return (
      <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate('Main')}>
        <Image style={styles.image} source={back} />       
      </TouchableOpacity>
    );
};

export default HeaderLeftComponent;

export const styles = StyleSheet.create({
  container: {
    // padding:20,
    // backgroundColor:'red'
    //fontFamily: Fonts.GoogleSansBold,
    // color: theme.colors.primaryDark,
  },
  image:{
    marginLeft:30, 
    // backgroundColor:'red'
  }
});
