import * as firebase from "firebase";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyASonZ6DlS2cqTonbPSiq8RboZFv4bYKDE",
    authDomain: "kabfiapp.firebaseapp.com",
    databaseURL: "https://kabfiapp-default-rtdb.firebaseio.com",
    projectId: "kabfiapp",
    storageBucket: "kabfiapp.appspot.com",
    messagingSenderId: "676638158064",
    appId: "1:676638158064:web:e01ff8bc3a12a378eee635",
  });
}
// firebase.storage().ref();
// import firebase from "firebase";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import styles from "./styles";
import {
  galleryImage,
  tickImage,
  checkImage,
  exclamation_mark,
} from "../../../../assets";

const Signup = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");

  const [badgeNumberImage, setBadgeNumberImage] = useState(null);
  const [authcheck, setAuthCheck] = useState(false);
  const [taxiLicenseImage, setTaxiLicenseImage] = useState(null);
  const [passwordHidden, setPasswordHidden] = useState(true);

  const [loader, setLoader] = useState(false);

  function AlertBadgeNumberImage() {
    Alert.alert(
      "Choose from the options",
      "",
      [
        {
          text: "Open Camera",
          onPress: () => pickBadgeNumberImage(1),
        },
        {
          text: "Open Gallery",
          onPress: () => pickBadgeNumberImage(2),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  }

  function AlertTaxiLicenseImage() {
    Alert.alert(
      "Choose from the options",
      "",
      [
        {
          text: "Open Camera",
          onPress: () => pickTaxiLicenseImage(1),
        },
        {
          text: "Open Gallery",
          onPress: () => pickTaxiLicenseImage(2),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  }

  const pickBadgeNumberImage = async (val) => {
    let result = "";
    if (val === 1) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      });
    } else if (val === 2) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.cancelled) {
      // console.log(result);
      setBadgeNumberImage(result);
      // alert("Badge Number Selected");
    }
  };

  const pickTaxiLicenseImage = async (val) => {
    let result = "";
    if (val === 1) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      });
    } else if (val === 2) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.cancelled) {
      setTaxiLicenseImage(result);
      // alert("Taxi License Selected");
    }
  };

  function passwordVisibility() {
    passwordHidden === true
      ? setPasswordHidden(false)
      : setPasswordHidden(true);
  }

  async function userSignup() {
    let success = true;

    if (
      firstName !== "" &&
      lastName !== "" &&
      mobileNo !== "" &&
      email !== "" &&
      password !== "" &&
      badgeNumberImage !== "" &&
      taxiLicenseImage !== ""
    ) {
      if (!/^[0-9]+$/.test(mobileNo)) {
        alert("Phone number should be numeric only.");
        return false;
      }
      if (password.length < 8) {
        alert("Password Must be atleast 8 characters");
        return false;
      }

      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (user) => {
          setLoader(true);
          const badgeImage = await uploadImage(badgeNumberImage.uri);
          const taxiLicense = await uploadImage(taxiLicenseImage.uri);
          let Details = {
            id: user.user.uid,
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobileNo: mobileNo,
            badgeNumberImage: badgeImage,
            taxiLicenseImage: taxiLicense,
            rating: 0,
            Dp: "",
            city: "",
            country: "",
          };
          // console.log(Details);
          await saveData("users", user.user.uid, Details);
          alert(
            "Thank you for your registration! Your account is now ready to use."
          );
          setFirstName("");
          setLastName("");
          setMobileNo("");
          setEmail("");
          setPassword("");
          setTaxiLicenseImage("");
          setBadgeNumberImage("");
          setLoader(false);
          props.navigation.navigate("Signin");
        })
        .catch(function (error) {
          success = false;
          alert(error.code + ":: " + error.message);
        });
    } else {
      alert("All Fields are required");
    }

    return success;
  }

  const uploadImage = async (uri) => {
    try {
      // setLoader(true);
      const response = await fetch(uri);
      const blob = await response.blob();
      var timestamp = new Date().getTime();
      var ref = firebase.storage().ref().child(`images/${timestamp}`);
      const task = ref.put(blob);

      return new Promise((resolve, reject) => {
        task.on(
          "state_changed",
          () => { },
          (err) => {
            reject(err);
          },
          async () => {
            const url = await task.snapshot.ref.getDownloadURL();
            resolve(url);
            // setLoader(false);
          }
        );
      });
    } catch (err) {
      console.log("uploadImage error: " + err.message);
    }
  };

  async function saveData(collection, doc, jsonObject) {
    const dbh = firebase.database().ref(collection + "/" + doc);
    await dbh
      .set(jsonObject)
      .then(function () {
        console.log("Document successfully written!");
        return true;
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
        return false;
      });
  }

  return (
    <ScrollView style={styles.root}>
      <View style={styles.contentArea}>
        <View style={styles.logoContainer}>
          <Text style={styles.createAccountText}>CREATE AN ACCOUNT</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.formField}>
            <Text style={styles.label}>Name</Text>
            <View style={styles.textFieldHalfContainer}>
              <View style={styles.textFieldHalf}>
                <TextInput
                  style={styles.textFieldHalf1}
                  value={firstName}
                  onChangeText={(e) => setFirstName(e)}
                  placeholder="First Name"
                  
                />
                <Image
                  source={firstName.length>2 ? checkImage:null}
                  style={styles.checkImageIcon}
                />
              </View>
              <View style={styles.textFieldHalf}>
                <TextInput
                  style={styles.textFieldHalf1}
                  value={lastName}
                  onChangeText={(e) => setLastName(e)}
                  placeholder="Last Name"
                />
                <Image
                  source={lastName.length>2 ? checkImage:null}
                  style={styles.checkImageIcon}
                />
              </View>
            </View>
          </View>

          <View style={[styles.formField,{
            
          }]}>
            <Text style={styles.label}>Mobile</Text>
            <Text style={styles.countryCode}>+77</Text>
            <View style={styles.textFieldFullContainer}>
              <TextInput
                style={[styles.textFieldFull, { paddingHorizontal: 55 }]}
                value={mobileNo}
                onChangeText={(e) => setMobileNo(e.replace(/[^0-9]/g, ""))}
                keyboardType="number-pad"
                placeholder="11111111"
                maxLength={10}
              />
             <Image
                source={mobileNo.length>9 ? checkImage:null}
                style={[styles.checkImageIcon,{marginRight:15}]}
              />
            </View>
            
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>E-mail</Text>
            <View style={styles.textFieldFullContainer}>
              <TextInput
                style={styles.textFieldFull}
                value={email}
                onChangeText={(e) => setEmail(e)}
                placeholder="name@example.com"
              />
                <Image
                source={
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)?
                   checkImage:null}
                style={[styles.checkImageIcon,{marginRight:15}]}
              />
            </View>
          </View>

          <View style={styles.formField}>
            <View style={styles.textFieldHalfContainer}>
              <View style={styles.uploadImageFieldsContainer}>
                <Text style={styles.uploadImageFieldLabel}>Badge Number</Text>
                <Image
                  source={!badgeNumberImage ? galleryImage : tickImage}
                  style={styles.uploadIMageIcon}
                />

                <TouchableOpacity onPress={AlertBadgeNumberImage}>
                  <TextInput
                    style={styles.uploadImageFields}
                    placeholder="Upload Image"
                    editable={false}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.uploadImageFieldsContainer}>
                <Text style={styles.uploadImageFieldLabel}>Taxi License</Text>

                <Image
                  source={!taxiLicenseImage ? galleryImage : tickImage}
                  style={styles.uploadIMageIcon}
                />
                <TouchableOpacity onPress={AlertTaxiLicenseImage}>
                  <TextInput
                    style={styles.uploadImageFields}
                    placeholder="Upload Image"
                    editable={false}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.textFieldFullContainer}>
              {/* start */}

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
                style={styles.textFieldFull}
                value={password}
                onChangeText={(e) => setPassword(e)}
                secureTextEntry={passwordHidden}
              />

              {/* end */}
            </View>
          </View>

          <View style={{ paddingHorizontal: 20, marginTop: 40 }}>
            <Text style={{ textAlign: "center", fontSize: 12 }}>
              By clicking submit below you are agreeing to the Kabfi
              <Text
                style={styles.submitText}
                onPress={() => props.navigation.navigate("TermsAndConditions")}
              >
                {" "}
                Terms and conditions{" "}
              </Text>
              and
              <Text
                style={styles.submitText}
                onPress={() => props.navigation.navigate("PrivacyPolicy")}
              >
                {" "}
                Privacy Policy
              </Text>
            </Text>
          </View>

          <View>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => userSignup()}
            >
              {loader ? (
                <ActivityIndicator color={"red"} size={"small"} />
              ) : (
                <Text style={{ color: "white" }}>SIGN UP</Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{ alignItems: "center", marginTop: 10 }}
            onPress={() => props.navigation.navigate("Signin")}
          >
            <Text style={{ fontSize: 12, marginBottom: 20 }}>
              Already have an account?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;
