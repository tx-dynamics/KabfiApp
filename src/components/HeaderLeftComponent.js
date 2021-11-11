import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import { Button } from "react-native-elements";
import { menu } from "../../assets";
import Ionicons from "react-native-vector-icons/Ionicons";

const HeaderLeftComponent = ({ navigation, icon }) => {
  return (
    <View>
      {icon === "back" ? (
        <TouchableWithoutFeedback
          activeOpacity={0}
          style={styles.drawerIcon}
          onPress={() => {
            navigation.navigate("NewsFeed");
          }}
        >
          {/* <Image
            source={back}
            // resizeMode={'contain'}
            style={{height: 20.97, width: 11.98, tintColor: 'black'}}
          /> */}
          <Ionicons name="chevron-back-outline" size={30} />
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback
          activeOpacity={0}
          style={styles.drawerIcon}
          onPress={() => {
            navigation.navigate("Main");
          }}
        >
          <Image
            source={menu}
            resizeMode={"contain"}
            style={styles.drawerIcon}
          />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default HeaderLeftComponent;

const styles = StyleSheet.create({
  drawerIcon: {
    height: 20,
    width: 20,
    tintColor: "black",
    alignItems: "center",
    // left: 3,
  },
});
