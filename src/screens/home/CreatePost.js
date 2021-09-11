// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   Dimensions,
//   AsyncStorage,
//   ToastAndroid,
//   ScrollView,
//   ImageBackground,
//   KeyboardAvoidingView,
//   Keyboard,
//   Slider,
// } from "react-native";
// import {
//   user,
//   user2,
//   smallGallery,
//   smallLocation,
//   voiceImage,
//   send,
//   del,
// } from "../../../assets";
// import {
//   responsiveWidth,
//   responsiveHeight,
//   responsiveFontSize,
// } from "react-native-responsive-dimensions";
// import * as ImagePicker from "expo-image-picker";
// import firebase from "firebase";
// import { Audio } from "expo-av";
// import Entypo from "react-native-vector-icons/Entypo";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
// import { useIsFocused } from "@react-navigation/native";
// import { Stopwatch, Timer } from "react-native-stopwatch-timer";
// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;
// import { RequestPushMsg } from "../../components/RequestPushMsg";
// import { useSafeAreaInsets, initialWindowMetrics } from 'react-native-safe-area-context';
// import AudioView from "./AudioRecording";
// import { Feather } from "@expo/vector-icons";
// const CreatePost = (props) => {
//   const inputRef = React.createRef();
//   const [Sound, setSound] = useState("");
//   const [showrec, setshowrec] = useState(false);
//   const [recording, setRecording] = useState();
//   const [postText, setPostText] = useState("");
//   const [postImage, setPostImage] = useState(null);
//   const [userId, setUserId] = useState("");
//   const [userName, setUserName] = useState("");
//   const [Dp, setDp] = useState("");
//   const [loading, setloading] = useState(false);
//   const [sound, setsound] = useState();
//   const [loc, setLoc] = useState("");
//   const isFocused = useIsFocused();
//   const [time, settime] = useState("");
//   const [show, setshow] = useState(false);
//   const [stopwatchReset, setstopwatchReset] = useState(false);
//   const [tokens, setTokens] = useState([]);
//   const [isplay, setisplay] = useState(false);
//   const [isstopwatch, setisstopwatch] = useState(false);
//   const [ontimer, setontimer] = useState(false);
//   const [isdisable, setisdisable] = useState(false);
//   const [index, setindex] = useState(false);
//   const [keyBoardHeight, setKeyBoardHeight] = useState(false);
  
//   useEffect(() => {
//     Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
//     Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
//     getLocation();
//     setshow(false);
//     inputRef.current.focus();
//     return sound
//       ? () => {
//         Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
//         Keyboard.removeListener('keyboardDidHide', _keyboardDidHide); 
//         console.log("Unloading Sound");
//           sound.unloadAsync();
//         }
//       : undefined;
//   }, [isFocused, sound]);
//   const _keyboardDidShow = (e) => {
//     setKeyBoardHeight(e.endCoordinates.height)
//     console.log( e.endCoordinates.height)
   
//    };
//    const _keyboardDidHide = () => {
//     console.log('Keyboard Hidden');
//   };

//   async function getLocation() {
//     const user = firebase.auth().currentUser?.uid;
//     const data = firebase.database().ref("users");
//     const userName = firebase.database().ref("users/" + user);

//     userName.on("value", (chil) => {
//       {
//         setUserId(user);
//         setUserName(chil.val()?.firstName + " " + chil.val()?.lastName);
//         chil.val()?.Dp ? setDp(chil.val().Dp) : null;
//       }
//     });
//     const arr = [];

//     data.on("value", (userdata) => {
//       {
//         userdata.forEach((child) => {
//           if (child.val()?.isEnabled === false && child.key !== user) {
//             arr.push(child.val()?.pushToken);
//           }
//         });
//       }
//     });

//     setTokens(arr);
//     const location = await AsyncStorage.getItem("location");
//     if (location !== null) {
//       setLoc(JSON.parse(location));
//       ToastAndroid.show("Location Added..", ToastAndroid.SHORT);
//     }
//   }

