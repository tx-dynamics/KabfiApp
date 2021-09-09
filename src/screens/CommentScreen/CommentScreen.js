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
import Swipeout from "react-native-swipeout";
import {
  user,
  more,
  postImage,
  reload,
  comments,
  favourite,
} from "../../../assets";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import { Header, Divider } from "react-native-elements";
import HeaderLeftComponent from "../../components/HeaderLeftComponent";
import firebase from "firebase";
import AntDesign from "react-native-vector-icons/AntDesign";
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
  const [Close, setClose] = useState(true);
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
          createdAt: child.val().createdAt,
          user: child.val().user,
        });
      });
      console.log("LI==>", li);
    });
    setPosts(li);
  }
  async function delComment(index, cmntId) {
    const userId = firebase.auth().currentUser?.uid;
    console.log("index", index, "\n cmntId", cmntId, "userid", userId);
    if (userId === index) {
      const delUser = firebase
        .database()
        .ref("comments/" + id + "/")
        .child(cmntId);
      delUser.remove(() => {
        console.log("Operation Complete");
        getData(id);
      });
    } else {
      alert("You can only delete your comments. Thanks");
    }
  }
  const renderPosts = ({ item, index }) => {
    return (
      <Swipeout
        close={!Close}
        right={[
          {
            component: (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                }}
              >
                <TouchableOpacity
                  onPress={() => delComment(item.user, item.id)}
                  style={{ marginRight: 5 }}
                >
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={30}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
            ),
            backgroundColor: "white",
            //   underlayColor: 'transparent',
            // onPress: () => {
            //   console.log("Delete Item");
            // },
          },
        ]}
        autoClose={true}
        backgroundColor="transparent"
      >
        <TouchableOpacity
          key={index}
          activeOpacity={0.9}
          style={styles.cardStyle}
        >
          <View
            style={{
              backgroundColor: index % 2 === 0 ? "#FBFBFB" : "#FFF3E3",
              marginTop: 15,
              marginLeft: index % 2 === 0 ? 30 : 0,
              marginRight: index % 2 === 0 ? 0 : 30,
              padding: 10,
              borderRadius: 15,
              flexDirection: "row",
              paddingBottom: 15,
            }}
          >
            <Image
              source={item.image ? { uri: item.image } : user}
              style={styles.userImgStyle}
            />
            <View style={{ width: "85%", marginTop: 3, marginLeft: 3 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "black", fontSize: 13 }}>
                  {item.name}
                </Text>
                <Text style={{ color: "black", fontSize: 18 }}>{" • "}</Text>
                <Text style={{ color: "black", fontSize: 13 }}>
                  {moment(item.createdAt).format("ddd, HH:mm")}
                </Text>
              </View>
              <Text numberOfLines={2} style={{ color: "black", fontSize: 13 }}>
                {item.text}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  };
  async function postComments() {
    var user = firebase.auth()?.currentUser;
    var userData = firebase.database().ref("users/" + user?.uid);

    userData.on("value", async (data) => {
      console.log("Data==>", data.val().firstName + " " + data.val().lastName);
      setImg(data.val().Dp);
      setName(data.val().firstName + "" + data.val().lastName);
      var myRef = firebase.database().ref("comments/" + id + "/");
      var data = {
        comments: cmnt,
        name: data.val().firstName + " " + data.val().lastName,
        image: data.val().Dp,
        createdAt: new Date().toISOString(),
        user: user?.uid,
      };
      myRef.push(data).then(() => setisloading(false));
      setPosts(null);
    });
    setCmnt("");
    // setPosts([]);
    getData(id);
    console.log("here");
    setisloading(false);
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
        centerComponent={
          <Text style={{ fontSize: 17, color: "#000000", fontWeight: "700" }}>
            Comments
          </Text>
        }
      />
      <FlatList data={posts} renderItem={renderPosts} />
      <View
        style={[
          styles.horizontalContainer,
          {
            marginBottom: 10,
            justifyContent: "space-around",
            width: "95%",
            alignSelf: "center",
            alignItems: "center",
          },
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Comments"
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
          onPress={() => {
            postComments(), setisloading(true);
          }}
          style={{
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          {isloading ? (
            <ActivityIndicator color={"black"} size={"small"} />
          ) : (
            <MaterialCommunityIcons name="send" size={26} color={"black"} />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default CommentScreen;
