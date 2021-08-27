import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { StatusBar } from "expo-status-bar";
import { Header } from "react-native-elements";
import { star, sad, ok, smile, smiley } from "../../../assets";
import Ionicons from "react-native-vector-icons/Ionicons";
import firebase from "firebase";
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
    if (phone !== "" && tell !== "") {
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
    } else {
      setisLoading(false);
      if (phone === "" && tell === "") {
        setvalidphone(true);
        setvalidtell(true);
      }
      if (phone === "") {
        setvalidphone(true);
      }
      if (tell === "") {
        setvalidtell(true);
      }
    }
  }
  return (
    <View style={styles.main}>
      <StatusBar style="dark" />
      <Header
        backgroundColor="white"
        containerStyle={{ marginTop: 0, borderBottomWidth: 0 }}
      />
      <ScrollView
        style={{ flex: 0.9, backgroundColor: "white" }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={{ marginTop: 15 }}></Text>
        <Text style={[styles.happytxt, { alignSelf: "center", width: "80%" }]}>
          Share your feedback
        </Text>
        <Text
          style={[
            styles.largetxt,
            { alignSelf: "center", width: "80%", marginTop: 5 },
          ]}
        >
          How you satisfied are you with KABFI?
        </Text>
        <Text style={{ marginTop: 20 }}></Text>
        <Image
          source={star}
          resizeMode="contain"
          style={{ height: 100, width: 100, alignSelf: "center" }}
        />
        <Text style={{ flex: 0.05 }}></Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder={"Tell us more"}
          style={{
            width: "80%",
            alignSelf: "center",
            height: 250,
            backgroundColor: "#FBFBFB",
            paddingHorizontal: 10,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            marginTop: 10,
            fontSize: 16,
            fontWeight: "400",
            paddingVertical: 8,
            borderColor: validtell ? "red" : "white",
            borderWidth: 1,
          }}
          textAlignVertical="top"
          onChangeText={(text) => settell(text)}
          value={tell}
          placeholderTextColor={"lightgray"}
          underlineColorAndroid="transparent"
        />
        <TextInput
          placeholder={"Your mobile number"}
          style={{
            width: "80%",
            alignSelf: "center",
            paddingHorizontal: 15,
            backgroundColor: "white",
            marginTop: 20,
            fontSize: 14,
            // fontWeight: "400",
            borderWidth: 2,
            borderRadius: 20,
            borderColor: "#FBFBFB",
            paddingVertical: 7,
            borderColor: validphone ? "red" : "white",
            borderWidth: 1,
          }}
          onChangeText={(text) => setphone(text)}
          value={phone}
          keyboardType="phone-pad"
          placeholderTextColor={"lightgray"}
          underlineColorAndroid="transparent"
        />
        <Text style={{ marginTop: 10 }}></Text>
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            alignSelf: "center",
            justifyContent: "space-between",
            marginTop: 30,
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
      </ScrollView>
    </View>
  );
};
export default feedback5;
