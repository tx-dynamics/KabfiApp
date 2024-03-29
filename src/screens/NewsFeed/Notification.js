import firebase from "firebase";
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,AsyncStorage,ImageBackground
} from "react-native";
import styles from "./styles";
import { Header, Card } from "react-native-elements";
import AntDesign from "react-native-vector-icons/AntDesign";
import HeaderCenterComponent from "../../components/HeaderCenterComponent";
import { useIsFocused } from "@react-navigation/native";
require("firebase/database");
import {
  user,pst,bar
} from "../../../assets";
import HeaderLeftComponent from "../../components/HeaderLeftComponent";
import moment from "moment";
import { connect } from "react-redux";
import ActionButton from 'react-native-action-button';
const Notifications = (props) => {
  const [Dp, setDp] = useState("");
  const isFocused = useIsFocused();
  const [notis, setnotis] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    let data= JSON.parse(props.userInfo)
   
    fetchAllNoti();
    
    
    // fetchLocation();
  }, [isFocused]);

  async function fetchAllNoti() {
    setRefreshing(true);
    let data= JSON.parse(props.userInfo)
    let userName = firebase.database().ref("users/" + data.id);
    userName.update({notiNot:false})   
    // const uid = firebase.auth().currentUser?.uid;
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
      .ref("Likes/" + data.id)
      .orderByChild('createdAt'); 
      //.ref("Likes/" + uid);
      console.log(notification)
      notification.on('value',(child)=>{
        //console.log(child)
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
              time:item?.val()?.createdAt
          });
        });
        })
      })
    // Array.prototype.push.apply(arr,notis);
   // AsyncStorage.setItem('num',JSON.stringify( arr[0].time));
    setnotis(arr.reverse());
    //console.log("Noti Data==>", arr[0]);
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
    //console.log(item.time)
    return (
      <TouchableOpacity
      disabled={item?.postid?false:true}
        onPress={() => hideHandler(item.postid)}
        key={index}
        style={{
          flex: 1,
          width: "90%",
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
              //textAlign:'center',
              alignSelf: "center",
              left: 11,
              fontSize: 16,
              fontWeight: "600",
              color: "grey",
              width: '80%',
            }}
          >
            <Text style={{color:'black',fontSize:16,fontWeight:'500'}}>@{item.name} </Text>
            {`${item.message}`}
            <Text style={{color:'black',fontSize:16,fontWeight:'500'}}>
            {` ${moment(item.time).fromNow() }`}
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
       <ActionButton buttonColor="transparent" position="right" offsetY={30}
   renderIcon={active => (
    <ImageBackground
    source={bar} resizeMode={"contain"}
    style={{
    height: 50,
    width: 50,
}}
></ImageBackground>
  )}
  >
              
                <ActionButton.Item buttonColor="transparent"
                    size={34}
                    // title="Book Resource"
                    onPress={() => props.navigation.navigate("CreatePost")}>
                    <ImageBackground
                    source={pst} resizeMode={"contain"}
                    style={{
                    height: 50,
                    width: 50,top:2
          }}
        ></ImageBackground>
                </ActionButton.Item>
            </ActionButton>
    </View>
  );
};
const mapStateToProps = (state) => {
  const { userInfo } = state.AuthReducer;
  //console.log("OK REDUX TESTING")
  return { userInfo };
};
 export default connect(mapStateToProps)(Notifications)

