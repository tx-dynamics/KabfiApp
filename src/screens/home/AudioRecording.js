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
import { Stopwatch } from "react-native-stopwatch-timer";
const Audio = (props) => {
  const [animated, setAnimated] = useState(new Animated.Value(0.7));
  const [opacityA, setOpacityA] = useState(new Animated.Value(1));
  const [isPressed, setIsPressed] = useState(false);
  const [stopwatchReset, setstopwatchReset] = useState(true);
  const [show, setshow] = useState(false);
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
        }),
        Animated.timing(opacityA, {
          toValue: 0,
          duration: 1000,
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
        // <View style={{ alignItems: "center" }}>
        //   <View style={{ flexDirection: "row", backgroundColor: "tomato" }}>
        //     <Stopwatch
        //       laps
        //       start={isPressed}
        //       // reset={!stopwatchReset}
        //       //To start
        //       options={{
        //         container: {
        //           backgroundColor: "transparent",
        //           padding: 5,
        //           borderRadius: 5,
        //           width: 180,
        //           alignSelf: "center",
        //           marginTop: 5,
        //         },
        //         text: {
        //           fontSize: 20,
        //           color: "black",
        //           alignSelf: "center",
        //         },
        //       }}
        //       //options for the styling
        //       getTime={(time) => {
        //         //console.log(time);
        //       }}
        //     />
        //   </View>
        <Animated.View
          style={{
            width: 100,
            height: 100,
            borderRadius: 75,
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
            size={30}
            color="white"
            style={{ alignSelf: "center" }}
          />
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            Rec.
          </Text>
          {/* icon or image */}
        </Animated.View>
        // {/* </View> */}
      );
    } else {
      //some function
      return (
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 75,
            backgroundColor: "#FCB040",
            justifyContent: "center",
          }}
        >
          <Feather
            name="mic"
            size={30}
            color="white"
            style={{ alignSelf: "center" }}
          />
          {/* icon or image */}
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            Rec.
          </Text>
        </View>
      );
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={_onPress}>{_micButton()}</TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: 'transparent',
    marginTop: responsiveHeight(4),
  },
});
export default Audio;
