import firebase from "firebase";
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
import { FirebaseRecaptchaVerifierModal,FirebaseRecaptcha,FirebaseRecaptchaBanner } from "expo-firebase-recaptcha";
// firebase.storage().ref();
import { ProgressBar, Colors, Snackbar } from "react-native-paper";
import * as Permissions from "expo-permissions";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
// import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  AsyncStorage,
  KeyboardAvoidingView
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import styles from "./styles";
import {
  galleryImage,
  tickImage,
  checkImage,
  exclamation_mark,
  logoName,
} from "../../../../assets";
// import { useLogin } from "../../../context/LoginProvider";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { connect } from "react-redux";
import { SetSession } from "../../../Redux/Actions/Actions";
const Signup = (props) => {
  

  const getPermission = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    const { granted1 } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    setGrandted(granted);
    setGrandted1(granted1);
  };
  const [isInit, setisInit] = useState(false)
  const [granted, setGrandted] = useState("");
  const [granted1, setGrandted1] = useState("");
  const [firstName, setFirstName] = useState("");
  const [fNameValidator, setfNameValidator] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lNameValidator, setlNameValidator] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValidator, setEmailValidator] = useState(false);
  const [mobileNo, setMobileNo] = useState("");
  const [mobileNoValidator, setmobileNoValidator] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordValidator, setpasswordValidator] = useState(false);
  // const { setIsLoggedIn } = useLogin();
  const [badgeNumberImage, setBadgeNumberImage] = useState(null);
  const [badgeNumberImageValidator, setbadgeNumberImageValidator] =
    useState(false);
  const [authcheck, setAuthCheck] = useState(false);
  const [taxiLicenseImage, setTaxiLicenseImage] = useState(null);
  const [taxiLicenseValidator, settaxiLicenseValidator] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [loader, setLoader] = useState(false);
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;
  const recaptchaVerifier = React.useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [messge, setMessage] = useState("");

  useEffect( () => {
    setTimeout(function () {
      setisInit(true)
    }, 2000)
    // props.navigation.addListener("focus", () => {
    //   if(props.route.params.number === undefined ){

    //   }else{
    //     getUser()

    //   }
    // })
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual

    getPermission();
  }, []);

  async function getUser(){
    let number = props.route.params.number
    console.log(number);

    if(number === undefined){
      console.log(number);
    }else{
      setMobileNo("")
    }

  }

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
      if (granted || granted1) {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          aspect: [4, 3],
          quality: 0,
        });
      } else {
        setMessage("Camera permission Denied");
        setIsVisible(!isVisible);
        // alert("Camera permission Denied");
      }
    } else if (val === 2) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 0,
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
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 0,
      });
    } else if (val === 2) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 0.5,
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

    // await AsyncStorage.setItem('fname',firstName)
    // await AsyncStorage.setItem('lname',lastName)
    // await AsyncStorage.setItem('number',JSON.stringify(mobileNo) )
    // await AsyncStorage.setItem('email',email)
    // await AsyncStorage.setItem('taxiLicenseImage',JSON.stringify(taxiLicenseImage))
    // await AsyncStorage.setItem('password',password)

    let success = true;
    setLoader(true);
    setfNameValidator(false);
    setlNameValidator(false);
    setmobileNoValidator(false);
    setEmailValidator(false);
    setpasswordValidator(false);
    setbadgeNumberImageValidator(false);
    settaxiLicenseValidator(false);
    if (
      firstName !== "" &&
      lastName !== "" &&
      mobileNo !== "" &&
      email !== "" &&
      password !== "" &&
      badgeNumberImage !== null &&
      taxiLicenseImage !== null
    ) {
      if (mobileNo.length < 10) {
        setMessage("Phone number should be 11 digit only .");
        setIsVisible(!isVisible);
        // alert("Phone number should be 11 digit only .");
        setLoader(false);
        setmobileNoValidator(true);
        return false;
      }
      if (password.length < 8) {
        setMessage("Password must be at least 8 characters");
        setIsVisible(!isVisible);
        // alert("Password must be at least 8 characters");
        setpasswordValidator(true);
        setLoader(false);
        return false;
      }
      const badgeImage = await uploadImage(badgeNumberImage.uri);
      const taxiLicense = await uploadImage(taxiLicenseImage.uri);

      try{
      await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (user) => {
        const uuid = user.user?.uid;
        let Details = {
          id: uuid,
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobileNo: mobileNo,
          badgeNumberImage: badgeImage,
          taxiLicenseImage: taxiLicense,
          rating: 5,
          Dp: "",
          city: "",
          country: "",
          createdAt: new Date().toISOString(),
        };
        firebase.auth().signOut();

        await firebase
          .database()
          .ref("users/")
          .child(uuid)
          .set(Details)
          .then(() => {
            setMessage("User Registration is Successful.");
            setIsVisible(!isVisible);
            setTimeout(() => {
              props.navigation.navigate("Verify");
            }, 2000);
          });
      });
  } catch (err) {
    setMessage("error : " + err);
    setIsVisible(!isVisible); 
  }
  setLoader(false);

      // firebase.auth().settings.appVerificationDisabledForTesting = true
      // console.log("recaptcha : " +recaptchaVerifier.current)
      // setTimeout(async() => {
        
      // const phoneProvider = new firebase.auth.PhoneAuthProvider();
      // const verificationId = await phoneProvider.verifyPhoneNumber(
      //   "+44" + mobileNo,
      //   recaptchaVerifier.current
      // );
      // console.log(verificationId);
      // if (verificationId) {
        // props.SessionMaintain({ "isLogin": true })
        // setIsLoggedIn(false);
        // setFirstName("");
        // setLastName("");
        // setMobileNo("");
        // setEmail("");
        // setPassword("");
        // setTaxiLicenseImage("");
        // setBadgeNumberImage("");
        // setLoader(false);
        // var otp = Math.floor(100000 + Math.random() * 900000);
        // var number = "+44" + mobileNo;
        // props.navigation.navigate("PhoneAuth", {
        //   otp: verificationId,
        //   number: number,
        //   // detail: Details,
        //   // uid: uuid,
        //   firstName: firstName,
        //   lastName: lastName,
        //   email: email,
        //   password: password,
        //   mobileNo: mobileNo,
        //   badgeNumberImage: badgeImage,
        //   taxiLicenseImage: taxiLicense,
        // });
    //   }
    // }, 4000);

      // firebase.auth().signOut();
      // props.navigation.navigate("Verify");
      // const uid = user.user.uid;
      // setIsLoggedIn(false);

      // console.log(Details);
      // firebase
      //   .database()
      //   .ref("users/" + uid)
      //   .set(Details)
      //   .then(() => {
      //     setIsLoggedIn(false);
      //     alert(
      //       "Thank you for your registration! Your account is now ready to use."
      //     );
      //   });
      // firebase.auth().signOut();
      // await saveData("users", user.user.uid, Details);
      // })
      // .catch(function (error) {
      //   setLoader(false);
      //   success = false;
      //   alert(error.message);
      // });
    } else {
      setLoader(false);
      if (
        firstName === "" &&
        lastName === "" &&
        mobileNo === "" &&
        email === "" &&
        password === "" &&
        badgeNumberImage === "" &&
        taxiLicenseImage === ""
      ) {
        setfNameValidator(true);
        setlNameValidator(true);
        setmobileNoValidator(true);
        setEmailValidator(true);
        setpasswordValidator(true);
        setbadgeNumberImageValidator(true);
        settaxiLicenseValidator(true);
      }
      if (firstName === "") {
        setfNameValidator(true);
      }
      if (lastName === "") {
        setlNameValidator(true);
      }
      if (mobileNo === "" || mobileNo.length < 10) {
        setmobileNoValidator(true);
      }
      if (email === "") {
        setEmailValidator(true);
      }
      if (badgeNumberImage === null) {
        setbadgeNumberImageValidator(true);
      }
      if (taxiLicenseImage === null) {
        settaxiLicenseValidator(true);
      }
      if (password === "") {
        setpasswordValidator(true);
      }
      // alert("All Fields are required");
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
          () => {},
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
    const dbh = firebase.database().ref("users" + "/" + doc);
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

  const attemptInvisibleVerification = true;

  return (
    <ScrollView style={styles.root}>
      <KeyboardAvoidingView>
      <View style={styles.contentArea}>
        <View style={styles.logoContainer}>
          
          <Image
            source={require("../../../../assets/Kabfi-logo.png")}
            resizeMode="contain"
            style={{
              height: 50,
              width: 136,
              //backgroundColor: "tomato",
              alignSelf: "center",
            }}
          />
          <Text
            style={[
              styles.createAccountText,
              { marginTop: responsiveHeight(2) },
            ]}
          >
            CREATE AN ACCOUNT
          </Text>
        </View>
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
        {isInit && (
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
          // attemptInvisibleVerification={attemptInvisibleVerification}
          // appVerificationDisabledForTesting={__DEV__}
        />
      )}
        <View style={styles.form}>
          <View style={styles.formField}>
            <Text style={[styles.label, { fontWeight: "bold" }]}>Name</Text>
            <View style={styles.textFieldHalfContainer}>
              <View
                style={[
                  styles.textFieldHalf,
                  { borderColor: fNameValidator ? "red" : "#E6E6E6" },
                ]}
              >
                <TextInput
                  style={styles.textFieldHalf1}
                  value={firstName}
                  onChangeText={(e) => setFirstName(e)}
                  placeholder="First Name"
                />
                <Image
                  source={firstName.length >= 2 ? tickImage : null}
                  style={styles.checkImageIcon}
                />
              </View>
              <View
                style={[
                  styles.textFieldHalf,
                  { borderColor: lNameValidator ? "red" : "#E6E6E6" },
                ]}
              >
                <TextInput
                  style={styles.textFieldHalf1}
                  value={lastName}
                  onChangeText={(e) => setLastName(e)}
                  placeholder="Last Name"
                />
                <Image
                  source={lastName.length >= 2 ? tickImage : null}
                  style={styles.checkImageIcon}
                />
              </View>
            </View>
          </View>

          <View style={[styles.formField, {}]}>
            <Text style={[styles.label, { fontWeight: "bold" }]}>Mobile</Text>

            <View
              style={[
                styles.textFieldFullContainer,
                { borderColor: mobileNoValidator ? "red" : "#E6E6E6" },
              ]}
            >
              <Text style={styles.countryCode}>+44</Text>
              {/* <Text style={styles.countryCode}>+92</Text> */}
              <TextInput
                style={[styles.textFieldFull, { paddingHorizontal: 20 }]}
                value={mobileNo}
                onChangeText={(e) => setMobileNo(e.replace(/[^0-9]/g, ""))}
                keyboardType="number-pad"
                placeholder="7711111111"
                maxLength={10}
              />
              <Image
                source={mobileNo.length > 9 ? tickImage : null}
                style={[styles.checkImageIcon, { marginRight: 15 }]}
              />
            </View>
          </View>

          <View style={styles.formField}>
            <Text style={[styles.label, { fontWeight: "bold" }]}>E-mail</Text>
            <View
              style={[
                styles.textFieldFullContainer,
                { borderColor: emailValidator ? "red" : "#E6E6E6" },
              ]}
            >
              <TextInput
                style={styles.textFieldFull}
                value={email}
                onChangeText={(e) => setEmail(e.trim())}
                placeholder="name@example.com"
              />
              <Image
                source={
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                    ? tickImage
                    : null
                }
                style={[styles.checkImageIcon, { marginRight: 15 }]}
              />
            </View>
          </View>

          <View style={[styles.formField, { width: "100%" }]}>
            <View style={[styles.textFieldHalfContainer, { width: "100%" }]}>
              <TouchableOpacity
                onPress={AlertTaxiLicenseImage}
                style={styles.uploadImageFieldsContainer}
              >
                <Text
                  style={[styles.uploadImageFieldLabel, { fontWeight: "bold" }]}
                >
                  Badge Number
                </Text>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderWidth: 1,
                    borderRadius:25,
                    borderColor: badgeNumberImageValidator ? "red" : "#E6E6E6",
                    width: "100%",
                  }}
                  onPress={AlertBadgeNumberImage}
                >
                  <View style={styles.uploadImageFields}>
                    <Text
                      style={{
                        textAlign: "center",
                        marginLeft: responsiveHeight(1),
                        opacity: 0.3,
                      }}
                    >
                      {" "}
                      {!badgeNumberImage
                        ? "Upload Image"
                        : "Image is uploaded"}{" "}
                    </Text>
                  </View>
                  <Image
                    source={!badgeNumberImage ? galleryImage : tickImage}
                    style={styles.uploadIMageIcon}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={AlertTaxiLicenseImage}
                style={styles.uploadImageFieldsContainer}
              >
                <Text
                  style={[styles.uploadImageFieldLabel, { fontWeight: "bold" }]}
                >
                  Taxi License
                </Text>

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderWidth: 1,
                    borderRadius:25,
                    borderColor: taxiLicenseValidator ? "red" : "#E6E6E6",
                  }}
                  onPress={AlertTaxiLicenseImage}
                >
                  <View style={styles.uploadImageFields}>
                    <Text
                      style={{
                        textAlign: "center",
                        marginLeft: responsiveHeight(1),
                        opacity: 0.3,
                      }}
                    >
                      {" "}
                      {!taxiLicenseImage
                        ? "Upload Image"
                        : "Image is uploaded"}{" "}
                    </Text>
                  </View>

                  <Image
                    source={!taxiLicenseImage ? galleryImage : tickImage}
                    style={styles.uploadIMageIcon}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formField}>
            <Text style={[styles.label, { fontWeight: "bold" }]}>Password</Text>
            <View
              style={[
                styles.textFieldFullContainer,
                { borderColor: passwordValidator ? "red" : "#E6E6E6" },
              ]}
            >
              {/* start */}

              <TextInput
                style={styles.textFieldFull}
                value={password}
                onChangeText={(e) => setPassword(e)}
                secureTextEntry={passwordHidden}
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
                {"\n "}
                Terms and Conditions{" "}
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
              // onPress={() => props.navigation.navigate('PhoneAuth')}
            >
              {loader ? (
                <ActivityIndicator color={"red"} size={"small"} />
              ) : (
                <Text style={{ color: "white" }}>SUBMIT</Text>
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
          
        {/* {attemptInvisibleVerification?
         <FirebaseRecaptchaBanner />
        :
        <></>} */}

        </View>
      </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    SessionMaintain: (data) => dispatch(SetSession(data)),
  };
};

export default connect(null, mapDispatchToProps)(Signup);
