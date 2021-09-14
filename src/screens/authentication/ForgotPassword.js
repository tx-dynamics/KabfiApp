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
  TouchableWithoutFeedback,
} from "react-native";
import firebase from "firebase";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Header } from "react-native-elements";
import HeaderLeftComponent from "../../components/HeaderLeftComponent";
const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

  async function userResetPassword() {
    let data = await firebase.auth().fetchSignInMethodsForEmail(email);
    if (data && data.length > 0) {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(async function (user) {
          //console.log(user)
          // alert('Please check your email...')
          props.navigation.navigate("SendEmail");
        })
        .catch((error) => {
          alert(error.message);
          // setLoader(false);
        });
    } else {
      alert(
        "There is no user record corresponding to this email. Please check and try again, if you are having further trouble accessing your account please email info@kabfi.com"
      );
    }
  }
  return (
    <ScrollView style={styles.root}>
      <Header
        containerStyle={{ borderBottomWidth: 0 }}
        backgroundColor="white"
        leftComponent={
          <TouchableWithoutFeedback
            activeOpacity={0}
            style={styles.drawerIcon}
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            {/* <Image
            source={back}
            // resizeMode={'contain'}
            style={{height: 20.97, width: 11.98, tintColor: 'black'}}
          /> */}
            <Ionicons name="chevron-back-outline" size={30} />
          </TouchableWithoutFeedback>
        }
      />

      <View style={styles.contentArea}>
        <View style={styles.lockImageContainer}>
          <Image
            source={require("../../../assets/ProjectImages/big-lock-image.png")}
            style={styles.lockImage}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textHeading}>Reset Password</Text>
          <Text style={[styles.textSimple, { width: "80%" }]}>
            Enter the email associated with your account and we’ll send an email
            with instructions to reset your password.
          </Text>
          {/* <Text style={styles.textSimple}>
            {" "}
            we'll send an email with instructions to reset your password.
          </Text> */}
        </View>

        <View style={styles.buttonsContainer}>
          <TextInput
            style={styles.emailInput}
            placeholder="Email address"
            value={email}
            onChangeText={(e) => setEmail(e)}
          />

          <TouchableOpacity
            style={styles.btn2}
            onPress={() => userResetPassword()}
          >
            {loader ? (
              <ActivityIndicator color={"red"} size={"small"} />
            ) : (
              <Text style={styles.btn2Text}>Send Password</Text>
            )}
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
    marginTop: "30%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  lockImageContainer: {
    alignItems: "center",
  },
  lockImage: {
    width: 110,
    height: 130,
  },
  textContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  textHeading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textSimple: {
    marginTop: 8,
    textAlign: "center",
    color: "#696969",
    fontSize: 13,
    lineHeight: 12,
  },
  buttonsContainer: {
    marginTop: 80,
  },
  emailInput: {
    backgroundColor: "#FBFBFB",
    borderRadius: 20,
    padding: 13,
    textAlign: "center",
  },

  btn2: {
    marginTop: 30,
    backgroundColor: "#FAB040",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  btn2Text: {
    color: "white",
  },
  drawerIcon: {
    height: 20,
    width: 20,
    tintColor: "black",
    alignItems: "center",
    // left: 3,
  },
});

export default ForgotPassword;