//   async function savePost() {
//     setloading(true);
//     console.log(time, "here-=>");
//     try {
//       if (postImage || postText || loc || Sound) {
//         let post_Image = await uploadImage(postImage);
//         let sound = await uploadImage(Sound);
//         if (!post_Image) {
//           post_Image = "";
//         }
//         if (!sound) {
//           sound = "";
//         }
//         console.log("postImage", post_Image);
//         var myRef = firebase.database().ref("user_posts").push();
//         var key = myRef.getKey();
//         var mylike = firebase
//           .database()
//           .ref("user_posts/" + key + "/Like/" + userId);
//         let Details = {
//           post_id: key,
//           user: userId,
//           userName: userName,
//           post_image: post_Image,
//           post_text: postText,
//           user_image: Dp,
//           likes_count: 0,
//           likes_user: [],
//           recoding: sound,
//           location: loc,
//           createdAt: new Date().toISOString(),
//           time: time,
//         };
//         let like = { userId };
//         console.log("Notification test ", userName);
//         myRef.set(Details).then(() => {
//           tokens.length > 0
//             ? tokens.map((item) => RequestPushMsg(item, userName, postText))
//             : console.log("No One");
//         });
//         // mylike.set(userId);
//         alert("Post Added Successfully");
//         await AsyncStorage.clear();
//         setloading(false);
//         setPostText("");
//         setPostImage("");
//         setUserId(""), setUserName("");
//         setDp("");
//         props.navigation.navigate("NewsFeed");
//       } else {
//         setloading(false);
//         alert("Upload data to post");
//       }
//     } catch (error) {
//       setloading(false);
//       alert(error.message);
//     }
//   }

//   const pickPostImage = async (val) => {
//     let result = "";

//     result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       aspect: [4, 3],
//       quality: 0,
//     });
//     console.log("result", result.uri);

//     if (!result.cancelled) {
//       setPostImage(result.uri);
//     }
//   };

//   const uploadImage = async (uri) => {
//     try {
//       // setLoader(true);
//       const response = await fetch(uri);
//       const blob = await response.blob();
//       var timestamp = new Date().getTime();
//       var ref = firebase.storage().ref().child(`images/${timestamp}`);
//       const task = ref.put(blob);

//       return new Promise((resolve, reject) => {
//         task.on(
//           "state_changed",
//           () => {},
//           (err) => {
//             reject(err);
//           },
//           async () => {
//             const url = await task.snapshot.ref.getDownloadURL();
//             resolve(url);
//             // setLoader(false);
//           }
//         );
//       });
//     } catch (err) {
//       console.log("uploadImage error: " + err.message);
//     }
//   };
//   async function startRecording() {
//     setisstopwatch(false);
//     setisdisable(false);
//     setshowrec(false);
//     setRecording("");
//     try {
//       setisstopwatch(true);
//       setontimer(true);
//       setisdisable(true);
//       setshowrec(false);
//       // setstopwatchReset(true);
//       await Audio.requestPermissionsAsync();
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
//         playsInSilentModeIOS: true,
//         shouldDuckAndroid: true,
//         interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
//         // playThroughEarpieceAndroid: true,
//       });
//       console.log("Starting recording..");
//       const { recording } = await Audio.Recording.createAsync(
//         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
//       );

//       setRecording(recording);
//     } catch (err) {
//       setshow(false);
//       setstopwatchReset(true);
//       setstopwatchReset(false);
//       alert(err.message);
//       console.error("Failed to start recording", err);
//     }
//   }
//   async function playSound() {
//     console.log("Loading Sound");
//     setisplay(true);
//     const { sound: playbackObject } = await Audio.Sound.createAsync(
//       {
//         uri: Sound,
//       },
//       { shouldPlay: true }
//     );
//     console.log("Playing Sound", Sound);
//     setsound(playbackObject);
//     await playbackObject.playAsync();
//     setisplay(false);
//     setshow(false);
//   }
//   async function stopRecording() {
//     // inputRef.current.focus();
//     if (!index) {
//       setindex(true);
//       setisdisable(false);
//       setstopwatchReset(true);
//       // setstopwatchReset(false);
//       setontimer(false);
//       console.log("Stopping recording..");
//       let testData = await recording.getStatusAsync();

//       console.log("OKK", await testData);
//       await recording.stopAndUnloadAsync();
//       const uri = recording.getURI();
//       console.log("Recording stopped and stored at", recording._uri);
//       // let post_Image = await uploadImage(recording._uri);
//       setSound(recording._uri);
//       settime(JSON.stringify(testData.durationMillis));
//       console.log("post_Image", recording._finalDurationMillis / 1000);
//     } else {
//       alert("Kindly delete previous recording first");
//     }

