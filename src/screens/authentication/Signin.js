import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  ActivityIndicator,
} from "react-native";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { useLogin } from "../../context/LoginProvider";
import firebase from "firebase";

// import * as firebase from 'firebase'

// import kabfiApp from '../../database/config';
// const table_todo = kabfiApp.database().ref('/ToDo');

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Signin = (props) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [loader, setLoader] = useState(false);

  const { setIsLoggedIn } = useLogin();
  // useEffect(() => {
  //   // setDataUpdated(!dataUpdated);
  //   if (firebase.auth().currentUser) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  function passwordVisibility() {
    passwordHidden === true
      ? setPasswordHidden(false)
      : setPasswordHidden(true);
  }

  function userSignin() {
    setLoader(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setIsLoggedIn(true);
        setLoader(false);
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });
  }

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.contentArea}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/ProjectImages/logo.png")}
            style={styles.logoImage}
          />
        </View>

        <View style={styles.loginForm}>
          <View style={[styles.textFieldContainer, { marginTop: 20 }]}>
            <Image
              source={require("../../../assets/ProjectImages/authentication/mail-icon.png")}
              style={styles.fieldIcon}
            />
            <TextInput
              style={styles.textField}
              value={email}
              placeholder="Email"
              onChangeText={(e) => setEmail(e)}
            />
          </View>

          <View style={[styles.textFieldContainer, { marginTop: 20 }]}>
            <Image
              source={require("../../../assets/ProjectImages/authentication/password-icon.png")}
              style={styles.fieldIcon}
            />

            <TouchableOpacity
              style={styles.eyeIconContainer}
              onPress={passwordVisibility}
            >
              <Ionicons
                name={passwordHidden ? "eye" : "eye-off"}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>

            <TextInput
              style={styles.textField}
              placeholder="Password"
              value={password}
              onChangeText={(e) => setPassword(e)}
              secureTextEntry={passwordHidden}
            />
          </View>

          <View>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => userSignin()}
            >
              {loader ? (
                <ActivityIndicator color={"red"} size={"small"} />
              ) : (
                <Text>Login</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.socialIconsContainer}>
            <TouchableOpacity
              style={styles.socialIconsContainerSingle}
              onPress={() => Linking.openURL("fb://quraancoaching/1")}
            >
              <FontAwesome name="facebook" style={styles.socialIcon} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialIconsContainerSingle}
              onPress={() => Linking.openURL("http://twitter.com")}
            >
              <Entypo name="twitter" style={styles.socialIcon} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialIconsContainerSingle}
              onPress={() => Linking.openURL("http://instagram.com")}
            >
              <AntDesign name="instagram" style={styles.socialIcon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => props.navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignItems: "center", marginTop: 10 }}
            onPress={() => props.navigation.navigate("Signup")}
          >
            <Text style={styles.forgotPasswordText}>Dont have an account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
  },
  contentArea: {
    width: "100%",
    height: "100%",
    marginTop: "10%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logoContainer: {
    alignItems: "center",
  },
  logoImage: {
    width: 110,
    height: 110,
  },
  loginForm: {
    marginTop: 50,
    width: "100%",
  },
  textFieldContainer: {},
  textField: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  fieldIcon: {
    // fontSize:18,
    // color:'#FAB040',
    width: 15,
    height: 13,
    position: "absolute",
    top: 18,
  },
  loginBtn: {
    marginTop: 50,
    backgroundColor: "#FAB040",
    alignItems: "center",
    padding: 12,
    borderRadius: 5,
  },
  socialIconsContainer: {
    flexDirection: "row",
    width: "65%",
    // flex:1,
    alignSelf: "center",
    marginTop: 80,
    // backgroundColor:'red',
    // height:300
  },
  socialIconsContainerSingle: {
    // width:'30%',
    flex: 1,
    alignItems: "center",
  },
  socialIcon: {
    fontSize: 17,
    color: "#464646",
  },
  forgotPasswordContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  forgotPasswordText: {
    fontSize: 12,
  },
  eyeIcon: {
    fontSize: 24,
    color: "#E6E6E6",
  },
  eyeIconContainer: {
    position: "absolute",
    top: 13,
    right: 13,
    width: 35,
    height: 25,
    alignItems: "center",
    zIndex: 1,
  },
});

export default Signin;
