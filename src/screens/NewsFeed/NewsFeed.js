import firebase from "firebase";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { ProgressBar, Colors } from "react-native-paper";
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
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (progress < 1) {
  //       setElapsedTime(t => t + 1);
  //     }
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);

  // const progressBarFunc= () => {
  //   setProgress(elapsedTime / maxTimeInSeconds);
  //   console.log("TETS",progress)

  // }
  // useEffect(() => {
  //   //  var arr = splitInteger(1.0, 6)
  //   //  var arr = divvy(1.0, 6, 1)
  //   var number = 1.0;
  //   var n = 10;

  //   var values = [];
  //   while (number > 0 && n > 0) {
  //     var a = (number / n / 50) * 50;
  //     number -= a;
  //     n--;
  //     values.push(parseFloat(a.toFixed(1)));
  //   }

  //   // alert(JSON.stringify(values[0]+values[1]))
  // }, []);

  //   const breakIntoParts = (num, parts) =>
  //         [...Array(parts)].map((_,i) =>
  //           0|num/parts+(i < num%parts))

  //   function divvy(number, parts, min) {

  //   var randombit = number - min * parts;
  //   var out = [];

  //   for (var i=0; i < parts; i++) {
  //     out.push(Math.random());
  //   }

  //   var mult = randombit / out.reduce(function (a,b) {return a+b;});

  //   return out.map(function (el) { return el * mult + min; });
  // }

  const splitInteger = (number, parts) => {
    const remainder = number % parts;
    const baseValue = (number - remainder) / parts;

    // return Array(parts).fill(baseValue).fill(baseValue + 1, parts - remainder)
    return remainder;
  };

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
              .ref("user_posts/" + child.key + "/Like/" + uid);
            //it will check user hide the post or not
            const hideuser = firebase
              .database()
              .ref("user_posts/" + child.key + "/Hide/" + uid);
            //it will check the save post that user save
            const userSave = firebase
              .database()
              .ref("user_posts/" + child.key + "/Save/" + uid);
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
                            progressbar: false,
                            // isplaying: false,
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

    console.log("post filter", filtered, "\n", post_id);
    setPosts(filtered);
    alert("This post is no longer availble for you");
    const hiderPost = firebase
      .database()
      .ref("user_posts/" + post_id + "/Hide/");
    hiderPost.set(uid);
    setShow(false);
    // setRefreshing(false);
    // fetchAllPosts();
  }
  async function reportHandler(post_id) {
    alert("Reported");
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
    console.log("testtt" + parseInt(time / 1000));
    setMaxTimeInSeconds(time / 1000);
    if (!isplaying) {
      try {
        console.log("isplaying", isplaying);
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

        console.log("Loading Sound", soundUri);
        toogleLike(id);
        const { sound: playbackObject } = await Audio.Sound.createAsync(
          {
            uri: soundUri,
          },
          {
            shouldPlay: true,
          }
        );
        setsound(playbackObject);
        // console.log("Playing Sound", playbackObject);
        // var number = 1.0;
        // var n = parseInt(time / 1000);

        // var values = [];
        // while (number > 0 && n > 0) {
        //   var a = (number / n / 50) * 50;
        //   number -= a;
        //   n--;
        //   values.push(parseFloat(a.toFixed(1)));
        // }
        // let index = 0;
        // let sum = 0;

        await playbackObject.playAsync();
        // settimer(Math.round(Number(time)));

        // maxTimeInSeconds

        // console.log("Playing Sound", JSON.stringify(values));

        // const InervalID = setInterval(async () => {
        //   if (progress < 1) {
        //     await setElapsedTime((t) => t + 1);

        //     sum = sum + values[index];

        //     await setProgress(sum);
        //   }
        // }, 1000);

        setTimeout(() => {
          setisplaying(false);
          const res = posts.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                isShow: false,
                progressbar: false,
              };
            } else {
              return { ...item };
            }
          });
          // setTimeout(() => {
          // console.log("Test", progress);
          // setElapsedTime(0);
          // setProgress(0);
          // clearInterval(InervalID);
          // }, 2000)
          // setProgress(0)

          // console.log(res);
          setPosts(res);
        }, Number(time) + 2000);
      } catch (err) {}
    } else {
      console.log("isplaying", isplaying);
      sound.pauseAsync();
      setisplaying(false);
      const res = posts.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isShow: false,
          };
        } else {
          return { ...item };
        }
      });
      setPosts(res);
    }
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
    alert("Post Deleted Successfully");
    const del = firebase.database().ref("user_posts/" + postid);
    del.remove();
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
                style={styles.userImgStyle}
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

            <OptionsMenu
              button={more}
              buttonStyle={{
                width: 30,
                height: 15,
                resizeMode: "contain",
                marginTop: 14,
              }}
              destructiveIndex={0}
              options={
                firebase.auth().currentUser?.uid === item.user
                  ? ["Delete", "Cancel"]
                  : ["Hide", "Report", "Cancel"]
              }
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
                      playSound(item.id, item.rec, item.time),
                        setisplaying(!isplaying);
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
                  {item.time > 5999 ? (
                    <Text style={{ color: "white" }}>
                      {`${(item.time / 1000).toFixed(0)}:0`}
                    </Text>
                  ) : (
                    <Text style={{ color: "white" }}>
                      {`0:${(item.time / 1000).toFixed(0)}`}
                    </Text>
                  )}
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