//     // playSound(recording._uri);
//   }
//   async function showMethod() {
//     Keyboard.dismiss();
//     setshow(true);
//     setshowrec(false);
//     setisstopwatch(false);
//     setstopwatchReset(false);
//     setisdisable(false);
//     setRecording("");
//     setindex(false);
//   }
//   async function oncancel() {
//     await AsyncStorage.clear();
//     props.navigation.navigate("NewsFeed");
//   }
//   async function onsendaudio() {
//     inputRef.current.focus();
//     setshow(false);
//     setshowrec(true);
//     setisstopwatch(false);
//     setstopwatchReset(true);
//     setstopwatchReset(false);
//     setisdisable(false);
//     setindex(false);
//   }
//   async function ondelaudio() {
//     console.log("here");
//     setstopwatchReset(true);
//     setontimer(false);
//     setRecording("");
//     setisdisable(false);
//     setindex(false);
//   }
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: "white",
//       }}
//     >
//       <KeyboardAvoidingView>
   
//           <View style={styles.contentArea}>
//             <View
//               style={{ justifyContent: "space-between", flexDirection: "row" }}
//             >
//               <TouchableOpacity onPress={oncancel}>
//                 <Text style={styles.cancelText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={savePost}>
//                 {loading ? (
//                   <ActivityIndicator color={"red"} size={"small"} />
//                 ) : (
//                   <Text style={styles.cancelText}>Publish</Text>
//                 )}
//               </TouchableOpacity>
//             </View>
//             <View style={styles.postTextContainer}>
//               {postImage ? (
//                 <ImageBackground
//                   source={{ uri: postImage }}
//                   style={{
//                     marginLeft: responsiveHeight(0),
//                     borderRadius: responsiveHeight(0.5),
//                     width: 100,
//                     height: 100,
//                     opacity: 0.7,
//                   }}
//                 >
//                   <TouchableOpacity onPress={() => setPostImage(null)}>
//                     <Entypo
//                       name="cross"
//                       size={30}
//                       color="white"
//                       style={{ alignSelf: "flex-end" }}
//                     />
//                   </TouchableOpacity>
//                 </ImageBackground>
//               ) : null}

//               <TextInput
//                 ref={inputRef}
//                 multiline={true}
//                 numberOfLines={14}
//                 onChangeText={(e) => setPostText(e)}
//                 value={postText}
//                 style={styles.textArea}
//                 placeholder="What's happening?"
//                 placeholderTextColor={"grey"}
//                 autoFocus={true}
//               />
//               {showrec ? (
//                 <View
//                   style={{
//                     backgroundColor: "#FBFBFB",
//                     width: responsiveWidth(50),
//                     flexDirection: "row",
//                     alignItems: "center",
//                     padding: 4,
//                     marginTop: 3,
//                   }}
//                 >
//                   <TouchableOpacity
//                     onPress={playSound}
//                     style={{
//                       // alignSelf: "center",
//                       marginTop: 5,
//                       right: 4,
//                     }}
//                   >
//                     {isplay ? (
//                       <Ionicons name="pause" color="black" size={30} />
//                     ) : (
//                       <Ionicons name="play" color="orange" size={30} />
//                     )}
//                   </TouchableOpacity>

//                   <Slider
//                     minimumValue={0}
//                     // maximumValue={Number(item.time)}
//                     onSlidingStart={false}
//                     // onSlidingComplete={item.isShow}
//                     // value={timer}
//                     minimumTrackTintColor={"orange"}
//                     maximumTrackTintColor={"black"}
//                     thumbStyle={{
//                       borderColor: "white",
//                       borderWidth: 4.5,
//                       height: 10,
//                       width: 10,
//                       borderRadius: 12,
//                     }}
//                     thumbTintColor={"#FF9900"}
//                     style={{ width: responsiveWidth(40) }}
//                   />
//                 </View>
//               ) : null}
//             </View>
//           </View>
         
//           <View style={[styles.mediaContainerOuter, {bottom:keyBoardHeight-initialWindowMetrics.insets.bottom}]}>
//             <View style={styles.mediaContainerInner}>
//               {/* {!Sound ? ( */}
//               <TouchableOpacity
//                 onPress={showMethod}
//                 // disabled={recording ? true : false}
//               >
//                 <MaterialIcons
//                   name="multitrack-audio"
//                   size={22}
//                   color={"black"}
//                 />
//               </TouchableOpacity>
//               {/* // ) : (
//               //   <TouchableOpacity onPress={playSound}>
//               //     <MaterialIcons
//               //       name="multitrack-audio"
//               //       size={22}
//               //       color={"blue"}
//               //     />
//               //   </TouchableOpacity>
//               // )} */}

