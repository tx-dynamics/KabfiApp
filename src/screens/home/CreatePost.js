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
} from "react-native";
import {
  user,
  user2,
  smallGallery,
  smallLocation,
  voiceImage,
} from "../../../assets";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";

const CreatePost = (props) => {
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [Dp, setDp] = useState("");
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const user = firebase.auth().currentUser?.uid;
    const data = firebase.database().ref("users/" + user);
    data.on("value", (userdata) => {
      {
        userdata.val()?.Dp ? setDp(userdata.val().Dp) : null;
      }
      setUserId(user);
      console.log(userdata.val());
      setUserName(userdata.val()?.firstName + " " + userdata.val()?.lastName);
    });
  }, []);

  async function savePost() {
    setloading(true);
    try {
      const post_Image = await uploadImage(postImage);

      var myRef = firebase.database().ref("user_posts").push();
      var key = myRef.getKey();
      var mylike = firebase.database().ref("likes/" + key + "/" + userId);
      let Details = {
        post_id: key,
        user: userId,
        userName: userName,
        post_image: post_Image,
        post_text: postText,
        user_image: Dp,
        likes_count: 0,
        likes_user: [],
      };
      let like = { like: 0 };
      mylike.set(like);
      myRef.set(Details);
      alert("Post Added Succsessfully");
      setloading(false);
      setPostText("");
      setPostImage("");
      setUserId(""), setUserName("");
      setDp("");
      props.navigation.navigate("NewsFeed");
    } catch (error) {
      setloading(false);
      alert(error.message);
    }
  }

  const pickPostImage = async (val) => {
    let result = "";
    // if(val === 1){
    //   result = await ImagePicker.launchCameraAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.All,
    //     aspect: [4, 3],
    //     quality: 1,
    //   });
    // }
    // else if(val === 2){
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("result", result.uri);
    // }

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

  return (
    <View style={styles.container}>
      <View style={styles.contentArea}>
        <TouchableOpacity onPress={() => props.navigation.navigate("NewsFeed")}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <View style={styles.postTextContainer}>
          <Image style={styles.userImage} source={Dp ? { uri: Dp } : user2} />
          <TextInput
            multiline={true}
            numberOfLines={14}
            onChangeText={(e) => setPostText(e)}
            value={postText}
            style={styles.textArea}
            placeholder="What's happening ?"
          />
          <TouchableOpacity style={styles.publish} onPress={savePost}>
            {loading ? (
              <ActivityIndicator color={"red"} size={"small"} />
            ) : (
              <Text>Publish</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mediaContainerOuter}>
        <View style={styles.mediaContainerInner}>
          <TouchableOpacity>
            <Image source={voiceImage} style={styles.media} />
          </TouchableOpacity>

          <TouchableOpacity onPress={pickPostImage}>
            <Image
              source={postImage ? { uri: postImage } : smallGallery}
              style={styles.media}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => props.navigation.navigate("Map")}>
            <Image
              source={smallLocation}
              style={[styles.media, { height: 24 }]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  contentArea: {
    marginTop: "15%",
    paddingHorizontal: 30,
  },
  cancelText: {
    color: "#FCB040",
    fontSize: 13,
  },
  postTextContainer: {
    marginTop: 80,
  },
  userImage: {
    width: 60,
    height: 60,
    position: "absolute",
    top: -40,
    zIndex: 1,
    borderRadius: 50,
  },
  textArea: {
    backgroundColor: "#FBFBFB",
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    padding: 30,
    textAlignVertical: "top",
  },
  publish: {
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
  },
  mediaContainerOuter: {
    marginTop: 20,
    backgroundColor: "#FBFBFB",
    alignItems: "center",
    padding: 20,
  },
  mediaContainerInner: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  media: {
    width: 18,
    height: 18,
  },
});

export default CreatePost;
