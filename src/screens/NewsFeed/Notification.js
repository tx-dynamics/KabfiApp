import firebase from "firebase";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { ProgressBar, Colors, Snackbar } from "react-native-paper";
// import Snackbar from 'rn-snackbar-component'
import { connect } from "react-redux";

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
import { postData } from "../../Redux/Actions/Actions";
import HeaderLeftComponent from "../../components/HeaderLeftComponent";

const Notifications = (props) => {
  const [Dp, setDp] = useState("");
  const [name, setName] = useState("");
  const isFocused = useIsFocused();
  const [notis, setnotis] = useState(null);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
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
  const [messge, setMessage] = useState("");
  const [timerStart, settimerStart] = useState(false);
  const [timerReset, settimerReset] = useState(false);
  const [onstart, setonstart] = useState(false);
  const [onimage, setonimage] = useState(false);
  const [onpostimage, setpostonimage] = useState(false);
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
    setRefreshing(true);

    fetchAllNoti();
    // fetchLocation();
  }, [isFocused]);

  async function fetchAllNoti() {
    setRefreshing(true);
    const uid = firebase.auth().currentUser?.uid;
    const userNoti = firebase.database().ref("Notifications/");
    let notis = [];
    userNoti.on("value", (userdata) => {
      userdata.forEach((child) => {
        if (child.key !== uid) {
          child.forEach((data) => {
            const hideNoti = firebase
              .database()
              .ref("user_posts/" + child.key + "/" + data.key + "/Hide");

            // hideNoti.on("value", (hideId) => {
            //   console.log(hideId.key);
            //   if (hideId.val() !== firebase.auth().currentUser.uid) {
            notis.push({
              id: child.key,
              message: data.val().message,
              postid: data.key,
            });
            //   }
            // });
          });
        }
      });
    });
    // console.log("Noti Data==>", notis);
    setnotis(notis);
    setRefreshing(false);
  }

  async function hideHandler(post_id, notiId) {
    const hiderPost = firebase
      .database()
      .ref("Notifications/" + post_id + "/" + notiId + "/Hide/");
    hiderPost.set(firebase.auth()?.currentUser?.uid);
    console.log("post_id==>", post_id);
    // setRefreshing(false);
    // fetchAllPosts();
  }

  const renderPosts = ({ item, index }) => {
    return (
      <TouchableOpacity
        // onPress={() => hideHandler(item.id, item.postid)}
        key={index}
        style={{
          flex: 1,
          width: "95%",

          //   backgroundColor: "tomato",
          // elevation: 2,
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
            backgroundColor: "#FFF4E3",
            borderRadius: 20,
            width: "100%",
          }}
        >
          <AntDesign name="checkcircle" size={24} color="#FCB040" />
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
            {item.message}
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
