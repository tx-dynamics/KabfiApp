import firebase from "firebase";
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,AsyncStorage
} from "react-native";
import styles from "./styles";
import { Header, Card } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import HeaderCenterComponent from "../../components/HeaderCenterComponent";
import { useIsFocused } from "@react-navigation/native";
require("firebase/database");
import {
  user,
} from "../../../assets";
import HeaderLeftComponent from "../../components/HeaderLeftComponent";
import moment from "moment";

const Notifications = (props) => {
  const [Dp, setDp] = useState("");
  const isFocused = useIsFocused();
  const [notis, setnotis] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    fetchAllNoti();
    // fetchLocation();
  }, [isFocused]);

  async function fetchAllNoti() {
    setRefreshing(true);
    const uid = firebase.auth().currentUser?.uid;
    // const userNoti = firebase.database().ref("Notifications/");
    // let notis = [];
    // userNoti.on("value", (userdata) => {
    //   userdata.forEach((child) => {
    //     if (child.key !== uid) {
         
    //       child.forEach((data) => {
    //         const hideNoti = firebase
    //           .database()
    //           .ref(
    //             "users/" +
    //               firebase.auth().currentUser?.uid +
    //               "/hide/" +
    //               data.key
    //           );
    //           const userImages = firebase
    //           .database()
    //           .ref("users/" + data.val()?.userId);
    //       userImages.on("value", (updateImage) => {
    //         hideNoti.on("value", (hideId) => {
    //           // console.log("users=>", hideId.exists());
    //           //   console.log(hideId.key);
    //           if (!hideId.exists()) {
               
    //             notis.push({
    //               id: child.key,
    //               image: updateImage.val()?.Dp
    //               ? updateImage.val()?.Dp
    //               : data.val().image,
    //               message: data.val().message,
    //               name: updateImage.val()?.firstName &&
    //               updateImage.val()?.lastName
    //                 ? updateImage.val()?.firstName +
    //                   " " +
    //                   updateImage.val().lastName
    //                 : data.val().name,
    //               postid: data.key,
    //               //time:moment(data?.val()?.createdAt)- new Date().getTime()
    //               time:data?.val()?.createdAt
    //             });
    //           }
    //         });
    //       });
    //     });
    //     }
    //   });
    // });
      let arr=[];
    var notification = firebase
      .database()
      .ref("Likes/" + 'Bn8oaO2e1DgjcvuadtOhwrb1qLt1/');
      notification.on('value',(child)=>{
        child.forEach(item=>{
          const userImages = firebase
          .database()
          .ref("users/" + item.val().userId);
          userImages.on("value", updateImage => {
          arr.push({
            id: item.key,
            image: updateImage.val()?.Dp
            ? updateImage.val().Dp
            : item.val().image,
            message: item.val().message,
            name: updateImage.val()?.firstName &&
            updateImage.val()?.lastName
              ? updateImage.val()?.firstName +
                " " +
                updateImage.val().lastName
              : item.val().name,
              time:moment( updateImage?.val()?.createdAt).toDate()
          });
        });
        })
      })
    // Array.prototype.push.apply(arr,notis);
    AsyncStorage.setItem('num',JSON.stringify( arr.length));
    setnotis(arr);
    console.log("Noti Data==>", arr);
    setRefreshing(false);
  }

  async function hideHandler(post_id) {
    const hiderPost = firebase
      .database()
      .ref("users/" + firebase.auth().currentUser?.uid + "/hide/" + post_id);
    const data = { id: post_id };
    hiderPost.push(post_id);
    console.log("post_id==>", post_id);
    // setRefreshing(true);
    fetchAllNoti();
  }

  const renderPosts = ({ item, index }) => {
    return (
      <TouchableOpacity
      disabled={item?.postid?false:true}
        onPress={() => hideHandler(item.postid)}
        key={index}
        style={{
          flex: 1,
          width: "95%",
          borderRadius: 10,
          alignSelf: "center",
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            borderRadius: 20,
            width: "100%",
          }}
        >
          <Image
            source={item.image?{uri:item.image}:user}
            style={{width:50,height:50,borderRadius:70}}
          />
          <Text
            style={{
              color: "black",
              alignSelf: "center",
              left: 11,
              fontSize: 16,
              fontWeight: "600",
              color: "grey",
              width: 300,
            }}
          >
            <Text style={{color:'black',fontSize:16,fontWeight:'500'}}>@{item.name} </Text>
            {`${item.message}`}
            <Text style={{color:'black',fontSize:16,fontWeight:'500'}}>
            {` ${moment(item.time).fromNow()}`}
          </Text> 
          </Text>
         
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      <Header
        backgroundColor="white"
        containerStyle={{ marginTop: 0 }}
        leftComponent={
          <HeaderLeftComponent icon="back" navigation={props.navigation} />
        }
        centerComponent={<HeaderCenterComponent name="Notifications" />}
      />

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchAllNoti} />
        }
        data={notis}
        renderItem={renderPosts}
        extraData={selectedId}
        keyExtractor={(item, index) => item + index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
export default Notifications;
