import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  AsyncStorage,
  ToastAndroid,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  Animated,
} from "react-native";
import {
  user,
  user2,
  smallGallery,
  smallLocation,
  voiceImage,
} from "../../../assets";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import { Audio } from "expo-av";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useIsFocused } from "@react-navigation/native";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { RequestPushMsg } from "../../components/RequestPushMsg";

import AudioView from "./AudioRecording";

const CreatePost = (props) => {
  const inputRef = React.createRef();
  const [Sound, setSound] = useState("");
  const [isPressed, setIsPressed] = useState(true);
  const [recording, setRecording] = useState();
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [Dp, setDp] = useState("");
  const [loading, setloading] = useState(false);
  const [sound] = useState();
  const [loc, setLoc] = useState("");
  const isFocused = useIsFocused();
  const [time, settime] = useState("");
  const [show, setshow] = useState(false);
  const [stopwatchReset, setstopwatchReset] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [animated, setAnimated] = useState(new Animated.Value(0));
  const [opacityA, setOpacityA] = useState(new Animated.Value(1));

  useEffect(() => {
    //inputRef.current.focus();
    getLocation();
    setshow(true);
  }, [isFocused]);
  async function getLocation() {
    const user = firebase.auth().currentUser?.uid;
    const data = firebase.database().ref("users");
    const userName = firebase.database().ref("users/" + user);

    userName.on("value", (chil) => {
      {
        setUserId(user);
        setUserName(chil.val()?.firstName + " " + chil.val()?.lastName);
        chil.val()?.Dp ? setDp(chil.val().Dp) : null;
      }
    });
    const arr = [];

    data.on("value", (userdata) => {
      {
        userdata.forEach((child) => {
          if (child.val()?.isEnabled === true && child.key !== user) {
            arr.push(child.val()?.pushToken);
          }
        });
      }
    });

    setTokens(arr);
    const location = await AsyncStorage.getItem("location");
    if (location !== null) {
      setLoc(JSON.parse(location));
      ToastAndroid.show("Location Added..", ToastAndroid.SHORT);
    }
  }

  async function savePost() {
    setloading(true);
    console.log(time, "here-=>");
    try {
      if (postImage || postText || loc || Sound) {
        let post_Image = await uploadImage(postImage);
        let sound = await uploadImage(Sound);
        if (!post_Image) {
          post_Image = "";
        }
        if (!sound) {
          sound = "";
        }
        console.log("postImage", post_Image);
        var myRef = firebase.database().ref("user_posts").push();
        var key = myRef.getKey();
        var mylike = firebase
          .database()
          .ref("user_posts/" + key + "/Like/" + userId);
        let Details = {
          post_id: key,
          user: userId,
          userName: userName,
          post_image: post_Image,
          post_text: postText,
          user_image: Dp,
          likes_count: 0,
          likes_user: [],
          recoding: sound,
          location: loc,
          createdAt: new Date().toISOString(),
          time: time,
        };
        let like = { userId };

        myRef.set(Details).then(() => {
          tokens.length > 0
            ? tokens.map((item) => RequestPushMsg(item, userName, postText))
            : console.log("No One");
        });
        // mylike.set(userId);
        alert("Post Added Succsessfully");
        await AsyncStorage.clear();
        setloading(false);
        setPostText("");
        setPostImage("");
        setUserId(""), setUserName("");
        setDp("");
        props.navigation.navigate("NewsFeed");
      } else {
        setloading(false);
        alert("please upload some data to post");
      }
    } catch (error) {
      setloading(false);
      alert(error.message);
    }
  }

 
  const pickPostImage = async (val) => {
    let result = "";

    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 0,
    });
    console.log("result", result.uri);

    if (!result.cancelled) {
      setPostImage(result.uri);
    }
  };

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
  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        // playThroughEarpieceAndroid: true,
      });
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      setRecording(recording);
    } catch (err) {
      setshow(false);
      setstopwatchReset(true);
      alert(err.message);
      console.error("Failed to start recording", err);
    }
  }
  async function playSound() {
    console.log("Loading Sound");
    const { sound: playbackObject } = await Audio.Sound.createAsync(
      {
        uri: Sound,
      },
      { shouldPlay: true }
    );
    // setSound(sound);

    console.log("Playing Sound", Sound);
    await playbackObject.playAsync();
  }
  async function stopRecording() {
    setshow(false);
    inputRef.current.focus();
    console.log("Stopping recording..");
    let testData = await recording.getStatusAsync();

    console.log("OKK", await testData);
    await recording.stopAndUnloadAsync();
    setshow(false);
    setstopwatchReset(true);
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", recording._uri);
    // let post_Image = await uploadImage(recording._uri);
    setSound(recording._uri);
    settime(JSON.stringify(testData.durationMillis));
    console.log("post_Image", recording._finalDurationMillis / 1000);

    // playSound(recording._uri);
  }
  async function showMethod() {
    Keyboard.dismiss();
    setshow(!show);
  }
  async function oncancel() {
    await AsyncStorage.clear();
    props.navigation.navigate("NewsFeed");
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    > 
         <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        enabled={true}
                        //keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
                    >
          <ScrollView style={styles.scrollView}>
          <View style={styles.contentArea}>
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <TouchableOpacity onPress={oncancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={savePost}>
                {loading ? (
                  <ActivityIndicator color={"red"} size={"small"} />
                ) : (
                  <Text style={styles.cancelText}>Publish</Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.postTextContainer}>
              {postImage ? (
                <ImageBackground
                  source={{ uri: postImage }}
                  style={{
                    marginLeft: responsiveHeight(0),
                    borderRadius: responsiveHeight(0.5),
                    width: 100,
                    height: 100,
                    opacity: 0.7,
                  }}
                >
                  <TouchableOpacity onPress={() => setPostImage(null)}>
                    <Entypo
                      name="cross"
                      size={30}
                      color="white"
                      style={{ alignSelf: "flex-end" }}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              ) : null}
              <TextInput
               // ref={inputRef}
                multiline={true}
                numberOfLines={14}
                onChangeText={(e) => setPostText(e)}
                value={postText}
                style={styles.textArea}
                placeholder="What's happening?"
                placeholderTextColor={"grey"}
                autoFocus={true}
              />
            </View>
          </View>
          </ScrollView>
          <View style={[styles.mediaContainerOuter, {}]}>
            <View style={styles.mediaContainerInner}>
              {!Sound ? (
                <TouchableOpacity onPress={showMethod}>
                  <MaterialIcons
                    name="multitrack-audio"
                    size={22}
                    color={"black"}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={playSound}>
                  <MaterialIcons
                    name="multitrack-audio"
                    size={22}
                    color={"blue"}
                  />
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={pickPostImage}>
                <Image source={smallGallery} style={styles.media} />
              </TouchableOpacity>

              {/* <TouchableOpacity onPress={() => props.navigation.navigate("Map")}>
            <SimpleLineIcons
              name="location-pin"
              size={24}
              color={loc ? "blue" : "black"}
            /> 
          </TouchableOpacity>
              */}
            </View>
          </View>

          {!show ? (
            <AudioView
              onPressAudio={recording ? stopRecording : startRecording}
            />
          ) : // <Stopwatch
          //   laps
          //   start={show}
          //   reset={stopwatchReset}
          //   //To start
          //   options={{
          //     container: {
          //       backgroundColor: "#FBFBFB",
          //       padding: 5,
          //       borderRadius: 5,
          //       width: 220,
          //       alignSelf: "center",
          //       marginTop: 5,
          //     },
          //     text: {
          //       fontSize: 20,
          //       color: "black",
          //       alignSelf: "center",
          //     },
          //   }}
          //   //options for the styling
          //   getTime={(time) => {
          //     //console.log(time);
          //   }}
          // />
          null}
    
   </KeyboardAvoidingView>
    </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  container1: {
    flex: 0,
    // alignSelf:'center',
    marginTop: responsiveHeight(20),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  contentArea: {
    marginTop: "15%",
    paddingHorizontal: 30,
  },
  cancelText: {
    marginTop: responsiveHeight(2),
    color: "#FCB040",
    fontSize: 17,
    //fontWeight: "600",
  },
  postTextContainer: {
    marginTop: responsiveHeight(5),
    //backgroundColor: "#FBFBFB",
    height: windowHeight / 3,
    //borderTopRightRadius: 50,
    //borderBottomLeftRadius: 50,
    //borderBottomRightRadius: 50,
  },
  userImage: {
    width: 60,
    height: 60,
    position: "absolute",
    top: responsiveHeight(-6),
    zIndex: 1,
    borderRadius: 50,
  },
  textArea: {
    // backgroundColor: "#FBFBFB",
    // textAlignVertical: "top",
    height: "100%",
    fontSize: 17,
    color: "#464646",
    //padding: responsiveHeight(2),
   marginTop: responsiveHeight(1),
  },
  publish: {
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
  },
  mediaContainerOuter: {
    marginTop: responsiveHeight(15),
    backgroundColor: "#FBFBFB",
    alignItems: "center",
    padding: 20,
     //position:'absolute',
   // bottom:0,
     // marginTop:windowHeight/1.84,
    width:'100%'
  },
  mediaContainerInner: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  media: {
    width: 25,
    height: 25,
  },
});

export default CreatePost;
