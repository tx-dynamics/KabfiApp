import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import * as ImageManipulator from "expo-image-manipulator";

// import { kabfiApp, firebase } from '../../database/config';
import firebase from "firebase";
import { Header } from "react-native-elements";
import { user2, user, edit } from "../../../assets";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { setNotificationChannelGroupAsync } from "expo-notifications";

const EditProfile = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [Dp, setDp] = useState("");
  const [flag, setFlag] = useState(true);
  const [loader, setLoader] = useState(false);
  const [ErroMessage, setErroMessage] = useState("");
  useEffect(() => {
    setLoader(true);
    const user = firebase.auth().currentUser?.uid;
    const data = firebase.database().ref("users/" + user);
    data.on("value", (userdata) => {
      userdata.val().Dp ? setFlag(true) : setFlag(false);
      setFirstName(userdata.val().firstName);
      setLastName(userdata.val().lastName);
      setMobileNo(userdata.val().mobileNo);
      setCity(userdata.val().city);
      setCountry(userdata.val().country);
      setEmail(userdata.val().email);
      setDp(userdata.val().Dp);
    });
    setLoader(false);
  }, []);

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

  async function editProfileHandler() {
    try {
      setLoader(true);
      let profileIamge;
      if (!firstName == "") {
        if (!lastName == "") {
          if (!mobileNo == "" && mobileNo.length > 10) {
            if (!city == "") {
              if (Dp) {
                console.log("OKKKK Man");
                profileIamge = await uploadImage(Dp);
              }

              let Details = {
                firstName: firstName,
                lastName: lastName,
                mobileNo: mobileNo,
                city: city,
                Dp: profileIamge,
              };

              const user = await firebase.auth().currentUser.uid;
              const data = await firebase
                .database()
                .ref("users/" + user)
                .update(Details);
              alert("Profile Updated Successfully");
              props.navigation.push("NewsFeed");
            } else {
              setErroMessage("city name cannont be empty");
            }
          } else {
            setErroMessage("Phone number cannot be empty and 11 characters");
          }
        } else {
          console.log("1!");
          setErroMessage("Last name cannont be empty");
        }
      } else {
        console.log("2!");
        setErroMessage("First name cannont be empty");
      }
      setLoader(false);
    } catch (error) {
      alert(error.message);
    }
  }
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
        quality: 0,
      });
    }
    const manipResult = await ImageManipulator.manipulateAsync(result.uri, [], {
      compress: 0,
      format: ImageManipulator.SaveFormat.PNG,
    });
    console.log(manipResult);

    if (!result.cancelled) {
      setDp(manipResult.uri);
      console.log("OKKKK ", manipResult.uri);
      // setDp1(true);
      // alert("Taxi License Selected");
    }
  };
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

  // const pickDpImage = async () => {
  //   let result = await ImagePicker.launchCameraAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.cancelled) {
  //     setDp(result.uri);

  //     //   alert("Profile Image Selected");
  //   }
  // };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.root}
    >
      <ScrollView>
        <Header
          backgroundColor="#FBFBFB"
          containerStyle={{
            // marginTop: 15,
            // paddingHorizontal: 20,
            backgroundColor: "#FBFBFB",
          }}
          leftComponent={
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Text
                style={{
                  color: "#FCB040",
                  fontSize: 17,
                  letterSpacing: 1,
                }}
              >
                Back
              </Text>
            </TouchableOpacity>
          }
          centerComponent={
            <Text style={{ fontSize: 17, color: "#000000" }}>Edit Profile</Text>
          }
          rightComponent={
            <TouchableOpacity onPress={() => editProfileHandler()}>
              {loader ? (
                <ActivityIndicator color={"blue"} size={"small"} />
              ) : (
                <Text
                  style={{
                    fontSize: 17,
                    color: "#727272",
                    fontWeight: "700",
                    letterSpacing: 1,
                  }}
                >
                  Save
                </Text>
              )}
            </TouchableOpacity>
          }
        />
        {/* {loader ? (
          <ActivityIndicator color={"blue"} size={"small"} />
          ) : ( */}
        <View style={styles.contentArea}>
          <TouchableOpacity
            style={[styles.imageContainer, { alignSelf: "center" }]}
            onPress={AlertTaxiLicenseImage}
          >
            {flag ? (
              <ImageBackground
                source={{ uri: Dp }}
                borderRadius={50}
                style={[styles.image, { alignItems: "flex-end" }]}
              >
                <Image
                  source={edit}
                  style={{ height: 20, width: 20, marginTop: 10 }}
                />
              </ImageBackground>
            ) : (
              <ImageBackground
                source={user}
                borderRadius={50}
                style={[styles.image, { alignItems: "flex-end" }]}
              >
                <Image
                  source={edit}
                  style={{ height: 20, width: 20, marginTop: 10 }}
                />
              </ImageBackground>
            )}
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={pickDpImage}>
                  <TextInput
                    style={styles.uploadImageFields}
                    placeholder="Upload Image"
                    editable={false}
                  />
                </TouchableOpacity>     */}

          <View style={styles.fieldContainer}>
            {/* <View style={styles.iconContainer}  >
                        <Image source={require('../../../assets/ProjectImages/users/profile/pencil-icon.png')} style={styles.icon}  />
                    </View> */}

            <Text style={styles.label}>First Name</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomWidth: 1,
                borderBottomColor: "#D7D7D7",
              }}
            >
              <TextInput
                value={firstName}
                onChangeText={(e) => setFirstName(e)}
                style={{
                  marginTop: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              />
              <AntDesign
                name="edit"
                color="#D7D7D7"
                size={18}
                style={{
                  alignSelf: "center",
                }}
              />
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              value={lastName}
              onChangeText={(e) => setLastName(e)}
              style={styles.textField}
            />
          </View>

          {/* <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput value="12345678" style={styles.textField} secureTextEntry={true}/>
                </View>  */}

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              value={mobileNo}
              style={styles.textField}
              onChangeText={(e) => setMobileNo(e.replace(/[^0-9]/g, ""))}
              keyboardType="number-pad"
              placeholder="7711111111"
              maxLength={11}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              style={styles.textField}
              editable={false}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>City, State</Text>
            <TextInput
              value={city}
              onChangeText={(e) => setCity(e)}
              style={styles.textField}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Country</Text>
            <TextInput
              value={"United Kingdom"}
              // onChangeText={(e) => setCountry(e)}
              style={styles.textField}
              editable={false}
            />
          </View>
          <Text
            style={{
              color: "red",
              alignSelf: "center",
              marginTop: responsiveHeight(2),
            }}
          >
            {ErroMessage}
          </Text>
        </View>
        {/* )}  */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
    flex: 1,
  },
  contentArea: {
    marginTop: "10%",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingHorizontal: 30,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  fieldContainer: {
    marginTop: 30,
    width: "100%",
    // backgroundColor:'orange'
  },
  label: {
    color: "#D7D7D7",
    // width:'100%',
    // backgroundColor:'yellow'
  },
  textField: {
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#D7D7D7",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  iconContainer: {
    width: 50,
    height: 30,
    position: "absolute",
    right: 10,
    top: 30,
    // backgroundColor:'red',
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  icon: {
    height: 20,
    width: 20,
    // width:20,
    // height:20,
    // position:'absolute',
    // right:0,
    // top:35,
    // backgroundColor:'red'
  },
});

export default EditProfile;
