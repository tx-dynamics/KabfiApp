import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import styles from "./styles";
import { StatusBar } from "expo-status-bar";
import { Header } from "react-native-elements";
import { smile, back } from "../../../assets";
import Ionicons from "react-native-vector-icons/Ionicons";
const feedback2 = (props) => {
  const [ease, setease] = useState(false);
  const [usefull, setusefull] = useState(false);
  const [technical, settechnical] = useState(false);
  const [app, setapp] = useState(false);
  const [other, setother] = useState(false);
  return (
    <View style={styles.main}>
      <StatusBar style="dark" />
      <Header
        backgroundColor="white"
        containerStyle={{ marginTop: 0, borderBottomWidth: 0 }}
      />
      <Text style={{ flex: 0.07 }}></Text>
      <View
        style={{
          flexDirection: "row",
          width: "80%",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={smile}
          resizeMode="contain"
          style={{ height: 50, width: 50, alignSelf: "center" }}
        />
        <Text style={[styles.happytxt, { marginLeft: 10 }]}>
          What made you happy?
        </Text>
      </View>
      <Text style={{ flex: 0.05 }}></Text>
      <TouchableOpacity
        onPress={() => {
          setease(true);
        }}
        style={{
          backgroundColor: ease ? "orange" : "white",
          padding: 15,
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
              color: ease ? "white" : "orange",
              textAlign: "center",
            },
          ]}
        >
          Ease of use
        </Text>
      </TouchableOpacity>
      <Text style={{ flex: 0.05 }}></Text>
      <TouchableOpacity
        onPress={() => {
          setusefull(true);
        }}
        style={{
          backgroundColor: usefull ? "orange" : "white",
          padding: 15,
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
              color: usefull ? "white" : "orange",
              textAlign: "center",
            },
          ]}
        >
          Usefulness
        </Text>
      </TouchableOpacity>
      <Text style={{ flex: 0.05 }}></Text>
      <TouchableOpacity
        onPress={() => {
          settechnical(true);
        }}
        style={{
          backgroundColor: technical ? "orange" : "white",
          padding: 15,
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
              color: technical ? "white" : "orange",
              textAlign: "center",
            },
          ]}
        >
          Technical Performance
        </Text>
      </TouchableOpacity>
      <Text style={{ flex: 0.05 }}></Text>
      <TouchableOpacity
        onPress={() => {
          setapp(true);
        }}
        style={{
          backgroundColor: app ? "orange" : "white",
          padding: 15,
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
              color: app ? "white" : "orange",
              textAlign: "center",
            },
          ]}
        >
          Application Design
        </Text>
      </TouchableOpacity>
      <Text style={{ flex: 0.05 }}></Text>
      <TouchableOpacity
        onPress={() => {
          setother(true);
        }}
        style={{
          backgroundColor: other ? "orange" : "white",
          padding: 15,
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
              color: other ? "white" : "orange",
              textAlign: "center",
            },
          ]}
        >
          Other
        </Text>
      </TouchableOpacity>
      <Text style={{ flex: 0.05 }}></Text>
      <View
        style={{
          flexDirection: "row",
          width: "80%",
          alignSelf: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate("feedback1")}
          style={{
            flexDirection: "row",
            borderRadius: 30,
            borderWidth: 2,
            borderColor: "orange",
            width: "40%",
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name={"chevron-back-outline"}
            color="orange"
            size={22}
            style={{ alignSelf: "center" }}
          />
          <Text
            style={[
              {
                color: "orange",
                textAlign: "center",
              },
            ]}
          >
            PREVIOUS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("feedback5", {
              screen: "What made you happy?",
              ease,
              usefull,
              app,
              technical,
              other,
            })
          }
          style={{
            flexDirection: "row",
            borderRadius: 30,
            borderWidth: 2,
            borderColor: "orange",
            width: "40%",
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              {
                color: "orange",
                textAlign: "center",
                alignSelf: "center",
              },
            ]}
          >
            NEXT
          </Text>
          <Ionicons
            name={"chevron-forward-outline"}
            color="orange"
            size={22}
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default feedback2;
