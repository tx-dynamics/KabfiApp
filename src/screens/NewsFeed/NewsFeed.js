import firebase from "firebase";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { ProgressBar, Colors,Snackbar } from "react-native-paper";
// import Snackbar from 'rn-snackbar-component'

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  RefreshControl,
  KeyboardAvoidingView,
  Modal,
  Linking,
  TouchableHighlight,
  ActivityIndicator,
  Slider,
} from "react-native";
import {
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider
} from 'react-native-popup-menu';
import * as Progress from "react-native-progress";
import OptionsMenu from "react-native-options-menu";
import styles from "./styles";
import { Header, Card } from "react-native-elements";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  user,
  more,
  postImage,
  reload,
  comments,
  favourite,
  heartImage,
  locationImage,
  menu,
  bars,
} from "../../../assets";
import { Audio } from "expo-av";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import HeaderCenterComponent from "../../components/HeaderCenterComponent";
import HeaderRight from "../../components/HeaderRight";
import { useIsFocused } from "@react-navigation/native";
require("firebase/database");
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import moment from "moment";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import CountDown from "react-native-countdown-component";
import { color } from "react-native-reanimated";
const useProgress = (maxTimeInSeconds = 700) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (progress < 1) {
        setElapsedTime((t) => t + 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setProgress(elapsedTime / maxTimeInSeconds);
  }, [elapsedTime]);

  return progress;
};

