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
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";
import { returnImage } from "../../../assets";

const ResetPassword = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);

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
    // setLoader(true);

    // if(oldPassword === '' && newPassword === '' && confirmPassword === '' ){
    //     setOldPasswordError('This Field is required');
    //     setNewPasswordError('This Field is required');
    //     setConfirmPasswordError('This Field is required');
    // }
    // if (oldPassword === "") {
    //   setOldPasswordError("This Field is Required");
    //   return;
    // } else if (oldPassword.length < 8) {
    //   setOldPasswordError("Must be atleast 8 Characters");
    //   return;
    // } else {
    //   setOldPasswordError("");
    // }

    // if (newPassword === "") {
    //   setNewPasswordError("This Field is Required");
    //   return;
    // } else if (newPassword.length < 8) {
    //   setNewPasswordError("Must be atleast 8 Characters");
    //   return;
    // } else {
    //   setNewPasswordError("");
    // }

    // if (confirmPassword === "") {
    //   setConfirmPasswordError("This Field is Required");
    //   return;
    // } else if (confirmPassword.length < 8) {
    //   setConfirmPasswordError("Must be atleast 8 Characters");
    //   return;
    // } else if (confirmPassword !== newPassword) {
    //   setConfirmPasswordError("Both passwords must match");
    //   return;
    // } else {
    //   setConfirmPasswordError("");
    // }

    reauthenticate(oldPassword)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(newPassword)
          .then(() => {
            alert("Password Updated Successfully");
            setOldPassword("");
            setNewPassword("");
            setLoader(false);
            props.navigation.navigate("NewsFeed");
          })
          .catch((error) => {
            setLoader(false);
            alert(error.message);
          });
      })
      .catch((error) => {
        setLoader(false);
        alert(error.message);
        // setLoader(false);
      });

    // if(oldPassword !== '' && newPassword !== '' && confirmPassword !== ''){

    // }
    // else{
    //     setOldPasswordError('This Field is required');
    //     setNewPasswordError('This Field is required');
    //     setConfirmPasswordError('This Field is required');
    // }
  }

  return (
    <ScrollView style={styles.root}>
      <View style={styles.contentArea}>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => props.navigation.navigate("Settings")}
        >
          <Image source={returnImage} />
          <Text style={{ marginLeft: 20 }}>Back</Text>
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.textHeading}>Create New Password</Text>
          <Text style={styles.textsubHeading}>
            Your new password must be different from previous used passwords.
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
            <Text style={styles.errorMsg}>{newpasswordError}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Confirm Password</Text>
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
    marginTop: 30,
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
    backgroundColor: "#FBFBFB",
    borderRadius: 50,
    padding: 13,
  },

  btn2: {
    marginTop: 40,
    backgroundColor: "#FAB040",
    borderRadius: 5,
    padding: 13,
    alignItems: "center",
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
  },
  fieldContainer: {
    paddingHorizontal: 10,
  },
  label: {
    paddingHorizontal: 17,
    fontSize: 13,
    color: "#464646",
  },
  errorMsg: {
    paddingHorizontal: 17,
    fontSize: 10,
    color: "#464646",
    marginBottom: 10,
  },
});

export default ResetPassword;
