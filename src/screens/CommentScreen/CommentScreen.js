import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
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
const CommentScreen = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const [id, setId] = useState("");
  const [cmnt, setCmnt] = useState("");
  const [posts, setPosts] = useState(null);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
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
        <View>
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
        </View>
      </TouchableOpacity>
    );
  };
  async function postComments() {
    var user = firebase.auth()?.currentUser;
    var userData = firebase.database().ref("users/" + user?.uid);
    userData.on("value", (data) => {
      console.log("Data==>", data.val().firstName + "" + data.val().lastName);
      setImg(data.val().Dp);
      setName(data.val().firstName + "" + data.val().lastName);
      var myRef = firebase.database().ref("comments/" + id);
      var data = {
        comments: cmnt,
        name: data.val().firstName + "" + data.val().lastName,
        image: data.val().Dp,
      };
      myRef.push(data);
    });

    setCmnt("");
    setPosts([]);
    getData(id);
    console.log("here");
  }

  return (
    <View style={styles.mainContainer}>
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
          { marginBottom: 10, justifyContent: "space-between", width: "90%" },
        ]}
      >
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
          style={{ justifyContent: "center", marginLeft: 15 }}
        >
          <MaterialCommunityIcons name="send" size={32} color={"black"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CommentScreen;
