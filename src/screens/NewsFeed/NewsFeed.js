import firebase from "firebase";
import React, { useState, useEffect, useMemo, useRef } from "react";
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
} from "react-native";
import OptionsMenu from "react-native-options-menu";
import styles from "./styles";
import { Header } from "react-native-elements";
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
const NewsFeed = (props) => {
  const [Dp, setDp] = useState("");
  const [name, setName] = useState("");
  const isFocused = useIsFocused();
  const [posts, setPosts] = useState(null);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(true);
  const [region, setRegion] = useState({});
  const [dataUpdated, setDataUpdated] = useState(false);
  const [show, setShow] = useState(false);
  const [uid, setUid] = useState("");
  const [rate, setRate] = useState("");
  const [date, setDate] = useState("");
  const refRBSheet = useRef();
  useEffect(() => {
    fetchAllPosts();
    fetchLocation();
  }, [isFocused]);
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
          const id = firebase.auth().currentUser?.uid;
          const mylocation = firebase.database().ref("locations/" + id);
          // await firebase
          //   .database()
          //   .ref("locations/" + id + "/")
          //   .set(da);
          mylocation.set(da);
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
      setDp(userdata.val()?.Dp);
      setName(userdata.val()?.firstName + " " + userdata.val()?.lastName);
      setRate(userdata.val()?.rating);
      setDate(userdata.val()?.createdAt);
    });
    fetchLocation();
    let arr = [];

    setUid(uid);
    await firebase
      .database()
      .ref("user_posts")
      .once("value")
      .then(async function (snapshot) {
        const exists = snapshot.val() !== null;
        if (exists) {
          snapshot.forEach((child) => {
            const userlike = firebase
              .database()
              .ref("user_posts/" + child.key + "/Like/" + uid);
            const userSave = firebase
              .database()
              .ref("user_posts/" + child.key + "/Save/" + uid);
            userlike.on("value", (chil) => {
              var myRef = firebase
                .database()
                .ref("comments/" + child.key)
                .on("value", function (snapshot) {
                  if (chil.exists()) {
                    //console.log("if");
                    setData({ ...data });
                    arr.push({
                      id: child.key,
                      likes_count: child.val().likes_count,
                      save_count: child.val().save_count
                        ? child.val().save_count
                        : 0,
                      post_text: child.val().post_text,
                      user: child.val().user,
                      userName: child.val().userName,
                      user_image: child.val().user_image,
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
                    });
                  } else {
                    // console.log("else", child);
                    setData({ ...data });
                    arr.push({
                      id: child.key,
                      likes_count: child.val().likes_count,
                      save_count: child.val().save_count
                        ? child.val().save_count
                        : 0,
                      post_text: child.val().post_text,
                      user: child.val().user,
                      userName: child.val().userName,
                      user_image: child.val().user_image,
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
            });
          });
          console.log("Pakkkmkmkm ", arr);
          const ik = arr.reverse();
          setPosts(ik);
        } else {
        }
      });

    setRefreshing(false);
  }

  async function likeHandler(post_id, likes_count, islike) {
    const Details = {
      likes_count: islike ? likes_count - 1 : likes_count + 1,
    };
    console.log("Like handler", islike);
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
    const data = await firebase.database().ref("user_posts/" + post_id);
    data.update(Details);
    fetchAllPosts();
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
  async function playSound(id, soundUri) {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    toogleLike(id);

    console.log("Loading Sound", soundUri);

    const { sound: playbackObject } = await Audio.Sound.createAsync(
      {
        uri: soundUri,
      },
      { shouldPlay: true }
    );
    // setSound(sound);

    console.log("Playing Sound", soundUri);
    await playbackObject.playAsync();
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
    // console.log(res);
    setPosts(res);
  }
  async function toogleLike(id) {
    console.log(id);

    const res = posts.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isShow: true,
        };
      } else {
        return { ...item };
      }
    });
    // console.log(res);
    setPosts(res);
  }
  const renderPosts = ({ item, index }) => {
    return (
      <View key={index} style={styles.cardStyle}>
        <View
          style={[
            {
              flexDirection: "row",
              justifyContent: "space-between",
              width: "95%",
              alignSelf: "center",
            },
          ]}
        >
          <View style={[{ flexDirection: "row" }]}>
            <Image
              source={item.user_image ? { uri: item.user_image } : user}
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
              <Text style={[styles.largeText, { color: "black" }]}>
                {item.userName}
              </Text>
              <Text
                style={[
                  styles.mediumText,
                  {
                    // alignSelf: 'flex-start',
                    // marginLeft: '15.5%',
                    color: "black",
                  },
                ]}
              >{`\n@${item.userName} .${moment(item.createdAt).format(
                "m:ss"
              )} s`}</Text>
            </Text>
          </View>
          <OptionsMenu
            button={more}
            buttonStyle={{
              width: 30,
              height: 15,
              resizeMode: "contain",
              marginTop: 10,
            }}
            destructiveIndex={0}
            options={["Report", "Hide", "Cancel"]}
            actions={[
              () => {
                alert("Reported");
              },

              () => {
                alert("Hide");
              },
              () => console.log("cancel"),
            ]}
          />
        </View>

        <View
          style={{ flexDirection: "row", paddingLeft: 10, paddingVertical: 20 }}
        >
          <View style={{ flex: 3 }}>
            {item.post_image ? (
              <Image
                style={{ width: 80, height: 80, alignSelf: "flex-end" }}
                source={{ uri: item.post_image }}
              />
            ) : null}
          </View>

          <View style={{ flex: 5, paddingHorizontal: 10 }}>
            <Text numberOfLines={4} style={{ textAlign: "justify" }}>
              {item.post_text}
            </Text>
          </View>
        </View>
        {item.rec ? (
          <TouchableOpacity
            onPress={() => playSound(item.id, item.rec)}
            style={{ width: "99%", alignSelf: "center" }}
          >
            {item.isShow ? (
              <Ionicons name="pause" color="black" size={30} />
            ) : (
              <Ionicons name="play" color="orange" size={30} />
            )}
          </TouchableOpacity>
        ) : null}
        <View
          style={[
            {
              flexDirection: "row",
              width: "95%",
              justifyContent: "space-between",
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
                  likeHandler(item.id, item.likes_count, item.like)
                }
              >
                {/* <Image
                source={heartImage}
                resizeMode="contain"
                style={{ height: 17, width: 17 }}
              /> */}

                <Ionicons
                  name="heart"
                  size={17}
                  color={item.like ? "red" : "black"}
                />
                <Text style={styles.smallText}>{` ${item.likes_count} `}</Text>
                {/* <Text style={styles.smallText}>{` 200 `}</Text> */}
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
                style={{ height: 17, width: 17 }}
              />
              {/* <Text style={styles.smallText}>{` ${item.likes_count} `}</Text> */}
              <Text style={styles.smallText}>{item.comm}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => saveHandler(item.id, item.save_count, item.save)}
              style={[styles.bottomContainer]}
            >
              <Image
                source={favourite}
                resizeMode="contain"
                style={{ height: 17, width: 17 }}
              />
              <Text style={styles.smallText}>{` ${item.save_count} `}</Text>
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
      <Header
        backgroundColor="white"
        containerStyle={{ marginTop: 0 }}
        leftComponent={
          <TouchableWithoutFeedback
            activeOpacity={0}
            style={{
              height: 40,
              width: 40,
              tintColor: "black",
              alignItems: "center",
            }}
            onPress={() => refRBSheet.current.open()}
            // onPress={() => {
            //   ref.open();
            //   // props.navigation.navigate("Main");
            // }}
          >
            <Image
              source={menu}
              resizeMode={"contain"}
              style={{ marginTop: 15 }}
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
        keyExtractor={(item, index) => item + index.toString()}
        showsVerticalScrollIndicator={false}
      />
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
                {/* <Image source={Dp?{uri:Dp}:user} style={styles.image} /> */}
              </View>
              <View style={styles.userInfo2}>
                <Text style={styles.userName}>{name}</Text>
                <View style={styles.userInfo2SubContainer}>
                  <Text style={styles.info2Text}>{rate}</Text>
                  <FontAwesome name="star" style={styles.star} />
                </View>
              </View>
              <View style={styles.userInfo3}>
                <Text
                  style={[styles.info3Text, { fontWeight: "500" }]}
                >{`Member since ${moment(date).format("YYYY")}`}</Text>
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

              <TouchableOpacity
                style={styles.listItem}
                onPress={() => props.navigation.navigate("savedPost")}
              >
                <Image
                  source={require("../../../assets/ProjectImages/users/profile/saved-post.png")}
                  style={styles.listIconImage}
                />
                <Text style={styles.listText}>Saved Post</Text>
              </TouchableOpacity>

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

              <TouchableOpacity style={styles.listItem}>
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
