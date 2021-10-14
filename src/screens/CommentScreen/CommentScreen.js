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
  Keyboard,
} from "react-native";
import Swipeout from "react-native-swipeout";
import { user, send } from "../../../assets";
import {
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import { Header, Divider } from "react-native-elements";
import HeaderLeftComponent from "../../components/HeaderLeftComponent";
import firebase from "firebase";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Audio } from "expo-av";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
const CommentScreen = ({ route, navigation }) => {
  const inputRef = React.createRef();
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
  const [keyBoardHeight, setKeyBoardHeight] = useState(false);
  const [valueforBorrom, setValueforBorrom] = useState(false);
  useEffect(() => {
    // console.log("posts", posts);
    const id = route.params.id;
    if (id) {
      setId(id);
      getData(id);
    }
    inputRef.current.focus();
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, [isFocused]);
  const _keyboardDidShow = (e) => {
    setKeyBoardHeight(e.endCoordinates.height);
    setValueforBorrom(true);
    console.log(e.endCoordinates.height);
  };
  const _keyboardDidHide = () => {
    console.log("Keyboard Hidden");
    setValueforBorrom(false);
  };
  async function getData(id) {
    var myRef = firebase.database().ref("comments/" + id);
    var li = [];
    myRef.on("value", (data) => {
      //console.log("data", data);
      data.forEach((child) => {
        li.push({
          id: child.key,
          image: child.val().image,
          name: child.val().name,
          text: child.val().comments,
          createdAt: child.val().createdAt,
          user: child.val().user,
          loadcommentimage: false,
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

  async function postimageloader(id) {
    const res = posts.map((item) => {
      if (item.id === id) {
        console.log("Item-image==>", item.loadcommentimage);
        return {
          ...item,
          loadcommentimage: !item.loadcommentimage,
        };
      } else {
        return {
          ...item,
          // loadimage: false,
        };
      }
    });

    setPosts(res);
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
                  //flex: 1,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                }}
              >
                {firebase.auth().currentUser?.uid === item.user ? (
                  <TouchableOpacity
                    onPress={() => delComment(item.user, item.id)}
                    style={{ marginRight: 5, marginTop: responsiveHeight(3.5) }}
                  >
                    <MaterialCommunityIcons
                      name="trash-can-outline"
                      size={30}
                      color="red"
                    />
                  </TouchableOpacity>
                ) : null}
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
              backgroundColor:
                firebase.auth().currentUser?.uid === item.user
                  ? "#FBFBFB"
                  : "#FFF3E3",
              marginTop: 15,
              marginLeft:
                firebase.auth().currentUser?.uid === item.user ? 30 : 0,
              marginRight:
                firebase.auth().currentUser?.uid === item.user ? 0 : 30,
              padding: 10,
              borderRadius: 15,
              flexDirection: "row",
              paddingBottom: 15,
            }}
          >
            {/* {!(item.image || user)? */}
            <ActivityIndicator
              animating={item.loadcommentimage}
              size="small"
              color="black"
              style={{ left: responsiveWidth(5) }}
            />
            {/* :<></>} */}
            <Image
              onLoadStart={() => postimageloader(item.id)}
              onLoadEnd={() => postimageloader(item.id)}
              source={item.image ? { uri: item.image } : user}
              style={[styles.userImgStyle, {}]}
            />
            <View style={{ width: "85%", marginTop: 3, marginLeft: 3 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{ color: "black", fontSize: 13, fontWeight: "700" }}
                >
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
    <View
      // behavior={Platform.OS === "ios" ? "padding" : null}
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
        style={{
          backgroundColor: "#FFF",
          width: "100%",
          position: "absolute",
          bottom: valueforBorrom
            ? keyBoardHeight -
              initialWindowMetrics.insets.bottom +
              responsiveHeight(1)
            : 0,
          paddingVertical: 8,
        }}
      >
        <View
          style={[
            styles.horizontalContainer,
            {
              justifyContent: "space-around",
              width: "100%",
              //alignSelf: "center",
              alignItems: "center",
              borderTopWidth: 0.5,
              borderColor: "#E3E3E3",
            },
          ]}
        >
          <TextInput
            ref={inputRef}
            style={styles.input}
            // placeholder="Comments"
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
              marginRight: responsiveHeight(1.5),
              marginTop: responsiveHeight(1.5),
            }}
          >
            {isloading ? (
              <ActivityIndicator color={"black"} size={"small"} />
            ) : (
              <Image
                source={send}
                style={{ height: 26, width: 26 }}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};
export default CommentScreen;
