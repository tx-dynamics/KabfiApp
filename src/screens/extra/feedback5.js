import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "./styles";
import { StatusBar } from "expo-status-bar";
import { Header } from "react-native-elements";
import { star,fstar, sad, ok, smile, smiley } from "../../../assets";
import Ionicons from "react-native-vector-icons/Ionicons";
import firebase from "firebase";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const feedback5 = (props) => {
  const [isSmile, setisSmile] = useState(false);
  const [tell, settell] = useState("");
  const [phone, setphone] = useState("");
  const [screen, setscreen] = useState("");
  const [ease, setease] = useState(false);
  const [usefull, setusefull] = useState(false);
  const [technical, settechnical] = useState(false);
  const [app, setapp] = useState(false);
  const [other, setother] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [validphone, setvalidphone] = useState(false);
  const [validtell, setvalidtell] = useState(false);
  useEffect(() => {
    const params = props.route.params;
    console.log(params?.ease);
    setapp(params?.app);
    setease(params?.ease);
    setother(params?.other);
    settechnical(params?.technical);
    setusefull(params?.usefull);
    setscreen(params?.screen);
  }, []);
  async function onsubmit() {
    setvalidphone(false);
    setvalidtell(false);
    setisLoading(true);
    // if (phone !== "" && tell !== "") {
    const submitFeedback = await firebase
      .database()
      .ref("Feedback/" + firebase.auth().currentUser?.uid);
    const data = {
      ease,
      app,
      usefull,
      other,
      technical,
      screen,
      phone,
      feedback: tell,
    };
    submitFeedback.push(data);
    setisLoading(false);
    props.navigation.navigate("feedback6");
    // } else {
    //   setisLoading(false);
    //   if (phone === "" && tell === "") {
    //     setvalidphone(true);
    //     setvalidtell(true);
    //   }
    //   if (phone === "") {
    //     setvalidphone(true);
    //   }
    //   if (tell === "") {
    //     setvalidtell(true);
    //   }
    // }
  }
  return (
    <KeyboardAwareScrollView  style={{ flex: 1, backgroundColor: "white", flexGrow: 1 }}>
  
        <StatusBar style="dark" />
        <Header
          backgroundColor="white"
          containerStyle={{ marginTop: 0, borderBottomWidth: 0 }}
        />

        <Text style={{ marginTop: 15 }}></Text>
        <Text style={[styles.happytxt, { fontWeight:'normal',color:'#3E4143',fontFamily:'Sf-pro-display-medium',alignSelf: "center", width: "80%" }]}>
          Share your feedback
        </Text>
        <Text
          style={[
            { alignSelf: "center",color:'#3E4143',fontFamily:'Sf-pro-display', width: "80%", marginTop: 5, fontSize: 14 },
          ]}
        >
          How satisfied are you with KABFI?
        </Text>
        <Text style={{ marginTop: 25 }}></Text>
        <Image
          source={fstar}
          resizeMode="contain"
          style={{ height: 100, width: 100, alignSelf: "center" }}
        />
        <Text style={{ marginTop:25 }}></Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder={"Tell us more"}
          style={{
            width: "80%",
            alignSelf: "center",
            height: 200,
            backgroundColor: "#FFFFFF",
            paddingHorizontal: 15,
            marginTop: 10,
            fontSize: 16,
            fontWeight: "400",
            paddingVertical: responsiveHeight(2),
            borderWidth: 1.5,
            borderColor: "#CCCDCC",
            borderRadius: 26,
          }}
          textAlignVertical="top"
          onChangeText={(text) => settell(text)}
          value={tell}
          placeholderTextColor={"#3E4143"}
          underlineColorAndroid="transparent"
        />
        <TextInput
          placeholder={"Your mobile number"}
          style={{
            width: "80%",
            alignSelf: "center",
            paddingHorizontal: 15,
            backgroundColor: "#FFFFFF",
            marginTop: 20,
            fontSize: 14,
            // fontWeight: "400",
            borderWidth: 2,
            borderRadius: 26,
            borderColor: "#CCCDCC",
            paddingVertical: 7,
            borderWidth: 1.5,
          }}
          onChangeText={(text) => setphone(text)}
          value={phone}
          keyboardType="phone-pad"
          placeholderTextColor={"#3E4143"}
          underlineColorAndroid="transparent"
        />
        <Text style={{ marginTop: 10 }}></Text>
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            alignSelf: "center",
            justifyContent: "space-between",
            marginTop: responsiveHeight(10),
          }}
        >
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
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
            onPress={onsubmit}
            // onPress={() => props.navigation.navigate("feedback6")}
            style={{
              flexDirection: "row",
              borderRadius: 30,
              borderWidth: 2,
              borderColor: "orange",
              width: "40%",
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "orange",
            }}
          >
            {isLoading ? (
              <ActivityIndicator color={"white"} size={"small"} />
            ) : (
              <Text
                style={[
                  {
                    color: "white",
                    textAlign: "center",
                    alignSelf: "center",
                  },
                ]}
              >
                SUBMIT
              </Text>
            )}
            <Ionicons
              name={"chevron-forward-outline"}
              color="white"
              size={22}
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>
        </KeyboardAwareScrollView>
  );
};
export default feedback5;
