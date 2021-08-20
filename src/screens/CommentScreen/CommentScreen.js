import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  user,
  more,
  postImage,
  reload,
  comments,
  favourite,
} from "../../../assets";
import { useIsFocused } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import { Header } from "react-native-elements";
import HeaderCenterComponent from "../../components/HeaderCenterComponent";
import HeaderRight from "../../components/HeaderRight";
import HeaderLeftComponent from "../../components/HeaderLeftComponent";
import firebase from "firebase";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Audio } from "expo-av";
const CommentScreen = ({ route, navigation }) => {
  const [Sound, setSound] = useState("");
  const isFocused = useIsFocused();
  const [id, setId] = useState("");
  const [cmnt, setCmnt] = useState("");
  const [posts, setPosts] = useState(null);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [sound] = useState();
  const [recording, setRecording] = useState();
  const [isloading, setisloading] = useState(false);
  useEffect(() => {
    console.log("posts", posts);
    const id = route.params.id;
    if (id) {
      setId(id);
      getData(id);
    }
    console.log("id", id);
  }, [isFocused]);
  async function getData(id) {
    var myRef = firebase.database().ref("comments/" + id);
    var li = [];
    myRef.on("value", (data) => {
      console.log("data", data);
      data.forEach((child) => {
        li.push({
          id: child.key,
          image: child.val().image,
          name: child.val().name,
          text: child.val().comments,
          recording: child.val().recording,
        });
      });
      console.log("LI==>", li);
      setPosts(li);
    });
  }
  const renderPosts = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.9}
        style={styles.cardStyle}
      >
        <View style={[styles.horizontalContainer]}>
          <Image
            source={item.image ? { uri: item.image } : user}
            style={styles.userImgStyle}
          />
          <Text
            numberOfLines={3}
            style={[
              styles.largeText,
              {
                alignSelf: "center",
                padding: 5,
              },
            ]}
          >
            <Text style={[styles.largeText, { color: "black" }]}></Text>
            {item.name}
          </Text>
        </View>
        <Text
          numberOfLines={2}
          style={[
            styles.mediumText,
            {
              width: "95%",
              alignSelf: "center",
              marginTop: 10,
              marginBottom: 10,
            },
          ]}
        >
          {item.text}
        </Text>
        {item.recording ? (
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => playSound(item.recording)}
          >
            <MaterialIcons name="multitrack-audio" size={18} color={"blue"} />
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
    );
  };
  async function postComments() {
    setisloading(true);
    var user = firebase.auth()?.currentUser;
    var userData = firebase.database().ref("users/" + user?.uid);
    let sound = await uploadImage(Sound);
    if (!sound) {
      sound = "";
    }
    userData.on("value", (data) => {
      console.log("Data==>", data.val().firstName + "" + data.val().lastName);
      setImg(data.val().Dp);
      setName(data.val().firstName + "" + data.val().lastName);
      var myRef = firebase.database().ref("comments/" + id + "/");
      var data = {
        comments: cmnt,
        name: data.val().firstName + "" + data.val().lastName,
        image: data.val().Dp,
        recording: sound,
      };
      myRef.push(data);
    });
    setisloading(false);
    setCmnt("");
    setPosts([]);
    getData(id);
    console.log("here");
  }
  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      ToastAndroid.show("Starting recording..", ToastAndroid.SHORT);
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }
  async function playSound(uri) {
    console.log("Loading Sound");
    ToastAndroid.show("Loading Sound..", ToastAndroid.SHORT);
    const { sound: playbackObject } = await Audio.Sound.createAsync(
      { uri: uri },
      { shouldPlay: true }
    );
    // setSound(sound);

    console.log("Playing Sound", sound);
    ToastAndroid.show("Playing Sound..", ToastAndroid.SHORT);
    await playbackObject.playAsync();
  }
  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", recording._uri);
    setSound(recording._uri);
    ToastAndroid.show("Recording Saved..", ToastAndroid.SHORT);
    // playSound(recording._uri);
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
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <Header
        backgroundColor="white"
        leftComponent={
          <HeaderLeftComponent icon="back" navigation={navigation} />
        }
      />
      <FlatList data={posts} renderItem={renderPosts} />
      <View
        style={[
          styles.horizontalContainer,
          {
            marginBottom: 10,
            justifyContent: "space-between",
            width: "95%",
            alignSelf: "center",
          },
        ]}
      >
        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 7 }}
          onPress={recording ? stopRecording : startRecording}
        >
          <MaterialIcons name="multitrack-audio" size={20} color={"black"} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Comments"
          // autoCorrect={props.autoCorrect}
          autoCapitalize={"none"}
          returnKeyType={"done"}
          keyboardType={"default"}
          placeholderTextColor="gray"
          value={cmnt}
          multiline={true}
          underlineColorAndroid="transparent"
          onChangeText={(text) => {
            setCmnt(text);
          }}
        />
        <TouchableOpacity
          disabled={cmnt === "" ? true : false}
          onPress={postComments}
          style={{
            justifyContent: "center",
            alignSelf: "center",
            marginTop: 7,
          }}
        >
          {isloading ? (
            <ActivityIndicator color={"black"} size={"small"} />
          ) : (
            <MaterialCommunityIcons name="send" size={20} color={"black"} />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default CommentScreen;
