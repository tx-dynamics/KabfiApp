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
  Slider,
} from "react-native";
//import Slider from "react-native-slider";
import { ProgressBar, Colors, Snackbar } from "react-native-paper";
import * as ImageManipulator from "expo-image-manipulator";
import {
  // useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import CountDown from "react-native-countdown-component";
import {
  smallGallery,
  del,
  stop,
  bars,
  sendd,
  dell,
  loadad,
  waveoff,
  waveonn,
  cross,
  soundpic,
} from "../../../assets";
import AntDesign from "react-native-vector-icons/AntDesign";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AudioView from "./AudioRecording";
import { Feather } from "@expo/vector-icons";
import { set } from "react-native-reanimated";
import { connect } from "react-redux";
const CreatePost = (props) => {
  const inputRef = React.createRef();
  const [Sound, setSound] = useState("");
  const [showrec, setshowrec] = useState(false);
  const [recording, setRecording] = useState();
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [Dp, setDp] = useState("");
  const [loading, setloading] = useState(false);
  const [delTop, setDelTop] = useState(false);
  const [sound, setsound] = useState();
  const [loc, setLoc] = useState("");
  const isFocused = useIsFocused();
  const [time, settime] = useState("");
  const [show, setshow] = useState(false);
  const [stopwatchReset, setstopwatchReset] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [isplay, setisplay] = useState(false);
  const [isstopwatch, setisstopwatch] = useState(false);
  const [ontimer, setontimer] = useState(false);
  const [isdisable, setisdisable] = useState(false);
  const [index, setindex] = useState(false);
  const [keyBoardHeight, setKeyBoardHeight] = useState(false);
  const [isplaying, setisplaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messge, setMessage] = useState("");

  useEffect(() => {
    console.log(props.isLogin);
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    setRecording(null);
    getLocation();
    setshow(false);
    inputRef.current.focus();
    return sound
      ? () => {
          Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
          Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [isFocused, sound]);

  const _keyboardDidShow = (e) => {
    setKeyBoardHeight(e.endCoordinates.height);
    console.log(e.endCoordinates.height);
  };
  const _keyboardDidHide = () => {
    console.log("Keyboard Hidden");
  };
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
          if (
            child.val()?.isEnabled === true &&
            child.key !== user &&
            child?.val()?.isLogin
          ) {
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
    let post_Image;
    let sound;
    try {
      if (postImage || postText || loc || Sound) {
        // if(postImage)
        // {
        //  post_Image = await uploadImage(postImage);
        // }
        if (Sound) {
          sound = await uploadImage(Sound);
        }
        // if (!post_Image) {
        //   post_Image = "";
        // }
        if (!sound) {
          sound = "";
        }
        console.log("postImage", postImage);
        var myRef = firebase.database().ref("user_posts").push();
        var key = myRef.getKey();
        var mylike = firebase
          .database()
          .ref("user_posts/" + key + "/Like/" + userId);
        let Details = {
          post_id: key,
          user: userId,
          userName: userName,
          post_image: postImage,
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
        console.log("Notification test ", userName);
        var notification = firebase
          .database()
          .ref("Notifications/" + firebase?.auth()?.currentUser?.uid);
        let addNoti = {
          image:Dp,
          name:userName,
          message: `upload new post.`,
        };
        notification.push(addNoti);
        myRef.set(Details).then(() => {
          tokens.length > 0
            ? tokens.map((item) => RequestPushMsg(item, userName, postText))
            : console.log("No One");
        });
        mylike.set(userId);
        myRef.set(Details);
        // setMessage("Post Added Successfully");
        // setIsVisible(!isVisible);
        // alert("Post Added Successfully");
        await AsyncStorage.clear();
        setloading(false);
        setPostText("");
        setPostImage("");
        setUserId(""), setUserName("");
        setDp("");
        setTimeout(() => {
          props.navigation.navigate("NewsFeed", {
            screen:'post',
            created: "Post Added Successfully",
          });
        }, 2000);
      } else {
        setloading(false);
        // alert("Upload data to post");
      }
    } catch (error) {
      setloading(false);
      setMessage(error.message);
      setIsVisible(!isVisible);
      // alert(error.message);
    }
  }

  const pickPostImage = async (val) => {
    let result = "";
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 0,
    });
    const manipResult = await ImageManipulator.manipulateAsync(result.uri, [], {
      compress: 0,
      format: ImageManipulator.SaveFormat.PNG,
    });
    console.log("result", manipResult);

    if (!result.cancelled) {
      setPostImage(manipResult.uri);
      uploadImage(manipResult.uri);
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
            setPostImage(url);
            // setLoader(false);
          }
        );
      });
    } catch (err) {
      console.log("uploadImage error: " + err.message);
    }
  };
  async function startRecording() {
    setRecording("");
    try {
      setindex(true);
      setisstopwatch(true);
      setontimer(true);
      setisdisable(true);
      setshowrec(false);
      setstopwatchReset(false);
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
      const recording = new Audio.Recording();
      const { ios, android } = Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY;
      await recording.prepareToRecordAsync({
        android: android,
        ios: {
          ...ios,
          extension: ".mp4",
          outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
        },
      });
      await recording.startAsync();

      console.log("timer start");
      let interval;
      var secs = 0;
      const startTimer = (recording) => {
        // console.log(recording);
        interval = setInterval(() => {
          // console.log(secs);
          secs = secs + 1;

          if (secs === 60) {
            console.log("calling");
            setisdisable(false);
            setindex(true);
            setontimer(false);
            clearInterval(interval);

            // setRecording(recording);
            setTimeout(() => {
              // console.log(record);
              stopRecording(recording);
            }, 500);
            console.log("called");
          } else {
            setRecording(recording);
          }
        }, 1000);
      };
      clearInterval(interval);
      startTimer(recording);

      setRecording(recording);

      // const timer = setInterval(() => {}, 6000);
      // const timer = setInterval(() => {
      //   console.log("test")
      // }, 6000);
      // setTimeout(() => {
      //   setisdisable(false);
      //   setindex(true);
      //   setontimer(false);
      //   setRecording(record);
      //   stopRecording();
      // }, 6000);
      // const { recording } = await Audio.Recording.createAsync(
      //   Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY

      //   );
      // if (timer > 5999) {
      //   console.log("timer")
      //   clearInterval(timer);
      //   setisdisable(false);
      //   setindex(true);
      //   setontimer(false);
      //   setRecording(record);
      //   stopRecording();
      // }
      // setRecording(record);
    } catch (err) {
      setshow(false);
      setstopwatchReset(true);
      setstopwatchReset(false);
      setMessage(err.message);
      setIsVisible(!isVisible);
      // alert(err.message);
      console.error("Failed to start recording", err);
    }
  }
  async function playSound() {
    console.log("Loading Sound");
    // setisplay(true);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS:false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      playThroughEarpieceAndroid: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    });
    if (!isplaying) {
      const { sound: playbackObject } = await Audio.Sound.createAsync(
        {
          uri: Sound,
        },
        { shouldPlay: true }
      );
      console.log("Playing Sound", playbackObject);

      setsound(playbackObject);
      // let ntime = time;
      // await playbackObject.playAsync();
      // while (ntime) {
      //   settime(time / 10);
      // }
      setTimeout(() => {
        setisplay(false);
        setshow(false);
        setisplaying(false);
        // settime(ntime);
      }, Number(time));
    } else {
      sound.pauseAsync();
    }
  }
  async function stopRecording(recor) {
    // inputRef.current.focus();
    setDelTop(false);
    setontimer(false);

    setindex(false);
    setisdisable(false);
    // setstopwatchReset(true);

    // setstopwatchReset(false);
    setontimer(false);
    console.log("Stopping recording..");
    console.log("recorded at  " + recor.getURI());
    let testData = await recor.getStatusAsync();

    // console.log("OKK", await testData);
    await recor.stopAndUnloadAsync();
    const uri = recor.getURI();
    console.log("Recording stopped and stored at", recor._uri);
    // let post_Image = await uploadImage(recording._uri);
    setSound(recor._uri);
    settime(JSON.stringify(testData.durationMillis));
    console.log("post_Image", recor._finalDurationMillis / 1000);

    // playSound(recording._uri);
  }
  async function showMethod() {
    Keyboard.dismiss();
    setshow(true);
    setshowrec(false);
    setisstopwatch(false);
    setstopwatchReset(false);
    setisdisable(false);
    setRecording("");
    setindex(false);
  }
  async function oncancel() {
    await AsyncStorage.clear();
    props.navigation.navigate("NewsFeed");
  }
  async function onsendaudio() {
    inputRef.current.focus();
    setshow(false);
    setshowrec(true);
    setisstopwatch(false);
    setstopwatchReset(true);
    setstopwatchReset(false);
    setisdisable(false);
    setindex(false);
    setDelTop(false);
  }
  async function ondelaudio() {
    console.log("here");
    setstopwatchReset(true);
    setDelTop(true);
    setontimer(false);
    setRecording(null);
    setisdisable(false);
    setindex(false);
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {/* <KeyboardAvoidingView
//    style={{ flex: 1 }}
//    behavior={Platform.OS === "ios" ? "padding" : undefined}
//    enabled={true}
//    //keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}
//  > */}

      {/* <KeyboardAwareScrollView> */}
      <>
        {/* <ScrollView style={styles.scrollView}>
         */}

        <View style={styles.contentArea}>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <TouchableOpacity onPress={oncancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={recording || postText || postImage ? false : true}
              onPress={savePost}
            >
              {loading ? (
                <ActivityIndicator color={"red"} size={"small"} />
              ) : (
                <Text style={styles.cancelText}>Publish</Text>
              )}
            </TouchableOpacity>
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    height: "auto",
                  }}
                >
                  <AntDesign name="checkcircle" size={24} color="#FCB040" />
                  <Text
                    style={{
                      color: "black",
                      alignSelf: "center",
                      left: 8,
                      fontSize: 14,
                      fontWeight: "600",
                      color: "grey",
                      width: 300,
                    }}
                  >
                    {messge}
                  </Text>
                </View>
              </Snackbar>
            </View>
          ) : (
            <></>
          )}
          <View style={styles.postTextContainer}>
            {postImage ? (
              <ImageBackground
                source={{ uri: postImage }}
                style={{
                  marginLeft: responsiveHeight(0),
                  borderRadius: responsiveHeight(0.5),
                  width: 100,
                  height: 100,
                  opacity: 0.6,
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: "#000",
                    opacity: 0.8,
                    alignItems: "flex-end",
                  }}
                  onPress={() => setPostImage(null)}
                >
                  <Image
                    source={cross}
                    style={{
                      height: 15,
                      width: 15,
                      margin: 5,
                      tintColor: "white",
                    }}
                  />
                </TouchableOpacity>
              </ImageBackground>
            ) : null}

            <TextInput
              ref={inputRef}
              multiline={true}
              numberOfLines={14}
              onChangeText={(e) => setPostText(e)}
              value={postText}
              style={styles.textArea}
              placeholder="What's happening?"
              placeholderTextColor={"grey"}
              autoFocus={true}
            />
            {showrec ? (
              <View
                style={{
                  backgroundColor: "#FCB040",
                  width: responsiveWidth(51),
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 2,
                  marginTop: 3,
                  borderRadius: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    playSound(), setisplaying(!isplaying), setisplay(!isplay);
                  }}
                  style={{
                    // alignSelf: "center",
                    marginTop: 5,
                    marginBottom: 5,
                    // right: 4,
                  }}
                >
                  {isplay ? (
                    <Ionicons name="pause" color="white" size={26} />
                  ) : (
                    <Ionicons name="play" color="white" size={26} />
                  )}
                </TouchableOpacity>

                <>
                  {isplay ? (
                    <CountDown
                      until={(parseInt(time) / 1000).toFixed(0)}
                      onChange={(e) => {
                        console.log(e);
                      }}
                      size={10}
                      // onFinish={() => handleTimerComplete}
                      digitStyle={{
                        backgroundColor: "transparent",
                        width: responsiveWidth(4),
                      }}
                      digitTxtStyle={{ color: "white" }}
                      timeToShow={["M", "S"]}
                      timeLabels={{ m: "", s: "" }}
                      showSeparator
                      separatorStyle={{ color: "white" }}
                      // running={timerStart}
                      // style={{marginLeft:responsiveWidth(-2)}}
                    />
                  ) : (
                    // <Timer
                    //   totalDuration={parseInt(item.time)}
                    //   start={timerStart}
                    //   reset={timerReset}
                    //   options={options}
                    //   handleFinish={handleTimerComplete}
                    //   // msec
                    //   //getTime={this.getFormattedTime}
                    // />
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        {(parseInt(time) / 1000).toFixed(0) >= 59 ? (
                          <>01:</>
                        ) : (
                          <Text>00:</Text>
                        )}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        {(parseInt(time) / 1000).toFixed(0) > 9 ? (
                          <>
                            {(parseInt(time) / 1000).toFixed(0) >= 59 ? (
                              <Text>00</Text>
                            ) : (
                              <>{(parseInt(time) / 1000).toFixed(0)}</>
                            )}
                          </>
                        ) : (
                          <>0{(parseInt(time) / 1000).toFixed(0)}</>
                        )}
                      </Text>
                    </View>
                    // <Timer
                    // totalDuration={parseInt(item.time)}
                    // start={timerStart}
                    // reset={timerReset}
                    // options={options}
                    // handleFinish={handleTimerComplete}
                    //  msec
                    //getTime={this.getFormattedTime}
                    // />
                  )}
                  {/* <Text style={{ color: "white" }}>
                      {`${(item.time / 1000).toFixed(0)}:0`}
                    </Text> */}
                </>

                {/* <Text style={{ color: "white" }}>{`${(time / 1000).toFixed(
                  0
                )}:00`}</Text> */}
                <Image
                  source={bars}
                  style={{
                    height: 30,
                    width: responsiveWidth(27),
                  }}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  styles={{ right: 20 }}
                  onPress={() => {
                    setshowrec(false), setRecording("");
                  }}
                >
                  <Entypo name={"cross"} color="white" size={20} />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
        {/* </ScrollView> */}
        <View
          style={[
            styles.mediaContainerOuter,
            {
              bottom: keyBoardHeight - initialWindowMetrics.insets.bottom,
            },
          ]}
        >
          <View style={styles.mediaContainerInner}>
            {/* {!Sound ? ( */}
            <TouchableOpacity
              onPress={showMethod}
              // disabled={recording ? true : false}
            >
              {/* {!index || showrec ? */}
              {
                !index ? (
                  <>
                    {showrec ? (
                      <Image source={waveonn} style={styles.media} />
                    ) : (
                      <>
                        <Image source={waveoff} style={styles.media} />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {Sound != "" ? (
                      <Image source={waveoff} style={styles.media} />
                    ) : (
                      <Image source={waveonn} style={styles.media} />
                    )}
                  </>
                )
                // <Image source={waveonn}  style={styles.media} />
              }
              {/* <MaterialIcons
                name="multitrack-audio"
                size={22}
                color={"black"}
              /> */}
            </TouchableOpacity>
            {/* // ) : (
              //   <TouchableOpacity onPress={playSound}>
              //     <MaterialIcons
              //       name="multitrack-audio"
              //       size={22}
              //       color={"blue"}
              //     />
              //   </TouchableOpacity>
              // )} */}

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
        {isstopwatch && (
          <View
            style={{
              marginTop: responsiveHeight(20),
              alignSelf: "center",
              width: "90%",
              // backgroundColor: "tomato",
              alignItems: "flex-end",
            }}
          >
            <Stopwatch
              laps
              start={ontimer}
              reset={stopwatchReset}
              // totalDuration={6000}
              // handleFinish={() => {
              //   ontimer(false), setindex(false), stopRecording();
              // }}
              //To start
              options={{
                container: {
                  backgroundColor: "transparent",
                  // padding: 5,
                  // borderRadius: 5,
                  // width: 180,
                  // alignSelf: "center",
                  marginRight: 10,
                  // marginTop: 5,
                },
                text: {
                  fontSize: 20,
                  color: "orange",
                  alignSelf: "center",
                },
              }}
              //options for the styling
              getTime={(time) => {
                //console.log(time);
              }}
            />
          </View>
        )}

        {show ? (
          // <>

          <View
            style={{
              marginTop: responsiveHeight(5),
              flexDirection: "row",
              alignItems: "center",
              width: "90%",
              // backgroundColor: "tomato",
              alignSelf: "center",
              justifyContent: "space-between",
            }}
          >
            {isstopwatch ? (
              <TouchableOpacity
                onPress={onsendaudio}
                disabled={isdisable || !recording ? true : false}
              >
                <Image
                  source={sendd}
                  style={{
                    height: 40,
                    width: 30,
                    top: 5,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ) : (
              <Feather
                name="mic"
                size={5}
                color="transparent"
                style={{ alignSelf: "center" }}
              />
            )}
            {!index ? (
              <TouchableOpacity
                onPress={() => {
                  startRecording();
                }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 75,
                  backgroundColor: "#FCB040",
                  justifyContent: "center",
                  // alignSelf: "center",
                  marginTop: !isstopwatch
                    ? responsiveHeight(20)
                    : responsiveHeight(0),
                }}
              >
                <Feather
                  name="mic"
                  size={30}
                  color="white"
                  style={{ alignSelf: "center" }}
                />
                {/* icon or image */}
                <Text
                  style={{
                    color: "white",
                    alignSelf: "center",
                    fontWeight: "700",
                    fontSize: 16,
                  }}
                >
                  Rec.
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  stopRecording(recording),
                    setisdisable(false),
                    setontimer(false);
                }}
                style={{
                  borderRadius: 75,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={stop}
                  style={{ width: 100, height: 100 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
            {isstopwatch ? (
              <TouchableOpacity
                disabled={isdisable ? true : false}
                onPress={ondelaudio}
                style={{}}
              >
                <Image
                  source={dell}
                  style={{
                    height: 25,
                    width: 30,
                    bottom: 1,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ) : (
              <Feather
                name="mic"
                size={5}
                color="transparent"
                style={{ alignSelf: "center" }}
              />
            )}
          </View>
        ) : // </>
        null}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  container1: {
    flex: 0,
    // alignSelf:'center',
    marginTop: responsiveHeight(20),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    backgroundColor: "white",
  },
  contentArea: {
    marginTop: "9%",
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
    height: windowHeight / 4.1,
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
    //height: "100%",
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
    //marginTop: responsiveHeight(15),
    backgroundColor: "#FBFBFB",
    alignItems: "center",
    padding: 20,
    position: "absolute",
    bottom: 0,
    // marginTop:windowHeight/1.84,
    width: "100%",
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
const mapStateToProps = (state) => {
  const { isLogin } = state.AuthReducer;
  return { isLogin };
};
export default connect(mapStateToProps)(CreatePost);
