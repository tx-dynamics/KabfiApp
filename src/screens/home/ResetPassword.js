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
  ActivityIndicator,
} from "react-native";
// import { kabfiApp, firebase } from '../../database/config';
import { ProgressBar, Colors, Snackbar } from "react-native-paper";
import firebase from "firebase";
import { returnImage } from "../../../assets";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  Feather,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
const ResetPassword = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messge, setMessage] = useState("");
  const [oldpasswordHidden, setOldPasswordHidden] = useState(true);
  const [newpasswordHidden, setNewPasswordHidden] = useState(true);
  const [confirmpasswordHidden, setConfirmPasswordHidden] = useState(true);

  const [oldpasswordError, setOldPasswordError] = useState(true);
  const [newpasswordError, setNewPasswordError] = useState(true);
  const [confirmpasswordError, setConfirmPasswordError] = useState(true);

  function oldPasswordVisibility() {
    oldpasswordHidden === true
      ? setOldPasswordHidden(false)
      : setOldPasswordHidden(true);
  }

  function newPasswordVisibility() {
    newpasswordHidden === true
      ? setNewPasswordHidden(false)
      : setNewPasswordHidden(true);
  }

  function confirmPasswordVisibility() {
    confirmpasswordHidden === true
      ? setConfirmPasswordHidden(false)
      : setConfirmPasswordHidden(true);
  }

  function reauthenticate(oldPassword) {
    console.log("here");
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      oldPassword
    );
    return user.reauthenticateWithCredential(cred);
  }

  async function userResetPassword() {
    setLoader(true);

    if (oldPassword === "" && newPassword === "" && confirmPassword === "") {
      setOldPasswordError("This Field is required");
      setNewPasswordError("This Field is required");
      setConfirmPasswordError("This Field is required");
      setLoader(false);
    }
    if (oldPassword === "") {
      setOldPasswordError("This Field is Required");
      setLoader(false);
      return;
    } else {
      setOldPasswordError("");
    }

    if (newPassword === "") {
      setNewPasswordError("This Field is Required");
      setLoader(false);
      return;
    } else if (newPassword.length < 8) {
      setNewPasswordError("Must be atleast 8 Characters");
      setLoader(false);
      return;
    } else {
      setNewPasswordError("");
    }

    if (confirmPassword === "") {
      setConfirmPasswordError("This Field is Required");
      setLoader(false);
      return;
    } else if (confirmPassword.length < 8) {
      setConfirmPasswordError("Must be atleast 8 Characters");
      setLoader(false);
      return;
    } else if (confirmPassword !== newPassword) {
      setConfirmPasswordError("Both passwords must match");
      setLoader(false);
      return;
    } else {
      setConfirmPasswordError("");
    }

    if (oldPassword !== "" && newPassword !== "" && confirmPassword !== "") {
      reauthenticate(oldPassword)
        .then(() => {
          var user = firebase.auth().currentUser;
          user
            .updatePassword(newPassword)
            .then(() => {
              // alert("Password Updated Successfully");
              setMessage("Password Updated Successfully");
              setIsVisible(!isVisible);
              setOldPassword("");
              setNewPassword("");
              setLoader(false);
              props.navigation.navigate("NewsFeed");
            })
            .catch((error) => {
              setLoader(false);
              // alert(error.message);
              setMessage(error.message);
              setIsVisible(!isVisible);
            });
        })
        .catch((error) => {
          setLoader(false);
          // alert("The current password is invalid");
          setMessage("The current password is invalid");
          setIsVisible(!isVisible);
          setLoader(false);
        });
    } else {
      setOldPasswordError("This Field is required");
      setNewPasswordError("This Field is required");
      setConfirmPasswordError("This Field is required");
      setLoader(false);
    }
  }

  return (
    <ScrollView style={styles.root} keyboardShouldPersistTaps="handled">
      <View style={styles.contentArea}>
        
        <TouchableOpacity
          style={[styles.backContainer, { width: "100%" }]}
          onPress={() => props.navigation.navigate("Settings")}
        >
          <Ionicons name="chevron-back-outline" size={30} />
          {/* <Text style={{ marginLeft: 10,alignSelf:'center' }}>Back</Text> */}
        </TouchableOpacity>

        {isVisible ? (
            <View style={{ height: 60 }}>
              <Snackbar
                style={{
                  backgroundColor: "#FFF4E3",
                  marginLeft: 8,
                  marginRight: 8,
                  marginTop: 8,
                  borderRadius: 30,
                }}
                visible={isVisible}
                // action={{ label: "ok" }}
                onDismiss={() => setIsVisible(!isVisible)}
                duration={messge.length + 2000}
              >
                <View style={{flexDirection:'row',alignItems:'center',height:'auto'}}>
                <AntDesign name="checkcircle" size={24} color="#FCB040" />
                  <Text  style={{color:'black',alignSelf:'center',left:8,fontSize:14,fontWeight:'600',color:'grey',width:300}}>{messge}</Text>
                </View>
              </Snackbar>
            </View>
          ) : (
            <></>
        )}

        <View style={styles.textContainer}>
          <Text style={styles.textHeading}>Create New Password</Text>
          <Text style={styles.textsubHeading}>
            Your new password must be different from previous passwords.
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Current Password</Text>
            <TouchableOpacity
              style={styles.eyeIconContainer}
              onPress={oldPasswordVisibility}
            >
              <Ionicons
                name={oldpasswordHidden ? "eye" : "eye-off"}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
            <TextInput
              style={[styles.emailInput, { marginTop: 5 }]}
              value={oldPassword}
              onChangeText={(e) => setOldPassword(e)}
              secureTextEntry={oldpasswordHidden}
            />
            <Text style={styles.errorMsg}>{oldpasswordError}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>New Password</Text>
            <TouchableOpacity
              style={styles.eyeIconContainer}
              onPress={newPasswordVisibility}
            >
              <Ionicons
                name={newpasswordHidden ? "eye" : "eye-off"}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
            <TextInput
              style={[styles.emailInput, { marginTop: 5 }]}
              value={newPassword}
              onChangeText={(e) => setNewPassword(e)}
              secureTextEntry={newpasswordHidden}
            />
            <Text
              style={{ paddingHorizontal: 2, fontSize: 13, color: "#464646" }}
            >
              Must be at least 8 Characters
            </Text>
            <Text style={styles.errorMsg}>{newpasswordError}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Confirm New Password</Text>
            <TouchableOpacity
              style={styles.eyeIconContainer}
              onPress={confirmPasswordVisibility}
            >
              <Ionicons
                name={confirmpasswordHidden ? "eye" : "eye-off"}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
            <TextInput
              style={[styles.emailInput, { marginTop: 5 }]}
              value={confirmPassword}
              onChangeText={(e) => setConfirmPassword(e)}
              secureTextEntry={confirmpasswordHidden}
            />
            {/* <Text
              style={{ paddingHorizontal: 17, fontSize: 13, color: "#464646" }}
            >
              Both passwords must match
            </Text> */}
            <Text style={styles.errorMsg}>{confirmpasswordError}</Text>
          </View>

          {/* <View>
                        <TouchableOpacity style={styles.eyeIconContainer} onPress={ newPasswordVisibility } >
                            <Ionicons name={newpasswordHidden ? 'eye' : 'eye-off' } style={styles.eyeIcon}  />
                        </TouchableOpacity>
                        <TextInput style={[styles.emailInput,{marginTop:10}]} placeholder="New Password" value={newPassword} onChangeText={(e)=>setNewPassword(e)} secureTextEntry={newpasswordHidden}  />
                    </View> */}

          <TouchableOpacity
            style={styles.btn2}
            onPress={() => userResetPassword()}
          >
            {loader ? (
              <ActivityIndicator color={"red"} size={"small"} />
            ) : (
              <Text style={styles.btn2Text}>Reset Password</Text>
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
    marginTop: "10%",
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
    // marginTop: 30,
    // alignItems:'center'
  },
  textHeading: {
    fontSize: 17,
    fontWeight: "500",
    color: "#464646",
  },
  textsubHeading: {
    marginTop: 8,
    color: "#464646",
    fontSize: 15,
    width: "80%",
  },
  buttonsContainer: {
    marginTop: 20,
  },
  emailInput: {
    borderRadius:25,
    backgroundColor: "#FBFBFB",
    // borderRadius: 50,
    padding: 13,
    // paddingHorizontal: 20,
    // paddingVertical: 9,
    fontSize: 13,
    textAlign: "left",
    // width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },

  btn2: {
    marginTop: 40,
    backgroundColor: "#FAB040",
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
    width: "95%",
    alignSelf: "center",
  },
  btn2Text: {
    color: "white",
  },
  eyeIcon: {
    fontSize: 24,
    color: "#E6E6E6",
  },

  eyeIconContainer: {
    position: "absolute",
    top: 37,
    right: 23,
    width: 35,
    height: 25,
    alignItems: "center",
    zIndex: 1,
  },
  backContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    alignContent: "center",
    marginTop: 30,
  },
  fieldContainer: {
    paddingHorizontal: 10,
  },
  label: {
    // paddingHorizontal: 17,
    fontSize: 13,
    color: "#464646",
    // fontWeight: "bold",
  },
  errorMsg: {
    paddingHorizontal: 17,
    fontSize: 10,
    color: "red",
    marginBottom: 10,
  },
});

export default ResetPassword;
