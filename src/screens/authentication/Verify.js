import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  BackHandler,
  Platform
} from "react-native";
import firebase from "firebase";
import { verifyImage } from "../../../assets";
const Verify = (props) => {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const onPress = () => {
   if(Platform.OS === 'ios'){
    props.navigation.navigate("Signin");
   }
    else{
      BackHandler.exitApp()
    }
    
  }
  //   function userResetPassword() {
  //     firebase
  //       .auth()
  //       .sendPasswordResetEmail(email)
  //       .then(function (user) {
  //         // alert('Please check your email...')
  //         props.navigation.navigate("SendEmail");
  //       })
  //       .catch((error) => {
  //         alert(error.message);
  //         // setLoader(false);
  //       });
  //   }

  return (
    <ScrollView style={styles.root}>
      <View style={styles.contentArea}>
        <View style={styles.lockImageContainer}>
          <Image source={verifyImage} style={styles.lockImage} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textHeading}>
            Your account should be approved within 24 hours
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.btn2} 
            onPress={onPress}>
            <Text style={styles.btn2Text}>{!Platform.OS === 'ios'?"Close Application":"Sign In"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    // alignItems:"center",
    backgroundColor: "white",
    flex: 1,
  },
  contentArea: {
    width: "100%",
    height: "100%",
    marginTop: "40%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  lockImageContainer: {
    alignItems: "center",
  },
  lockImage: {
    width: 150,
    height: 150,
  },
  textContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  textHeading: {
    fontSize: 17,
    fontWeight: "bold",
    width: "58%",
    textAlign: "center",
  },
  buttonsContainer: {
    marginTop: 10,
  },
  btn2: {
    marginTop: 30,
    backgroundColor: "#FAB040",
    borderRadius: 5,
    padding: 13,
    alignItems: "center",
    borderRadius: 25,
  },
  btn2Text: {
    color: "white",
  },
});

export default Verify;
