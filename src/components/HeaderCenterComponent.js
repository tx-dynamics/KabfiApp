import React from "react";
import { View, StyleSheet, Text } from "react-native";

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
    fontSize: 19,
    color: "black",
    fontWeight: "700",
    alignSelf: "center",
    bottom: 10,
  },
});
