import React,{useEffect} from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Font from 'expo-font';
const HeaderCenterComponent = ({ name }) => {

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.textStyle}>{name}</Text>
    </View>
  );
};
export default HeaderCenterComponent;
export const styles = StyleSheet.create({
  textStyle: {
    fontSize: 17,
    color: "#000000",
    fontWeight: "700",
    alignSelf: "center",
    // fontFamily:'Sf-pro-display'
  },
});
