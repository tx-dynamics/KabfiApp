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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useIsFocused } from "@react-navigation/native";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const CreatePost = (props) => {
  const inputRef = React.createRef();
  const [Sound, setSound] = useState("");
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
  const [time, settime] = useState();
  const [show, setshow] = useState(false);
  const [stopwatchReset, setstopwatchReset] = useState(false);
  useEffect(() => {
    inputRef.current.focus();
    const user = firebase.auth().currentUser?.uid;
    const data = firebase.database().ref("users/" + user);
    data.on("value", (userdata) => {
      {
        userdata.val()?.Dp ? setDp(userdata.val().Dp) : null;
      }
      setUserId(user);
      console.log(userdata.val());
      setUserName(userdata.val()?.firstName + " " + userdata.val()?.lastName);
    });
    getLocation();
  }, [isFocused]);
  async function getLocation() {
    const location = await AsyncStorage.getItem("location");
    if (location !== null) {
      console.log("location", JSON.parse(location));
      setLoc(JSON.parse(location));
      ToastAndroid.show("Location Added..", ToastAndroid.SHORT);
    }
  }

  async function savePost() {
    setloading(true);
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
        };
        let like = { userId };

        myRef.set(Details);
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
      setshow(true);
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: true,
      });
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      console.log("Recording started");
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

    console.log("Playing Sound", sound);
    await playbackObject.playAsync();
  }
  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    setshow(false);
    setstopwatchReset(true);
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", recording._uri);
    // let post_Image = await uploadImage(recording._uri);
    setSound(recording._uri);
    settime(recording._finalDurationMillis);
    console.log("post_Image", recording._finalDurationMillis / 1000);

    // playSound(recording._uri);
  }
  async function oncancel() {
    await AsyncStorage.clear();
    props.navigation.navigate("NewsFeed");
  }
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.contentArea}>
          <TouchableOpacity onPress={oncancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <View style={styles.postTextContainer}>
            <Image style={styles.userImage} source={Dp ? { uri: Dp } : user} />
            {postImage ? (
              <Image
                style={{
                  alignSelf: "center",
                  marginLeft: responsiveHeight(1),
                  width: "70%",
                  height: "40%",
                  borderRadius: responsiveHeight(2),
                }}
                source={{ uri: postImage }}
              />
            ) : null}
            <TextInput
              ref={inputRef}
              multiline={true}
              numberOfLines={14}
              onChangeText={(e) => setPostText(e)}
              value={postText}
              style={styles.textArea}
              placeholder="What's happening ?"
              placeholderTextColor={"grey"}
              autoFocus={true}
            />
            <TouchableOpacity style={styles.publish} onPress={savePost}>
              {loading ? (
                <ActivityIndicator color={"red"} size={"small"} />
              ) : (
                <Text>Publish</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mediaContainerOuter}>
          <View style={styles.mediaContainerInner}>
            {!Sound ? (
              <TouchableOpacity
                onPress={recording ? stopRecording : startRecording}
              >
                <MaterialIcons
                  name="multitrack-audio"
                  size={18}
                  color={"black"}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={playSound}>
                <MaterialIcons
                  name="multitrack-audio"
                  size={18}
                  color={"blue"}
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={pickPostImage}>
              <Image
                source={postImage ? { uri: postImage } : smallGallery}
                style={styles.media}
              />
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => props.navigation.navigate("Map")}>
            <SimpleLineIcons
              name="location-pin"
              size={24}
              color={loc ? "blue" : "black"}
            />
          </TouchableOpacity> */}
          </View>
        </View>
        {show ? (
          <Stopwatch
            laps
            start={show}
            reset={stopwatchReset}
            //To start
            options={{
              container: {
                backgroundColor: "#FBFBFB",
                padding: 5,
                borderRadius: 5,
                width: 220,
                alignSelf: "center",
                marginTop: 5,
              },
              text: {
                fontSize: 20,
                color: "black",
                alignSelf: "center",
              },
            }}
            //options for the styling
            getTime={(time) => {
              console.log(time);
            }}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentArea: {
    marginTop: "15%",
    paddingHorizontal: 30,
  },
  cancelText: {
    color: "#FCB040",
    fontSize: 16,
    fontWeight: "600",
  },
  postTextContainer: {
    marginTop: 80,
    backgroundColor: "#FBFBFB",
    height: windowHeight / 2.5,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
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
    backgroundColor: "#FBFBFB",
    textAlignVertical: "top",
    padding: responsiveHeight(6),
  },
  publish: {
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
  },
  mediaContainerOuter: {
    marginTop: 20,
    backgroundColor: "#FBFBFB",
    alignItems: "center",
    padding: 20,
  },
  mediaContainerInner: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  media: {
    width: 18,
    height: 18,
  },
});

export default CreatePost;
