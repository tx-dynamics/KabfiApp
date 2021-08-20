import firebase from "firebase";
import React, { useState, useEffect, useMemo, useCallback } from "react";
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
} from "react-native";
import OptionsMenu from "react-native-options-menu";
import styles from "../NewsFeed/styles";
import { Header } from "react-native-elements";
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
import HeaderCenterComponent from "../../components/HeaderCenterComponent";
import HeaderRight from "../../components/HeaderRight";
import { useIsFocused } from "@react-navigation/native";
require("firebase/database");

const savedPost = (props) => {
  const isFocused = useIsFocused();
  const [posts, setPosts] = useState(null);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(true);

  const [dataUpdated, setDataUpdated] = useState(false);
  const [show, setShow] = useState(false);
  const [uid, setUid] = useState("");
  useEffect(() => {
    fetchAllPosts();
  }, [isFocused]);

  async function fetchAllPosts() {
    setRefreshing(true);
    let arr = [];
    const uid = firebase.auth().currentUser?.uid;
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
              userSave.on("value", (lik) => {
                var myRef = firebase
                  .database()
                  .ref("comments/" + child.key)
                  .on("value", function (snapshot) {
                    if (chil.exists() && lik.key === uid) {
                      console.log("if", lik.key);
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
                        region:
                          child.val().location != ""
                            ? child.val().location
                            : null,
                      });
                    }
                  });
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
  async function playSound(id, Sound) {
    toogleLike(id);
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
              >{`\n@${item.userName} .23s`}</Text>
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
            options={["Report", "Delete"]}
            actions={[
              () => {
                alert("Reported");
              },

              () => {
                alert("Deleted");
              },
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
            onPress={() => {
              props.navigation.navigate("Main");
            }}
          >
            <Image
              source={menu}
              resizeMode={"contain"}
              style={{ marginTop: 15 }}
            />
          </TouchableWithoutFeedback>
        }
        rightComponent={<HeaderRight navigation={props.navigation} />}
        centerComponent={<HeaderCenterComponent name="Saved Post" />}
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
    </View>
  );
};
export default savedPost;
