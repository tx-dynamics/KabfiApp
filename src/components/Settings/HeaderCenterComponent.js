import React from "react";
import { View, StyleSheet, Text } from "react-native";

const HeaderCenterComponent = ({ name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{name}</Text>
    </View>
  );
};
export default HeaderCenterComponent;
export const styles = StyleSheet.create({
  container:{
    marginTop:-4
    // backgroundColor:'red',
    // marginBottom:10
  },
  textStyle: {
    fontSize: 19,
    color: "black",
    fontWeight: "700",    
  },
});
