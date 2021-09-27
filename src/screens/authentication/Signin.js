import { StatusBar } from "expo-status-bar";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import React, { useState, useEffect, useRef } from "react";
import { ProgressBar, Colors, Snackbar } from "react-native-paper";

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
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
// import { useLogin } from "../../context/LoginProvider";
import firebase from "firebase";
import { useIsFocused } from "@react-navigation/native";
import { ScrollView } from "react-native";
import * as Permissions from "expo-permissions";
import { connect } from "react-redux";
import { SetSession } from "../../Redux/Actions/Actions";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Signin = (props) => {
  const isFocused = useIsFocused();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [loader, setLoader] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messge, setMessage] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();
  // const { setIsLoggedIn } = useLogin();
  useEffect(() => {
    if (isFocused) {
      console.log("TETS", firebase.auth().currentUser);
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // fetchLocation();
          registerForPushNotificationsAsync().then((token) =>
            firebase
              .database()
              .ref("users/" + firebase.auth().currentUser?.uid + "/")
              .update({
                pushToken: token,
                userPlatform: Platform.OS == "ios" ? "IOS" : "ANDROID",
              })
          );
          // setIsLoggedIn(true);
        } else {
          // fetchLocation();
          // setIsLoggedIn(false);
        }
      });
    }
    // Notifications.addNotificationReceivedListener((response) => {
    //   console.log(response);
    // });

    // return () => {
    //   Notifications.removeNotificationSubscription();
    //   Notifications.removeNotificationSubscription(responseListener.current);
    // };
  }, [props, isFocused]);

  function passwordVisibility() {
    passwordHidden === true
      ? setPasswordHidden(false)
      : setPasswordHidden(true);
  }

  async function userSignin() {
    setLoader(true);
    // fetchLocation();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        registerForPushNotificationsAsync().then((token) =>
          firebase
            .database()
            .ref("users/" + firebase.auth().currentUser?.uid + "/")
            .update({
              pushToken: token,
              userPlatform: Platform.OS == "ios" ? "IOS" : "ANDROID",
            })
        );
        props.SessionMaintain({ isLogin: true });
        // setIsLoggedIn(true);
        setLoader(false);
      })
      .catch((error) => {
        setMessage(error.message);
        setIsVisible(!isVisible);
        // alert(error.message);
        setLoader(false);
      });
  }
  async function fetchLocation() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setMessage("Permission to access location was denied");
      setIsVisible(!isVisible);
      // alert("Permission to access location was denied");
      return;
    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.root}
    >
      {/* <SafeAreaView style={styles.root}> */}
      <StatusBar style="dark" />
      
      <View style={styles.contentArea}>
      {isVisible ? (
            <View style={{ height: 60 }}>
              <Snackbar
                style={{
                  backgroundColor: "#FF9900",
                  marginLeft: 8,
                  marginRight: 8,
                  borderRadius: 10,
                }}
                visible={isVisible}
                action={{ label: "ok" }}
                onDismiss={() => setIsVisible(!isVisible)}
                //   <AntDesign style={{marginLeft:10}} name="checkcircleo" size={24} color="white" />
                // )}
                // position={'top'}
                duration={messge.length + 1000}
              >
                <Text>{messge}</Text>
              </Snackbar>
            </View>
          ) : (
            <></>
        )}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/ProjectImages/logo.png")}
            style={styles.logoImage}
          />
        </View>

        <View style={styles.loginForm}>
          <View style={[styles.textFieldContainer, { marginTop: 20 }]}>
            {/* <Image
              source={require("../../../assets/ProjectImages/authentication/mail-icon.png")}
              style={styles.fieldIcon}
            /> */}
            <TextInput
              style={styles.textField}
              value={email}
              placeholder="Email"
              onChangeText={(e) => setEmail(e)}
            />
          </View>

          <View style={[styles.textFieldContainer, { marginTop: 26 }]}>
            {/* <Image
              source={require("../../../assets/ProjectImages/authentication/password-icon.png")}
              style={styles.fieldIcon}
            /> */}

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
                <Text style={{ color: "white" }}>LOGIN</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.socialIconsContainer}>
            <TouchableOpacity
              style={styles.socialIconsContainerSingle}
              onPress={() =>
                Linking.openURL("https://www.facebook.com/kabfiglobal")
              }
            >
              <FontAwesome name="facebook" style={styles.socialIcon} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialIconsContainerSingle}
              onPress={() => Linking.openURL("https://twitter.com/kabfiglobal")}
            >
              <Entypo name="twitter" style={styles.socialIcon} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialIconsContainerSingle}
              onPress={() =>
                Linking.openURL("https://www.instagram.com/kabfiglobal/")
              }
            >
              <AntDesign name="instagram" style={styles.socialIcon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => props.navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={{ alignItems: "center", marginTop: 10 }}
            onPress={() => props.navigation.navigate("Signup")}
          > */}
              <Text style={[styles.forgotPasswordText],{alignSelf:'center'}}>Don't have an account?
                <TouchableOpacity
                  style={{alignItems:'center'}}
                  onPress={() => props.navigation.navigate("Signup")}
                  > 
                  <Text style={{fontSize:14,fontWeight:'bold',color:'#FF9900',alignSelf:'center',top:4}}> Signup</Text>
                </TouchableOpacity>
              </Text>
          {/* </TouchableOpacity> */}
        </View>
      </View>

      {/* </SafeAreaView> */}
    </KeyboardAvoidingView>
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
    // borderBottomWidth: 1,
    // borderBottomColor: "black",
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: "#F9F9F9",
  },
  fieldIcon: {
    // fontSize:18,
    // color:'#FAB040',
    width: 15,
    height: 13,
    position: "absolute",
    top: 12,
    alignItems: "center",
  },
  loginBtn: {
    marginTop: 40,
    backgroundColor: "#FAB040",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
  },
  socialIconsContainer: {
    flexDirection: "row",
    width: "65%",
    // flex:1,
    alignSelf: "center",
    marginTop: 30,
    // backgroundColor:'red',
    // height:300
  },
  socialIconsContainerSingle: {
    // width:'30%',
    flex: 1,
    alignItems: "center",
  },
  socialIcon: {
    fontSize: 20,
    color: "#464646",
  },
  forgotPasswordContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  forgotPasswordText: {
    fontSize: 13,
  },
  eyeIcon: {
    fontSize: 20,
    justifyContent:"center",
    color: "#E6E6E6",
    alignSelf: "center",
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

const mapDispatchToProps = (dispatch) => {
  return {
    SessionMaintain: (data) => dispatch(SetSession(data)),
  };
};

export default connect(null, mapDispatchToProps)(Signin);
async function registerForPushNotificationsAsync() {
  try {
    let token;

    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        setMessage("Failed to get push token for push notification!");
        setIsVisible(!isVisible);
        // alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      setMessage("Must use physical device for Push Notifications");
        setIsVisible(!isVisible);
      // alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  } catch (e) {
    console.log("error", e);
  }
}
