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
const feedback6 = (props) => {
  const [isSmile, setisSmile] = useState(false);
  return (
    <View style={styles.main}>
      <StatusBar style="dark" />
      <Header
        backgroundColor="white"
        containerStyle={{ marginTop: 0, borderBottomWidth: 0 }}
      />
      <Text style={{ flex: 0.07 }}></Text>
      <Text
        style={[styles.largetxt, { alignSelf: "center", fontWeight: "700" }]}
      >
        Happiness Meter
      </Text>
      <Text style={{ flex: 0.05 }}></Text>
      <Image
        source={star}
        resizeMode="contain"
        style={{ height: 120, width: 120, alignSelf: "center" }}
      />
      <Text style={{ flex: 0.05 }}></Text>
      <Text style={[{ alignSelf: "center", fontSize: 24, fontWeight: "bold" }]}>
        THANK YOU
      </Text>
      <Text
        style={[styles.largetxt, { alignSelf: "center", fontWeight: "700" }]}
      >
        FOR
      </Text>
      <Text
        style={[styles.largetxt, { alignSelf: "center", fontWeight: "700" }]}
      >
        KEEPING KABFI GREAT!
      </Text>
      <Text style={{ flex: 0.09 }}></Text>
      <Text
        style={[styles.largetxt, { alignSelf: "center", fontWeight: "700" }]}
      >
        Find out more on
      </Text>
      <Text
        style={[
          styles.largetxt,
          { alignSelf: "center", color: "orange", fontWeight: "700" },
        ]}
      >
        kabfi.com
      </Text>
      <Text style={{ flex: 0.05 }}></Text>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("NewsFeed");
        }}
        style={{
          backgroundColor: "orange",
          padding: 13,
          width: "80%",
          alignSelf: "center",
          borderRadius: 30,
          borderWidth: 2,
          borderColor: "orange",
        }}
      >
        <Text
          style={[
            {
              marginLeft: 10,
              color: "white",
              textAlign: "center",
            },
          ]}
        >
          Back home
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default feedback6;