//               <TouchableOpacity onPress={pickPostImage}>
//                 <Image source={smallGallery} style={styles.media} />
//               </TouchableOpacity>

//               {/* <TouchableOpacity onPress={() => props.navigation.navigate("Map")}>
//             <SimpleLineIcons
//               name="location-pin"
//               size={24}
//               color={loc ? "blue" : "black"}
//             /> 
//           </TouchableOpacity>
//               */}
//             </View>
//           </View>

//           {show ? (
//             <View style={{marginTop:responsiveHeight(15)}}>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   // backgroundColor: "tomato",
//                   alignSelf: "flex-end",
//                   width: "53%",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 {isstopwatch ? (
//                   <TouchableOpacity
//                     onPress={onsendaudio}
//                     disabled={!stopwatchReset ? true : false}
//                   >
//                     <Image
//                       source={send}
//                       style={{
//                         height: 30,
//                         width: 30,
//                         alignSelf: "center",
//                         marginTop: 5,
//                         marginBottom:  5,
//                       }}
//                       resizeMode="contain"
//                     />
//                   </TouchableOpacity>
//                 ) : null}
//                 {isstopwatch ? (
//                   <Stopwatch
//                     laps
//                     start={ontimer}
//                     reset={stopwatchReset}
//                     //To start
//                     options={{
//                       container: {
//                         backgroundColor: "transparent",
//                         // padding: 5,
//                         // borderRadius: 5,
//                         // width: 180,
//                         alignSelf: "center",
//                         marginRight: 10,
//                         // marginTop: 5,
//                       },
//                       text: {
//                         fontSize: 20,
//                         color: "black",
//                         alignSelf: "center",
//                       },
//                     }}
//                     //options for the styling
//                     getTime={(time) => {
//                       //console.log(time);
//                     }}
//                   />
//                 ) : null}
//               </View>
//               {index ? (
//                 <View
//                   style={{
//                     width: 100,
//                     height: 100,
//                     borderRadius: 75,
//                     backgroundColor: "#FCB040",
//                     justifyContent: "center",
//                     alignSelf: "center",
//                     marginTop: 30,
//                   }}
//                 >
//                   <Feather
//                     name="mic"
//                     size={30}
//                     color="white"
//                     style={{ alignSelf: "center" }}
//                   />
//                   {/* icon or image */}
//                   <Text
//                     style={{
//                       color: "white",
//                       alignSelf: "center",
//                       fontWeight: "700",
//                       fontSize: 16,
//                     }}
//                   >
//                     Rec.
//                   </Text>
//                 </View>
//               ) : (
//                 <View>
//                 <AudioView
//                   onPressAudio={() => {
//                     recording
//                       ? (stopRecording(),
//                         setisdisable(false),
//                         setstopwatchReset(true),
//                         setontimer(false))
//                       : (startRecording(),
//                         setisstopwatch(true),
//                         setontimer(true),
//                         setstopwatchReset(false),
//                         setisdisable(true),
//                         setshowrec(false));
//                   }}
//                 />
//                 </View>
//               )}
//               {isstopwatch ? (
//                 <TouchableOpacity
//                   disabled={!stopwatchReset ? true : false}
//                   onPress={ondelaudio}
//                   style={{
//                     flexDirection: "row",
//                     alignSelf: "flex-end",
//                     width: "53%",
//                     justifyContent: "space-between",
//                     marginTop: 30,
//                   }}
//                 >
//                   <Image
//                     source={del}
//                     style={{
//                       height: 30,
//                       width: 30,
//                       alignSelf: "center",
//                       marginTop: !index?responsiveHeight(15) :5,
//                     }}
//                     resizeMode="contain"
//                   />
//                 </TouchableOpacity>
                
//               ) : null}
//             </View>
//           ) : null}
      