const NewsFeed = (props) => {
  const [Dp, setDp] = useState("");
  const [name, setName] = useState("");
  const isFocused = useIsFocused();
  const [posts, setPosts] = useState(null);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(true);
  const [show, setShow] = useState(false);
  const [uid, setUid] = useState("");
  const [rate, setRate] = useState("");
  const [date, setDate] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [refreshingModal, setRefreshingModal] = useState(true);
  const [largImage, setLargeImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [itemid, setitemid] = useState("");
  const [timer, settimer] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [progressPlay, setProgressPlay] = useState(0);
  const [maxTimeInSeconds, setMaxTimeInSeconds] = useState(0);
  const [sound, setsound] = useState();
  const refRBSheet = useRef();
  const [isplaying, setisplaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messge, setMessage] = useState('');
  const [timerStart, settimerStart] = useState(false);
  const [timerReset, settimerReset] = useState(false);
  const options = {
    container: {
      //backgroundColor: '#000',
      //padding: 5,
      borderRadius: 5,
      //width: 220,
    },
    text: {
      fontSize: 12,
      color: "#FFF",
      marginLeft: -7,
    },
  };
  useEffect(() => {
    fetchAllPosts();
    fetchLocation();
    // return sound
    //   ? () => {
    //       console.log("Unloading Sound");
    //       sound.unloadAsync();
    //     }
    //   : undefined;
  }, [isFocused]);
  //isFocused, sound
  // const handleTimerComplete = () => {
  //  console.log("Hadle complete ")
  //   settimerStart(false)
  //   settimerReset(false)
  // }

  async function handleTimerComplete(index, time) {
    //posts[index].time= time
    //fetchAllPosts()
    settimerReset(false);
    settimerStart(false);
    // alert("custom completion function");
  }

  async function fetchLocation() {
    setRefreshing(true);
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      } else {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        var da = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        };
        if (location) {
          try {
            const id = firebase.auth().currentUser?.uid;
            const mylocation = firebase.database().ref("locations/" + id);
            mylocation.set(da);
          } catch (err) {}
        }
      }
    } catch (err) {
      setRefreshing(false);
      // alert(err.message);
    }
    setRefreshing(false);
  }

  async function fetchAllPosts() {
    setRefreshing(true);
    const uid = firebase.auth().currentUser?.uid;
    const userdataNAme = firebase.database().ref("users/" + uid);
    userdataNAme.on("value", (userdata) => {
      if (userdata.val()?.Dp) {
        setDp(userdata.val().Dp);
      }
      if (userdata.val()?.firstName && userdata.val()?.lastName) {
        setName(userdata.val().firstName + " " + userdata.val().lastName);
        setDate(userdata.val().createdAt);
      }
    });

    let arr = [];
    //.orderByChild("createdAt")
    setUid(uid);
    await firebase
      .database()
      .ref("user_posts")
      .orderByChild("createdAt")
      .on("value", async function (snapshot) {
        const exists = snapshot.val() !== null;
        if (exists) {
          snapshot.forEach((child) => {
            //it will fetch user like
            const userlike = firebase
              .database()
              .ref(
                "user_posts/" +
                  child.key +
                  "/Like/" +
                  firebase.auth().currentUser?.uid
              );
            //it will check user hide the post or not
            const hideuser = firebase
              .database()
              .ref(
                "user_posts/" +
                  child.key +
                  "/Hide/" +
                  firebase.auth().currentUser?.uid
              );
            //it will check the save post that user save
            const userSave = firebase
              .database()
              .ref(
                "user_posts/" +
                  child.key +
                  "/Save/" +
                  firebase.auth().currentUser?.uid
              );
            //this will update if user change the picture
            const userImages = firebase
              .database()
              .ref("users/" + child.val().user);
            userlike.on("value", (chil) => {
              var myRef = firebase
                .database()
                .ref("comments/" + child.key)
                .on("value", function (snapshot) {
                  userImages.on("value", (updateImage) => {
                    if (chil.exists()) {
                      //it will check if user exist in current post or not to change heart color
                      hideuser.on("value", (ishide) => {
                        //it will check and bypass post if current user hide the post
                        if (!ishide.exists()) {
                          setData({ ...data });
                          arr.push({
                            id: child.key,
                            likes_count: child.val().likes_count,
                            save_count: child.val().save_count
                              ? child.val().save_count
                              : 0,
                            post_text: child.val().post_text,
                            user: child.val().user,
                            userName:
                              updateImage.val()?.firstName &&
                              updateImage.val()?.lastName
                                ? updateImage.val()?.firstName +
                                  " " +
                                  updateImage.val().lastName
                                : "",
                            user_image: updateImage.val()?.Dp
                              ? updateImage.val().Dp
                              : "",
                            post_image: child.val().post_image,
                            like: true,
                            save: child.val().save_count ? true : false,
                            comm: snapshot.numChildren(),
                            rec: child.val().recoding,
                            createdAt: child.val().createdAt,
                            region:
                              child.val().location != ""
                                ? child.val().location
                                : null,
                            time: child.val().time,
                            // isplaying: false,
                          });
                        }
                      });
                    } else {
                      hideuser.on("value", (ishide) => {
                        if (!ishide.exists()) {
                          setData({ ...data });
                          arr.push({
                            id: child.key,
                            time: child.val().time,
                            likes_count: child.val().likes_count,
                            save_count: child.val().save_count
                              ? child.val().save_count
                              : 0,
                            post_text: child.val().post_text,
                            user: child.val().user,
                            userName:
                              updateImage.val()?.firstName &&
                              updateImage.val()?.lastName
                                ? updateImage.val()?.firstName +
                                  " " +
                                  updateImage.val().lastName
                                : "",
                            user_image: updateImage.val()?.Dp
                              ? updateImage.val().Dp
                              : "",
                            createdAt: child.val().createdAt,
                            post_image: child.val().post_image,
                            like: false,
                            save: child.val().save_count ? true : false,
                            comm: snapshot.numChildren(),
                            rec: child.val().recoding,
                            region:
                              child.val().location != ""
                                ? child.val().location
                                : null,
                            isShow: false,
                          });
                        }
                      });
                    }
                  });
                });
            });
          });
        }
      });
    const ik = arr.reverse();
    setPosts(arr);
    // console.log("posts", ik);
    setRefreshing(false);
  }

  async function likeHandler(post_id, likes_count, islike, index) {
    console.log(index);
    console.log("Like handler before", !islike);
    const Details = {
      likes_count: islike ? likes_count - 1 : likes_count + 1,
    };
    posts[index].likes_count = Details.likes_count;
    posts[index].like = !islike;
    setSelectedId(post_id + likes_count);
    setPosts(posts);

    console.log("Like handler", posts[index].like);
    const delUser = firebase
      .database()
      .ref("user_posts/" + post_id + "/Like/")
      .child(uid);
    var mylike = firebase
      .database()
      .ref("user_posts/" + post_id + "/Like/" + uid);
    {
      islike
        ? delUser.remove(() => {
            console.log("Operation Complete");
          })
        : mylike.set(uid);
    }
    const data = firebase.database().ref("user_posts/" + post_id);
    data.update(Details);
    fetchAllPosts();
  }
  async function hideHandler(post_id) {
    // setRefreshing(true);
    

    let filtered = posts.filter((i) => {
      return post_id !== i.id;
    });

    console.log("\n", post_id);
    setMessage('This post is no longer available for you')
    setIsVisible(!isVisible)
    setPosts(filtered);
    
  
 
    const hiderPost = firebase
      .database()
      .ref("user_posts/" + post_id + "/Hide/");
    hiderPost.set(uid)
    setShow(false);
  

    console.log("post_id==>", post_id);
    // setRefreshing(false);
    // fetchAllPosts();
  }
  async function reportHandler(post_id) {
    // alert("Reported");
    setIsVisible(!isVisible)
    setMessage('Reported')
    const reportPost = firebase.database().ref("report/" + post_id + "/");
    reportPost.set(uid);
    setShow(false);
  }
  async function saveHandler(post_id, save_count, isSave) {
    const Details = {
      save_count: isSave ? save_count - 1 : save_count + 1,
    };
    console.log("Like handler", isSave);
    const delUser = firebase
      .database()
      .ref("user_posts/" + post_id + "/SavePost/")
      .child(uid);
    var mysave = firebase
      .database()
      .ref("user_posts/" + post_id + "/SavePost/" + uid);
    {
      isSave
        ? delUser.remove(() => {
            console.log("Operation Complete");
          })
        : mysave.set(uid);
    }
    const data = await firebase.database().ref("user_posts/" + post_id);
    data.update(Details);
    fetchAllPosts();
  }
  async function playSound(id, soundUri, time) {
    // console.log("testtt" + parseInt(time / 1000));

// <<<<<<< HEAD
    // setMaxTimeInSeconds(time / 1000);
    
    setMaxTimeInSeconds(time / 1000);
    setTimeout(() => {

      console.log("setting timout");
      setisplaying(!isplaying);
   
    }, 3000);

// >>>>>>> 0c399b6e4f264d33f2bc88f865686658ecbcdb99
    if (!isplaying) {
      try {
        // console.log("isplaying", isplaying);
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
        toogleLike(id);
        // console.log("Loading Sound", soundUri);
        const { sound: playbackObject } = await Audio.Sound.createAsync(
          {
            uri: soundUri,
          },
          {
            shouldPlay: true,
          }
        );
        setsound(playbackObject);
        var status = await playbackObject.getStatusAsync();
        // setTimeout(async () => {
        //   console.log("status", status);
        //   await playbackObject.playAsync();
        // }, 1000);
        var inter = 0;

        settimerStart(true);
        await playbackObject.playAsync();
        settimerReset(true);
        //time update

        // inter = setInterval(async () => {
        //   var remainingTime =
        //     status["durationMillis"] - status["positionMillis"];
        //   console.log(remainingTime);
        // }, Number(time));

        setTimeout(() => {
          setisplaying(false);
          settimerStart(false);

          const res = posts.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                isShow: false,
                time,
              };
            } else {
              return { ...item };
            }
          });
          setPosts(res);
          clearInterval(inter);
        }, Number(time) + 1000);
      } catch (err) {}
    } else {
      console.log("isplaying", isplaying);
      sound.pauseAsync();
      setisplaying(false);
      settimerStart(false);
      const res = posts.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isShow: false,
            time,
          };
        } else {
          return { ...item };
        }
      });
      setPosts(res);
    }
    settimerStart(false);
    settimerReset(false);
  }



  async function toogleLike(id, isplaying) {
    console.log(id);
    const res = posts.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isShow: true,
          progressbar: true,
          isplaying: !isplaying,
        };
      } else {
        return { ...item };
      }
    });
    // console.log(res);
    setPosts(res);
  }
  async function delPost(index, postid) {
    let filtered = posts.filter((i) => {
      return postid !== i.id;
    });
    console.log("post filter", filtered, "\n", postid);
    setPosts(filtered);
    // alert("Post Deleted Successfully");
    setIsVisible(!isVisible)
    setMessage('Post Deleted Successfully')
    const del = firebase.database().ref("user_posts").child(postid);
    del.remove().then(() => console.log("Post Deleted Successfully"));
  }

 

  const renderPosts = ({ item, index }) => {
    return (
      <View key={index} style={styles.cardStyle}>
        <View
          style={[
            {
              backgroundColor: "#FBFBFB",
            },
          ]}
        >
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
                width: "95%",
                alignSelf: "center",
                backgroundColor: "#FBFBFB",
              },
            ]}
          >
            <View style={[{ flexDirection: "row" }]}>
              <Image
                source={item.user_image ? { uri: item.user_image } : user}
                // style={[styles.userImgStyle,{marginTop:-30}]}
                style={Platform.OS == "android"?[styles.userImgStyle,{marginTop:-30}]:[styles.userImgStyle,{}]}
              />
              <Text
                // numberOfLines={3}
                style={[
                  styles.largeText,
                  {
                    marginTop: responsiveHeight(1.2),
                    // alignSelf: "center",
                    paddingLeft: 5,
                  },
                ]}
              >
                <Text style={[{ color: "black", fontWeight: "700" }]}>
                  {item.userName}
                </Text>
                <Text
                  style={[
                    styles.mediumText,
                    {
                      // alignSelf: 'flex-start',
                      // marginLeft: '15.5%',
                      color: "#464646",
                      fontSize: 11,
                    },
                  ]}
                  // @${item.userName.replace(/ /g, "")} .
                >{`\n@${item?.userName.replace(/ /g, "")}. ${moment(
                  item.createdAt
                ).format("ddd, HH:mm")}`}</Text>
              </Text>
            </View>

            {Platform.OS == "android"?
            <MenuProvider>
              <View style={{height:100}}>
              <Menu style={{position:'absolute',top:10,right:0}} >
                <MenuTrigger style={{ width: 40, marginTop: 6 }} >
                  <SimpleLineIcons name="options-vertical" size={18} color="black" />
                </MenuTrigger>
                { firebase.auth().currentUser?.uid === item.user?
                  <MenuOptions  optionsContainerStyle={{height:80,width:100}}>
                    <MenuOption customStyles={{height:48,width:100}}   >
                      <Text onPress={()=>delPost(item.user, item.id)} style={{fontWeight:'bold',color:'red',alignSelf:'center'}} >Delete</Text>
                    </MenuOption>
                    <MenuOption customStyles={{height:48,width:100}} >
                      <Text style={{fontWeight:'bold',alignSelf:'center'}} >Cancel</Text>
                    </MenuOption>
                  </MenuOptions>
                  :
                  <MenuOptions  optionsContainerStyle={{paddingLeft:8,height:100,width:100}}>
                  <MenuOption customStyles={{height:48,width:100}}   >
                    <Text onPress={()=>{hideHandler(item.id)}} style={{fontWeight:'bold',color:'red',alignSelf:'center'}} >Hide</Text>
                  </MenuOption>
                  <MenuOption customStyles={{height:48,width:100}}   >
                    <Text onPress={()=>reportHandler(item.id)} style={{fontWeight:'bold',color:'red',alignSelf:'center'}} >Report</Text>
                  </MenuOption>
                  <MenuOption customStyles={{height:48,width:100}} >
                    <Text style={{fontWeight:'bold',alignSelf:'center'}} >Cancel</Text>
                  </MenuOption>
                </MenuOptions>
                }
                
              </Menu>
              
              </View>
            </MenuProvider>
            :
         
            <OptionsMenu
              button={more}
              buttonStyle={{
                width: 30,
                height: 15,
                resizeMode: "contain",
                marginTop: 14,
              
              }}
              // customStyles={{}}
              destructiveIndex={1}
              options={
                firebase.auth().currentUser?.uid === item.user
                  ? ["Delete", "Cancel"]
                  : ["Hide", "Report", "Cancel"]
              }
              optionText={{color:'green'}}
             
              actions={
                firebase.auth().currentUser?.uid === item.user
                  ? [
                      () => delPost(item.user, item.id),
                      () => console.log("cancel"),
                    ]
                  : [
                      () => hideHandler(item.id),
                      () => {
                        reportHandler(item.id);
                      },
                      () => console.log("cancel"),
                    ]
              }
            /> 
          }

            

          </View>

          <View
            style={{
              flexDirection: "row",
              paddingLeft: 10,
              paddingVertical: 20,
            }}
          >
            {item.post_image ? (
              <TouchableOpacity
                onPress={() => {
                  setLargeImage(item.post_image);
                  setModalVisible(true);
                  setRefreshingModal(true);
                }}
                style={{ flex: 2 }}
              >
                <Image
                  style={{ width: 80, height: 80, alignSelf: "flex-end" }}
                  source={{ uri: item.post_image }}
                />
              </TouchableOpacity>
            ) : null}
            <View
              style={
                item.post_image
                  ? {
                      flex: 5,
                      paddingLeft: responsiveHeight(1.5),
                      marginTop: responsiveHeight(0.2),
                    }
                  : { flex: 20, marginTop: responsiveHeight(0.2) }
              }
            >
              <Text
                numberOfLines={4}
                style={{ textAlign: "justify", color: "#464646", fontSize: 13 }}
              >
                {item.post_text}
              </Text>
              {item.rec ? (
                <View
                  style={{
                    backgroundColor: "#FF9900",
                    width: responsiveWidth(48),
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 2,
                    marginTop: 3,
                    borderRadius: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      playSound(item.id, item.rec, item.time);
                      //settimerReset(true)
                    }}
                    style={{
                      // alignSelf: "center",
                      marginTop: 5,
                      // right: 4,
                    }}
                  >
                    {item.isShow ? (
                      <Ionicons name="pause" color="white" size={30} />
                    ) : (
                      <Ionicons name="play" color="white" size={30} />
                    )}
                  </TouchableOpacity>
                  {/* {item.time > 5999 ? ( */}
                  <>
                    {item.isShow ? (
                      <>
                      {isplaying?
                          <CountDown
                            until={(parseInt(item.time) / 1000).toFixed(0)}
                            onChange={(e) => {
                              console.log(e);
                            }}
                            size={12}
                            onFinish={() => handleTimerComplete}
                            digitStyle={{
                              backgroundColor: "transparent",
                              width: responsiveWidth(4),
                            }}
                            digitTxtStyle={{ color: "white" }}
                            timeToShow={["M", "S"]}
                            timeLabels={{ m: "", s: "" }}
                            showSeparators
                            separatorStyle={{ color: "white" }}
                            // running={timerStart}
                            style={{ marginLeft: responsiveWidth(-2) }}
                        />
                          :
                          <>
                            <ActivityIndicator size={'small'} color={'white'} />
                          </>
                      }
                      </>
                      
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
                        {(parseInt(item.time) / 1000).toFixed(0) >= 59 ? (
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
                        {(parseInt(item.time) / 1000).toFixed(0) > 9 ? (
                          <>
                            {(parseInt(item.time) / 1000).toFixed(0) >= 59 ? (
                              <Text>00</Text>
                            ) : (
                              <>{(parseInt(item.time) / 1000).toFixed(0)}</>
                            )}
                          </>
                        ) : (
                          <>0{(parseInt(item.time) / 1000).toFixed(0)}</>
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
                  {/* ) : (
                    <Text style={{ color: "white" }}>
                      {`0:${(item.time / 1000).toFixed(0)}`}
                    </Text>
                  )} */}
                  <Image
                    source={bars}
                    style={{
                      height: 30,
                      width: responsiveWidth(30),
                    }}
                    resizeMode="contain"
                  />
                </View>
              ) : null}
            </View>
          </View>
        </View>
        <View
          style={[
            {
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              marginTop: responsiveHeight(1),
              backgroundColor: "#FBFBFB",
            },
          ]}
        >
          <View
            style={[
              {
                flexDirection: "row",
                width: "50%",
                justifyContent: "space-between",
              },
            ]}
          >
            <View style={[styles.bottomContainer]}>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() =>
                  likeHandler(item.id, item.likes_count, item.like, index)
                }
              >
                <Ionicons
                  name="heart"
                  size={20}
                  color={item.like ? "red" : "black"}
                />
                <Text style={styles.smallText}>{` ${item.likes_count} `}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.bottomContainer]}
              onPress={() =>
                props.navigation.navigate("CommentScreen", { id: item.id })
              }
            >
              <Image
                source={comments}
                resizeMode="contain"
                style={{ height: 18, width: 18 }}
              />
              {/* <Text style={styles.smallText}>{` ${item.likes_count} `}</Text> */}
              <Text style={styles.smallText}>{item.comm}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={true}
              onPress={() => saveHandler(item.id, item.save_count, item.save)}
              style={[styles.bottomContainer]}
            >
              {/* <Image
                source={favourite}
                resizeMode="contain"
                style={{ height: 18, width: 18 }}
              />
              <Text style={styles.smallText}>{` ${item.save_count} `}</Text> */}
            </TouchableOpacity>
          </View>
          {item.region ? (
            <TouchableOpacity
              style={{
                alignItems: "center",
                zIndex: 1,
              }}
              onPress={() =>
                props.navigation.push("Map", {
                  latitude: item.region.latitude,
                  longitude: item.region.longitude,
                })
              }
            >
              <SimpleLineIcons
                name="location-pin"
                size={18}
                color={"orange"}
                style={{ alignSelf: "center" }}
              />
              {/* <Image source={locationImage} style={{ width: 20, height: 28 }} /> */}
            </TouchableOpacity>
          ) : (
            <View
              style={{ flex: 2, alignSelf: "flex-end", alignItems: "center" }}
            ></View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={{ width: "100%", height: "98%" }}
              source={{ uri: largImage }}
              resizeMode="contain"
            />
            <TouchableHighlight
              style={{
                backgroundColor: "#FCB040",
                width: "100%",
                height: "5%",
                justifyContent: "center",
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Image</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <Header
        backgroundColor="white"
        containerStyle={{ marginTop: 0 }}
        leftComponent={
          <TouchableWithoutFeedback
            activeOpacity={0}
            style={{
              tintColor: "black",
              alignItems: "center",
            }}
            onPress={() => refRBSheet.current.open()}
          >
            <Image
              source={menu}
              resizeMode={"contain"}
              style={{ marginTop: 15, height: 25, width: 25 }}
            />
          </TouchableWithoutFeedback>
        }
        rightComponent={<HeaderRight navigation={props.navigation} />}
        centerComponent={<HeaderCenterComponent name="News Feed" />}
      />
      {isVisible?
        <View style={{height:60}}>
          <Snackbar
            style={{backgroundColor:'#FF9900',marginLeft:8,marginRight:8,borderRadius:10}}
            visible={isVisible}
            action={{label:'ok'}}
            onDismiss={() => setIsVisible(!isVisible)}
            //   <AntDesign style={{marginLeft:10}} name="checkcircleo" size={24} color="white" />
            // )}
            // position={'top'}
            duration={messge.length + 1000}
          >
            <Text>{messge}</Text>
          </Snackbar>
        </View>
      :
      <></>
      }
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchAllPosts} />
        }
        data={posts}
        renderItem={renderPosts}
        extraData={selectedId}
        keyExtractor={(item, index) => item + index.toString()}
        showsVerticalScrollIndicator={false}
      />
      {show && (
        <View
          style={{
            backgroundColor: "lightgray",
            width: "100%",
            alignSelf: "center",
            // marginBottom: 15,
            position: "absolute",
            bottom: 0,
          }}
        >
          <TouchableOpacity
            style={{
              marginTop: 10,
              backgroundColor: "#FBFBFB",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              padding: 13,
              alignItems: "center",
              width: "90%",
              alignSelf: "center",
              borderBottomWidth: 0.5,
              borderColor: "lightgray",
            }}
            onPress={() => hideHandler(itemid)}
          >
            <Text style={{ color: "skyblue" }}>Hide</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              // marginTop: 40,
              backgroundColor: "#FBFBFB",
              // borderRadius: 5,
              padding: 13,
              alignItems: "center",
              width: "90%",
              alignSelf: "center",
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
            onPress={() => reportHandler(itemid)}
          >
            <Text style={{ color: "red" }}>Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 30,
              backgroundColor: "#FBFBFB",
              borderRadius: 5,
              padding: 13,
              alignItems: "center",
              width: "90%",
              alignSelf: "center",
              marginBottom: 5,
            }}
            onPress={() => setShow(false)}
          >
            <Text style={{ color: "skyblue" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={Dimensions.get("window").height / 1.3}
        // openDuration={250}
        customStyles={{
          container: {
            alignItems: "center",
            backgroundColor: "transparent",
          },
        }}
      >
        <View style={styles.contentArea}>
          <ScrollView style={styles.scroll}>
            <View style={styles.smallLine}></View>

            <View style={styles.userInfoContainer}>
              <View style={styles.userInfo1}>
                <Image
                  source={Dp ? { uri: Dp } : user}
                  style={styles.smallImage}
                />
              </View>
              <View style={styles.userInfo2}>
                <Text style={styles.userName}>{name}</Text>
              </View>
              <View style={styles.userInfo3}>
                <Text
                  style={[styles.info3Text, { fontWeight: "500" }]}
                >{`Member since ${
                  date ? moment(date).format("YYYY") : ""
                }`}</Text>
              </View>
            </View>

            <View style={styles.listContainer}>
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => {
                  refRBSheet.current.close(),
                    props.navigation.navigate("EditProfile");
                }}
              >
                <Image
                  source={require("../../../assets/ProjectImages/users/profile/edit-profile.png")}
                  style={styles.listIconImage}
                />
                <Text style={styles.listText}>Edit Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.listItem}>
                <Image
                  source={require("../../../assets/ProjectImages/users/profile/refer-taxi.png")}
                  style={styles.listIconImage}
                />
                <Text style={styles.listText}>Refer a taxicab driver</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  refRBSheet.current.close(),
                    props.navigation.navigate("HeatMap");
                }}
                style={styles.listItem}
              >
                <Image
                  source={require("../../../assets/ProjectImages/users/profile/hotspot.png")}
                  style={styles.listIconImage}
                />
                <Text style={styles.listText}>Hot spots</Text>
              </TouchableOpacity>
              {/* 
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => props.navigation.navigate("savedPost")}
              >
                <Image
                  source={require("../../../assets/ProjectImages/users/profile/saved-post.png")}
                  style={styles.listIconImage}
                />
                <Text style={styles.listText}>Saved Post</Text>
              </TouchableOpacity> */}

              <TouchableOpacity
                style={styles.listItem}
                onPress={() => {
                  refRBSheet.current.close(),
                    props.navigation.navigate("Settings");
                }}
              >
                <Image
                  source={require("../../../assets/ProjectImages/users/profile/settings.png")}
                  style={styles.listIconImage}
                />
                <Text style={styles.listText}>Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.listItem}
                onPress={() => {
                  refRBSheet.current.close(),
                    props.navigation.navigate("feedback1");
                }}
              >
                <Image
                  source={require("../../../assets/ProjectImages/users/profile/feedback.png")}
                  style={styles.listIconImage}
                />
                <Text style={styles.listText}>Feedback</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.listItem}
                onPress={() => Linking.openURL("https://kabfi.com/contact-us/")}
              >
                <Image
                  source={require("../../../assets/ProjectImages/users/profile/help.png")}
                  style={styles.listIconImage}
                />
                <Text style={styles.listText}>Help</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.listItem}
                onPress={() => {
                  refRBSheet.current.close(),
                    props.navigation.navigate("Legal");
                }}
              >
                <Image
                  source={require("../../../assets/ProjectImages/users/profile/legal.png")}
                  style={styles.listIconImage}
                />
                <Text style={styles.listText}>Legal</Text>
              </TouchableOpacity>
              <Text></Text>
            </View>
          </ScrollView>
        </View>
      </RBSheet>
    </View>
  );
};
export default NewsFeed;
