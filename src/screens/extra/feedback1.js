import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { StatusBar } from "expo-status-bar";
import { Header } from "react-native-elements";
import { star, sad, ok, smile, smiley } from "../../../assets";
import HeaderLeftComponent from "../../components/HeaderLeftComponent";
const feedback1 = (props) => {
  const [isSmile, setisSmile] = useState(true);
  return (
    <View style={styles.main}>
      <StatusBar style="dark" />
      <Header
        containerStyle={{ borderBottomWidth: 0 }}
        backgroundColor="white"
        leftComponent={
          <HeaderLeftComponent icon="back" navigation={props.navigation} />
        }
      />
      <Header
        backgroundColor="white"
        containerStyle={{ marginTop: 0, borderBottomWidth: 0 }}
      />
      <Text style={{ flex: 0.07 }}></Text>
      <Text style={[styles.largetxt, { alignSelf: "center" }]}>
        Happiness Meter
      </Text>
      <Text style={{ flex: 0.05 }}></Text>
      <Image
        source={star}
        resizeMode="contain"
        style={{ height: 100, width: 100, alignSelf: "center" }}
      />
      <Text style={{ flex: 0.05 }}></Text>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          justifyContent: "space-around",
          width: "60%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            // setisSmile(!isSmile),
            props.navigation.navigate("feedback2");
          }}
        >
          <Image
            source={sad}
            resizeMode="contain"
            style={{ height: 50, width: 50, alignSelf: "center" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // setisSmile(!isSmile),
            props.navigation.navigate("feedback2");
          }}
        >
          <Image
            source={ok}
            resizeMode="contain"
            style={{ height: 50, width: 50, alignSelf: "center" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // setisSmile(!isSmile),
            props.navigation.navigate("feedback2");
          }}
        >
          {isSmile ? (
            <Image
              source={smiley}
              resizeMode="contain"
              style={{ height: 50, width: 50, alignSelf: "center" }}
            />
          ) : (
            <Image
              source={smile}
              resizeMode="contain"
              style={{ height: 50, width: 50, alignSelf: "center" }}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default feedback1;