//       </KeyboardAvoidingView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "red",
//   },
//   container1: {
//     flex: 0,
//     // alignSelf:'center',
//     marginTop: responsiveHeight(20),
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "red",
//     backgroundColor: "white",
//   },
//   contentArea: {
//     marginTop: "15%",
//     paddingHorizontal: 30,
//   },
//   cancelText: {
//     marginTop: responsiveHeight(2),
//     color: "#FCB040",
//     fontSize: 17,
//     //fontWeight: "600",
//   },
//   postTextContainer: {
//     marginTop: responsiveHeight(5),
//     //backgroundColor: "#FBFBFB",
//     height: windowHeight / 4.1,
//     //borderTopRightRadius: 50,
//     //borderBottomLeftRadius: 50,
//     //borderBottomRightRadius: 50,
//   },
//   userImage: {
//     width: 60,
//     height: 60,
//     position: "absolute",
//     top: responsiveHeight(-6),
//     zIndex: 1,
//     borderRadius: 50,
//   },
//   textArea: {
//     // backgroundColor: "#FBFBFB",
//     // textAlignVertical: "top",
//     //height: "100%",
//     fontSize: 17,
//     color: "#464646",
//     //padding: responsiveHeight(2),
//     marginTop: responsiveHeight(1),
//   },
//   publish: {
//     alignSelf: "center",
//     position: "absolute",
//     bottom: 20,
//   },
//   mediaContainerOuter: {
//     marginTop: responsiveHeight(15),
//     backgroundColor: "#FBFBFB",
//     alignItems: "center",
//     padding: 20,
//     position:'absolute',
//     // bottom:0,
//     // marginTop:windowHeight/1.84,
//     width: "100%",
//   },
//   mediaContainerInner: {
//     width: "50%",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   media: {
//     width: 25,
//     height: 25,
//   },
// });

// export default CreatePost;

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
import { useSafeAreaInsets, 
  initialWindowMetrics } from 'react-native-safe-area-context';
