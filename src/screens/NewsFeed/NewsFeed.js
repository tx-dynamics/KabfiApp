import firebase from "firebase";
import React, { useState, useEffect } from "react";
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
} from "react-native";
import OptionsMenu from "react-native-options-menu";
import styles from "./styles";
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
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderCenterComponent from "../../components/HeaderCenterComponent";
import HeaderRight from "../../components/HeaderRight";
import HeaderLeftComponent from "../../components/HeaderLeftComponent";
import Main from "../home/Main";
import openMap from "react-native-open-maps";

require("firebase/database");
const NewsFeed = (props) => {
  const [posts, setPosts] = useState(null);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    // setDataUpdated(!dataUpdated);

    fetchAllPosts();
  }, []);
  async function fetchAllPosts() {
    let arr = [];
    const userPost = await firebase.database().ref("user_posts");

    userPost.on("value", async (allPosts) => {
      allPosts.forEach((child) => {
        arr.push({
          id: child.key,
          likes_count: child.val().likes_count,
          post_text: child.val().post_text,
          user: child.val().user,
          userName: child.val().userName,
          user_image: child.val().user_image,
          post_image: child.val().post_image,
        });
      });
      console.log(arr);
      setPosts(arr);
    });
  }

  async function likeHandler(post_id, likes_count) {
    console.log("LIKES_count", post_id);

    const data = await firebase.database().ref("user_posts/" + post_id);

    let Details = {
      likes_count: parseInt(likes_count) + 1,
    };
    console.log("like 2 = " + (parseInt(likes_count) + 1));
    data.update(Details);
    fetchAllPosts();

    // setDataUpdated(!dataUpdated);
    // alert('done = ' + dataUpdated);
    // fetchAllPosts();
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
            <Image
              style={{ width: 80, height: 80, alignSelf: "flex-end" }}
              source={{ uri: item.post_image }}
            />
          </View>

          <View style={{ flex: 5, paddingHorizontal: 10 }}>
            <Text style={{ textAlign: "justify" }}>{item.post_text}</Text>
          </View>

          {item.longitude ? (
            <TouchableOpacity
              style={{
                flex: 2,
                alignSelf: "flex-end",
                alignItems: "center",
                zIndex: 1,
              }}
              onPress={() =>
                props.navigation.push("Map", {
                  latitude: item.latitude,
                  longitude: item.longitude,
                  markers: item.markers,
                })
              }
            >
              {/* <EvilIcons name="location" size={40} /> */}
              <Image source={locationImage} style={{ width: 20, height: 28 }} />
              <Text style={{ fontSize: 14 }}>Location</Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{ flex: 2, alignSelf: "flex-end", alignItems: "center" }}
            ></View>
          )}
        </View>

        <View
          style={[
            {
              flexDirection: "row",
              width: "80%",
              justifyContent: "space-between",
            },
          ]}
        >
          <View style={[styles.bottomContainer]}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => likeHandler(item.id, item.likes_count)}
            >
              <Image
                source={heartImage}
                resizeMode="contain"
                style={{ height: 17, width: 17 }}
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
            <Text style={styles.smallText}>{` 300 `}</Text>
          </TouchableOpacity>

          <View style={[styles.bottomContainer]}>
            <Image
              source={favourite}
              resizeMode="contain"
              style={{ height: 17, width: 17 }}
            />
            <Text style={styles.smallText}>{` 300 `}</Text>
          </View>
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
              style={{marginTop:15}}
            />
          </TouchableWithoutFeedback>
        }
        rightComponent={<HeaderRight navigation={props.navigation} />}
        centerComponent={<HeaderCenterComponent name="News Feed" />}
      />
      
        <FlatList
          data={posts}
          renderItem={renderPosts}
          keyExtractor={(item, index) => item + index.toString()}
          showsVerticalScrollIndicator={false}
        />
      
    </View>
  );
};
export default NewsFeed;
