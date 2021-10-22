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
import { star,fstar, sad, ok, smile, smiley } from "../../../assets";
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
        style={[styles.largetxt, { fontFamily:'System',color:'#3E4143',alignSelf: "center", fontFamily:'Sf-pro-display-medium' }]}
      >
        Happiness Meter
      </Text>
      <Text style={{ flex: 0.15 }}></Text>
      <Image
        source={fstar}
        resizeMode="contain"
        style={{ height: 120, width: 120, alignSelf: "center" }}
      />
      <Text style={{ flex: 0.1 }}></Text>
      <Text style={[{ color:'#3E4143',alignSelf: "center", fontSize: 24, fontFamily:'Sf-pro-display-bold' }]}>
        THANK YOU
      </Text>
      <Text
        style={[styles.largetxt, { color:'#3E4143',alignSelf: "center", fontFamily:'Sf-pro-display-medium' }]}
      >
        FOR
      </Text>
      <Text
        style={[styles.largetxt, { alignSelf: "center", fontWeight: "500",fontFamily:'Sf-pro-display-medium' }]}
      >
        KEEPING KABFI GREAT!
      </Text>
      <Text style={{ flex: 0.09 }}></Text>
      <Text
        style={[styles.largetxt, { color:'#3E4143',alignSelf: "center", fontWeight: "500",fontFamily:'Sf-pro-display-medium'}]}
      >
        Find out more on
      </Text>
      <Text
        style={[
          styles.largetxt,
          { alignSelf: "center", color: "#FCB040", fontWeight: "700",fontFamily:'Sf-pro-display-medium' },
        ]}
      >
        Kabfi.com
      </Text>
      <Text style={{ flex: 0.05 }}></Text>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("NewsFeed");
        }}
        style={{
          backgroundColor: "#FCB040",
          padding: 13,
          width: "80%",
          alignSelf: "center",
          borderRadius: 30,
          borderWidth: 2,
          borderColor: "#FCB040",
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