import {
  user,
  user2,
  smallGallery,
  smallLocation,
  voiceImage,
  send,
  del,
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AudioView from "./AudioRecording";
import { Feather } from "@expo/vector-icons";
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
  const [show, setshow] = useState(true);
  const [stopwatchReset, setstopwatchReset] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [isplay, setisplay] = useState(false);
  const [isstopwatch, setisstopwatch] = useState(false);
  const [ontimer, setontimer] = useState(false);
  const [isdisable, setisdisable] = useState(false);
  const [index, setindex] = useState(false);
  const [keyBoardHeight, setKeyBoardHeight] = useState(false);
  
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    getLocation();
    setshow(false);
    inputRef.current.focus();
    return sound
      ? () => {
        Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.removeListener('keyboardDidHide', _keyboardDidHide); 
        console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [isFocused, sound]);

    const _keyboardDidShow = (e) => {
    setKeyBoardHeight(e.endCoordinates.height)
    console.log( e.endCoordinates.height)
   
   };
   const _keyboardDidHide = () => {
    console.log('Keyboard Hidden');
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
          if (child.val()?.isEnabled === false && child.key !== user) {
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
        console.log("Notification test ", userName);
        myRef.set(Details).then(() => {
          tokens.length > 0
            ? tokens.map((item) => RequestPushMsg(item, userName, postText))
            : console.log("No One");
        });
        // mylike.set(userId);
        alert("Post Added Successfully");
        await AsyncStorage.clear();
        setloading(false);
        setPostText("");
        setPostImage("");
        setUserId(""), setUserName("");
        setDp("");
        props.navigation.navigate("NewsFeed");
      } else {
        setloading(false);
        alert("Upload data to post");
      }
    } catch (error) {
      setloading(false);
      alert(error.message);
    }
  }

  const pickPostImage = async (val) => {
    let result = "";

    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
    setisstopwatch(false);
    setisdisable(false);
    setshowrec(false);
    setDelTop(true)
    setRecording("");
    try {
      setisstopwatch(true);
      setontimer(true);
      setisdisable(true);
      setshowrec(false);
      // setstopwatchReset(true);
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
      setstopwatchReset(false);
      alert(err.message);
      console.error("Failed to start recording", err);
    }
  }
  async function playSound() {
    console.log("Loading Sound");
    setisplay(true);
    const { sound: playbackObject } = await Audio.Sound.createAsync(
      {
        uri: Sound,
      },
      { shouldPlay: true }
    );
    console.log("Playing Sound", Sound);
    setsound(playbackObject);
    await playbackObject.playAsync();
    setTimeout(() => {
      setisplay(false);
      setshow(false);
    }, Number(time));
  }
  async function stopRecording() {
    // inputRef.current.focus();
    setDelTop(false)
    if (!index) {
      setindex(true);
      setisdisable(false);
      setstopwatchReset(true);
      
      // setstopwatchReset(false);
      setontimer(false);
      console.log("Stopping recording..");
      let testData = await recording.getStatusAsync();

      console.log("OKK", await testData);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log("Recording stopped and stored at", recording._uri);
      // let post_Image = await uploadImage(recording._uri);
      setSound(recording._uri);
      settime(JSON.stringify(testData.durationMillis));
      console.log("post_Image", recording._finalDurationMillis / 1000);
    } else {
      alert("Kindly delete previous recording first");
    }

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
    setDelTop(false)
  }
  async function ondelaudio() {
    console.log("here");
    setstopwatchReset(true);
    setDelTop(true)
    setontimer(false);
    setRecording("");
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
                    backgroundColor: "#FBFBFB",
                    width: responsiveWidth(50),
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 4,
                    marginTop: 3,
                  }}
                >
                  <TouchableOpacity
                    onPress={playSound}
                    style={{
                      // alignSelf: "center",
                      marginTop: 5,
                      right: 4,
                    }}
                  >
                    {isplay ? (
                      <Ionicons name="pause" color="black" size={30} />
                    ) : (
                      <Ionicons name="play" color="orange" size={30} />
                    )}
                  </TouchableOpacity>

                  <Slider
                    minimumValue={0}
                    maximumValue={Number(time)}
                    onSlidingStart={isplay}
                    onSlidingComplete={isplay}
                    // value={timer}
                    minimumTrackTintColor={"orange"}
                    maximumTrackTintColor={"lightgray"}
                    thumbStyle={{
                      // borderColor: "white",
                      borderWidth: 4.5,
                      height: 10,
                      width: 10,
                      borderRadius: 12,
                    }}
                    thumbTintColor={"#FF9900"}
                    style={{ width: responsiveWidth(40) }}
                  />
                </View>
              ) : null}
            </View>
          </View>
          {/* </ScrollView> */}
          <View style={[styles.mediaContainerOuter, 
            {bottom:keyBoardHeight-initialWindowMetrics.insets.bottom}]}>
            <View style={styles.mediaContainerInner}>
              {/* {!Sound ? ( */}
              <TouchableOpacity
                onPress={showMethod}
                // disabled={recording ? true : false}
              >
                <MaterialIcons
                  name="multitrack-audio"
                  size={22}
                  color={"black"}
                />
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

          {show ? (
            <View style={{marginTop:responsiveHeight(15)}}>
              <View
                style={{
                  flexDirection: "row",
                  // backgroundColor: "tomato",
                  alignSelf: "flex-end",
                  width: "53%",
                  justifyContent: "space-between",
                }}
              >
                {isstopwatch ? (
                  <TouchableOpacity
                    onPress={onsendaudio}
                    disabled={!stopwatchReset ? true : false}
                  >
                    <Image
                      source={send}
                      style={{
                        height: 30,
                        width: 30,
                        alignSelf: "center",
                        marginTop: 5,
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ) : null}
                {isstopwatch ? (
                  <Stopwatch
                    laps
                    start={ontimer}
                    reset={stopwatchReset}
                    //To start
                    options={{
                      container: {
                        backgroundColor: "transparent",
                        // padding: 5,
                        // borderRadius: 5,
                        // width: 180,
                        alignSelf: "center",
                        marginRight: 10,
                        // marginTop: 5,
                      },
                      text: {
                        fontSize: 20,
                        color: "black",
                        alignSelf: "center",
                      },
                    }}
                    //options for the styling
                    getTime={(time) => {
                      //console.log(time);
                    }}
                  />
                ) : null}
              </View>
              {index ? (
               
                <View
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 75,
                    backgroundColor: "#FCB040",
                    justifyContent: "center",
                    alignSelf: "center",
                    marginTop: 30,
                   
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
                </View>
              ) : (
                <AudioView
                  onPressAudio={() => {
                    recording
                      ? (stopRecording(),
                        setisdisable(false),
                        setstopwatchReset(true),
                        setontimer(false))
                      : (startRecording(),
                        setisstopwatch(true),
                        setontimer(true),
                        setstopwatchReset(false),
                        setisdisable(true),
                        setshowrec(false));
                  }}
                />
              )}
              {isstopwatch ? (
                <TouchableOpacity
                  disabled={!stopwatchReset ? true : false}
                  onPress={ondelaudio}
                  style={{
                    flexDirection: "row",
                    alignSelf: "flex-end",
                    width: "53%",
                    justifyContent: "space-between",
                    marginTop: 30,       
                    
                    top: delTop ?responsiveHeight(11.5):0,

                  }}
                >
                  <Image
                    source={del}
                    style={{
                      height: 30,
                      width: 30,
                      alignSelf: "center",
                      marginTop: 5,
                      
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null}
        </>
      {/* </KeyboardAwareScrollView> */}

      {/* </KeyboardAvoidingView> */}
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
    position:'absolute',
     bottom:0,
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

export default CreatePost;

