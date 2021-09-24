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
import firebase from "firebase";

function PhoneAuth(props) {
  const ref = useRef();
  const [pin1, setP1] = useState("");
  const [pin2, setP2] = useState("");
  const [pin3, setP3] = useState("");
  const [pin4, setP4] = useState("");
  const [pin5, setP5] = useState("");
  const [pin6, setP6] = useState("");
  const [number, setNumber] = useState(props.route.params.number);
  const [loader, setLoader] = useState(false);
  const route = props.route.params;

  async function CheckValidtions() {
    console.log("called");
    if (
      pin1 == "" ||
      pin2 == "" ||
      pin3 == "" ||
      pin4 == "" ||
      pin5 == "" ||
      pin6 == ""
    ) {
      alert("Please Provide Valid Pin");
    } else {
      var pin = pin1 + pin2 + pin3 + pin4 + pin5 + pin6;
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
        alert("Phone authentication successful 👍");

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
                props.navigation.navigate("Verify");
              });
          });
      } catch (err) {
        alert("error : " + err);
      }
      // if (pin == route.otp) {
      //     console.log("same")

      //     // this.signup_request()
      //     // this.props.navigation.navigate('Signup', { 'phone': this.props.route.params.phone })
      // }
      // else {
      //     console.log('ghalt pin entered')
      // }
    }
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
          <TouchableOpacity onPress={() => props.navigation.getBack()}>
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              width: "12%",
              height: 40,
              borderRadius: 10,
              borderBottomWidth: 1,
              margin: 2,
            }}
          >
            <TextInput
              keyboardType="decimal-pad"
              onChangeText={(p) => setP1(p)}
              // ref={'pin1ref'}
              // placeholder='0'
              // onChangeText={(pin1) => {
              //     setP1(p),
              //      () => {
              //         if (pin1 != '') {
              //             this.refs.pin2ref.focus()
              //         } else {
              //             this.refs.pin1ref.focus()
              //         }
              //     })
              // }}
              autoFocus={true}
              maxLength={1}
              keyboardType={"number-pad"}
              placeholderTextColor={"#8c8c8c"}
              style={styles.input}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              width: "12%",
              height: 40,
              borderRadius: 10,
              borderBottomWidth: 1,
              margin: 2,
            }}
          >
            <TextInput
              keyboardType="decimal-pad"
              onChangeText={(p) => setP2(p)}
              // ref={'pin1ref'}
              // // placeholder='0'
              // onChangeText={(pin1) => {
              //     this.setState({ pin1: pin1 }, () => {
              //         if (pin1 != '') {
              //             this.refs.pin2ref.focus()
              //         } else {
              //             this.refs.pin1ref.focus()
              //         }
              //     })
              // }}
              autoFocus={true}
              maxLength={1}
              keyboardType={"number-pad"}
              placeholderTextColor={"#8c8c8c"}
              style={styles.input}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              width: "12%",
              height: 40,
              borderRadius: 10,
              borderBottomWidth: 1,
              margin: 2,
            }}
          >
            <TextInput
              keyboardType="decimal-pad"
              onChangeText={(p) => setP3(p)}
              // ref={'pin1ref'}
              // // placeholder='0'
              // onChangeText={(pin1) => {
              //     this.setState({ pin1: pin1 }, () => {
              //         if (pin1 != '') {
              //             this.refs.pin2ref.focus()
              //         } else {
              //             this.refs.pin1ref.focus()
              //         }
              //     })
              // }}
              autoFocus={true}
              maxLength={1}
              keyboardType={"number-pad"}
              placeholderTextColor={"#8c8c8c"}
              style={styles.input}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              width: "12%",
              height: 40,
              borderRadius: 10,
              borderBottomWidth: 1,
              margin: 2,
            }}
          >
            <TextInput
              keyboardType="decimal-pad"
              onChangeText={(p) => setP4(p)}
              // ref={'pin1ref'}
              // // placeholder='0'
              // onChangeText={(pin1) => {
              //     this.setState({ pin1: pin1 }, () => {
              //         if (pin1 != '') {
              //             this.refs.pin2ref.focus()
              //         } else {
              //             this.refs.pin1ref.focus()
              //         }
              //     })
              // }}
              autoFocus={true}
              maxLength={1}
              keyboardType={"number-pad"}
              placeholderTextColor={"#8c8c8c"}
              style={styles.input}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              width: "12%",
              height: 40,
              borderRadius: 10,
              borderBottomWidth: 1,
              margin: 2,
            }}
          >
            <TextInput
              keyboardType="decimal-pad"
              onChangeText={(p) => setP5(p)}
              // ref={'pin1ref'}
              // // placeholder='0'
              // onChangeText={(pin1) => {
              //     this.setState({ pin1: pin1 }, () => {
              //         if (pin1 != '') {
              //             this.refs.pin2ref.focus()
              //         } else {
              //             this.refs.pin1ref.focus()
              //         }
              //     })
              // }}
              autoFocus={true}
              maxLength={1}
              keyboardType={"number-pad"}
              placeholderTextColor={"#8c8c8c"}
              style={styles.input}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              width: "12%",
              height: 40,
              borderRadius: 10,
              borderBottomWidth: 1,
              margin: 2,
            }}
          >
            <TextInput
              keyboardType="decimal-pad"
              onChangeText={(p) => {
                setP6(p),
                  () => {
                    if (p != "") {
                      CheckValidtions();
                    }
                  };
              }}
              // ref={'pin1ref'}
              // // placeholder='0'
              // onChangeText={(pin1) => {
              //     this.setState({ pin1: pin1 }, () => {
              //         if (pin1 != '') {
              //             this.refs.pin2ref.focus()
              //         } else {
              //             this.refs.pin1ref.focus()
              //         }
              //     })
              // }}
              autoFocus={true}
              maxLength={1}
              keyboardType={"number-pad"}
              placeholderTextColor={"#8c8c8c"}
              style={styles.input}
            />
          </View>
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
          <Text style={{ color: "#FF9900" }}> Change</Text>
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

        {/*{this.state.err ?
                <Text style={{ color: 'red', alignSelf: 'center' }}>Invalid pin entered</Text>
                :
                null
            }

            <Text style={{ textAlign: "center", color: "orange", marginTop: 10 }}>
                {this.state.error_message}
            </Text>


            <View style={{ justifyContent: "flex-end", alignItems: 'center', marginTop: 20 }}>
                {this.state.isLoading ? (
                    <View style={{ justifyContent: 'center' }}>
                        <View style={{ ...styles._LOGIN_Button_Style_android }}>
                            <ActivityIndicator size="large" color="#0A0A1A" />
                        </View>
                    </View>
                ) : (
                    <View style={{ flexDirection: 'row' }}>
                        {Platform.OS != "android" ? (
                            <TouchableOpacity
                                onPress={() => this.login()}
                                style={{ ...styles._LOGIN_Button_Style_IOS, backgroundColor: '#F165A8' }}
                            >
                                <Text style={styles._Touchable_Text_Colors}>Verify</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableNativeFeedback onPress={() => this.login()}>
                                <View style={{ ...styles._LOGIN_Button_Style_android, backgroundColor: '#F165A8' }}>
                                    <Text style={styles._Touchable_Text_Colors}>Verify</Text>
                                </View>
                            </TouchableNativeFeedback>
                        )}
                    </View>
                )}
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                {this.state.timer ?
                    
                    <>
                        <Text style={{ color: '#a9a9a9' }}>Will recieve code in </Text>

                        <CountDown
                            size={18}
                            until={60}
                            onFinish={() => this.setState({ btnstate: !this.state.btnstate, timer: false, err: false })}
                            digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: '#0f76de' }}
                            digitTxtStyle={{ color: '#a9a9a9' }}
                            timeToShow={['S']}
                            timeLabels={{ m: null, s: null }}
                        />
                    </>

                    :
                    <>
                        <Text style={{ color: '#a9a9a9' }}>Didn't recieve code</Text>
                        <TouchableOpacity onPress={() => this.resendCode()} >
                            <Text style={{ color: '#28ABFE', fontWeight: 'bold' }}> Resend</Text>
                        </TouchableOpacity>
                    </>

                }

            </View>
     */}
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

export default PhoneAuth;
