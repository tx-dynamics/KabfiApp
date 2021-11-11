import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  AsyncStorage,
  ImageBackground,
  Image,
  Dimensions,
  TouchableNativeFeedback,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  SimpleLineIcons,
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import firebase from "firebase";
import { ProgressBar, Colors, Snackbar } from "react-native-paper";
import { connect } from "react-redux";
import { SetSession } from "../../Redux/Actions/Actions";

function PhoneAuth (props) {
  const ref = useRef();
  const [pin, setPin] = useState("");
  // const [otp, setotp] = useState("");
 
  // const [number, setNumber] = useState(props.route.params.number);
  const [number, setNumber] = useState('');
  const [loader, setLoader] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messge, setMessage] = useState("");
  const route = props.route.params;

  async function CheckValidtions() {
    console.log("called");
    if (
      pin == "" 
    ) {
      setMessage("Please Provide Valid Pin");
      setIsVisible(!isVisible);
      // alert("Please Provide Valid Pin");
    } else {
      // var pin = pin1 + pin2 + pin3 + pin4 + pin5 + pin6;
      // console.log('otp', route)
      console.log("pin", pin);
      var otp = route.otp;
      // var number = route.number;
      var firstName = route.firstName;
      var lastName = route.lastName;
      var email = route.email;
      var password = route.password;
      var mobileNo = route.mobileNo;
      var badgeNumberImage = route.badgeNumberImage;
      var taxiLicenseImage = route.taxiLicenseImage;
      // setNumber(number)

      try {
        const credential = firebase.auth.PhoneAuthProvider.credential(otp, pin);
        // await firebase.auth().signInWithCredential(credential);
        // alert("Phone authentication successful 👍");
        setMessage("Phone authentication successful 👍");
        setIsVisible(!isVisible);
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
              badgeNumberImage: badgeNumberImage,
              taxiLicenseImage: taxiLicenseImage,
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
                setTimeout(() => {
                  props.navigation.navigate("Verify");
                }, 1500);
              });
          });
      } catch (err) {
        setMessage("error : " + err);
        setIsVisible(!isVisible); 
        // alert("error : " + err);
      }
     
    }
  }

  async function changeNumber (){
    console.log('changing')
     await AsyncStorage.setItem('number',"")
    props.navigation.navigate("Signup",{number:true})
  }

  return (
    <View style={styles.root}>
      <StatusBar style="#F9F9F9" />
      {/* <View style={styles.contentArea}> */}

      <View
        style={{
          flex: 0.6,
          flexDirection: "row",
          backgroundColor: "#F9F9F9",
          borderColor: "#a9a9a9",
          borderBottomWidth: 1,
          alignItems: "center",
        }}
      >
        <View style={{ flex: 0.3, marginTop: 15 }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Entypo name="chevron-small-left" size={40} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.7, marginTop: 15 }}>
          <Text style={{ fontSize: 18, color: "#000", fontWeight: "bold" }}>
            Enter Verification Code
          </Text>
        </View>
      </View>
      <View style={{ flex: 4.8 }}>
        {isVisible ? (
            <View style={{ height: 60,flex:0.2,top:20 }}>
              <Snackbar
                style={{
                  backgroundColor: "#FFF1DB",
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
          }}
        >

      <SmoothPinCodeInput
      codeLength={6}
      onFulfill={CheckValidtions}
        cellStyle={{
          borderBottomWidth: 2,
          borderColor: 'gray',
        }}
        cellStyleFocused={{
          borderColor: '#FF9900',
        }}
        value={pin}
        onTextChange={code => setPin(code)}
        />


        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 60,
          }}
        >
          <Text>Your confirmation code has been sent by SMS to this</Text>
          {/* <Text>Number: {number}</Text> */}
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 40,
          }}
        >
          <Text>Not your current number?</Text>
          <TouchableOpacity onPress={()=>changeNumber()}>
            <Text style={{ color: "#FF9900" }}> Change</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 40,
          }}
        >
          <Text>Your Confirmation SMS should be delivered soon.</Text>
        </View>

        <View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => CheckValidtions()}
          >
            {loader ? (
              <ActivityIndicator color={"red"} size={"small"} />
            ) : (
              // <Text style={{ color: "white" }}>RECIEVE CODE VIA PHONE CALL</Text>
              <Text style={{ color: "white" }}>VERIFY</Text>
            )}
          </TouchableOpacity>
        </View>

     
      </View>
    </View>
    // </View >
  );
}

const styles = StyleSheet.create({
  input: {
    marginLeft: 15,
    fontSize: 14,
    color: "black",
    alignSelf: "center",
  },
  root: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    //   alignItems: "center",
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
    paddingHorizontal: 20,
    marginTop: 80,
    backgroundColor: "#FAB040",
    alignItems: "center",
    padding: 15,
    margin: 20,
    borderRadius: 8,
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
    justifyContent: "center",
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
    SessionMaintain: () => dispatch(SetSession()),
  };
};
  export default connect(null, mapDispatchToProps) (PhoneAuth);
