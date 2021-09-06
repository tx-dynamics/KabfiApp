import React, { useState, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  LayoutAnimation,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { responsiveHeight } from "react-native-responsive-dimensions";
const Audio = (props) => {
  const [animated, setAnimated] = useState(new Animated.Value(0.7));
  const [opacityA, setOpacityA] = useState(new Animated.Value(1));
  const [isPressed, setIsPressed] = useState(false);
  // constructor(props) {
  //     super(props);
  //     this._onPress = this._onPress.bind(this);
  // }
  const _runAnimation = () => {
    //const { animated, opacityA } = this.state;
    Animated.loop(
      Animated.parallel([
        Animated.timing(animated, {
          toValue: 1,
          duration: 1000,
          //useNativeDriver: true,
        }),
        Animated.timing(opacityA, {
          toValue: 0,
          duration: 1000,
       //   useNativeDriver: true,
        }),
      ])
    ).start();
  };
  const _stopAnimation = () => {
    Animated.loop(
      Animated.parallel([Animated.timing(animated), Animated.timing(opacityA)])
    ).stop();
  };
  const _onPress = () => {
    props.onPressAudio();
    setIsPressed(!isPressed);
  };
  const _micButton = () => {
    //const { isPressed, animated, opacityA, } = this.state;
    if (isPressed) {
      //some function
      _runAnimation();
      return (
        <Animated.View
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: "#FCB040",
            justifyContent: "center",
            opacity: opacityA,
            transform: [
              {
                scale: animated,
              },
            ],
          }}
        >
          <Feather
            name="mic"
            size={50}
            color="black"
            style={{ alignSelf: "center" }}
          />
          {/* icon or image */}
        </Animated.View>
      );
    } else {
      //some function
      return (
        <View
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: "#FCB040",
            justifyContent: "center",
          }}
        >
          <Feather
            name="mic"
            size={50}
            color="black"
            style={{ alignSelf: "center" }}
          />
          {/* icon or image */}
        </View>
      );
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity 
      onPress={_onPress}
      >
        {_micButton()}</TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: '#F5FCFF',
    marginTop: responsiveHeight(4),
  },
});
export default Audio;
