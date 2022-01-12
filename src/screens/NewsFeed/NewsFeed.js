import firebase from "firebase";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { ProgressBar, Colors, Snackbar } from "react-native-paper";
// import Snackbar from 'rn-snackbar-component'
import NetInfo from "@react-native-community/netinfo";
import * as Font from 'expo-font';
import { RequestPushMsg } from "../../components/RequestPushMsg";
import {
  View,
  Text,
  StyleSheet,
  Platform,
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
  Share,
  ActivityIndicator,
  Slider,
  ImageBackground,
  Keyboard,
} from "react-native";
import OptionsMenu from "react-native-options-menu";
import styles from "./styles";
import { Header, Card } from "react-native-elements";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  user,gmap,
  more,
  postImage,
  reload,
  comments,
  favourite,
  heartImage,
  locationImage,
  drawer,
  hearth,
  heartf,
  loc,
  menu,
  bars,
  noti,
  bar,b10,b20,b30,brst,pst,
  
} from "../../../assets";
import { Audio } from "expo-av";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import HeaderCenterComponent from "../../components/HeaderCenterComponent";
import HeaderRight from "../../components/HeaderRight";
import { useIsFocused } from "@react-navigation/native";
require("firebase/database");
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import moment from "moment";
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import CountDown from "react-native-countdown-component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActionButton from 'react-native-action-button';
import createOpenLink from 'react-native-open-maps';
const NewsFeed = (props) => {
  const [Dp, setDp] = useState("");
  const [name, setName] = useState("");
  const isFocused = useIsFocused();
  const [posts, setPosts] = useState(null);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [show, setShow] = useState(false);
  const [uid, setUid] = useState("");
  const [date, setDate] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [refreshingModal, setRefreshingModal] = useState(true);
  const [largImage, setLargeImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [fontsLoaded, setfontsLoaded] = useState(false);
  const [sound, setsound] = useState();
  const refRBSheet = useRef();
  const [isplaying, setisplaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messge, setMessage] = useState("");
  const [timerStart, settimerStart] = useState(false);
  const [timerReset, settimerReset] = useState(false);
  const [onimage, setonimage] = useState(false);
  const [maxTimeInSeconds, setMaxTimeInSeconds] = useState([]);
  const[nots,setnots]=useState();
  const[modeltxt,setmodeltxt]=useState();
  const[modeltime,setmodeltime]=useState();
  const[modelUsername,setmodelUsername]=useState();
  const[modeluserImage,setmodeluserImage]=useState();
  const [burstModel, setburstModel] = useState(false);
  const[burstvalue,setburstvalue]=useState('10+');
  const [loading, setloading] = useState(false);
  const [mapModal, setmapModal] = useState(false);
  const[lat,setlat]=useState();
  const[long,setlong]=useState();
  const[Blat,setBlat]=useState();
  const[Blong,setBlong]=useState();
  useEffect(() => {
    setRefreshing(true);
    // loadFonts();
  (  async function(){
      const data=  await AsyncStorage.getItem('posts');
      const dat=JSON.parse(data);
      console.log('posts===>',dat);
      if(dat!==null)
      {
        setPosts(dat);
      }
      });
    var screen = props?.route?.params?.screen
    var created = props?.route?.params?.created
    const id =  firebase.auth().currentUser?.uid;
    setburstvalue('');
        console.log("I ma testing LOC",id)
    if(screen ==='post'){
      if(created != undefined){
          setMessage(created);
          setIsVisible(!isVisible);
         props.navigation.setParams({screen: '', created: ''});
      }
    }
   fetchAllPosts();
    fetchAllNoti();
   fetchLocation();
   ()=>{
    Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
   }
   setRefreshing(false);
  }, [isFocused]);
 
  async function fetchAllNoti() {
    const uid = firebase.auth().currentUser?.uid;
    const userNoti = firebase.database().ref("Notifications/");
    let notis = [];
    userNoti.on("value", (userdata) => {
      userdata.forEach((child) => {
        if (child.key !== uid) {
          child.forEach((data) => {
            const hideNoti = firebase
              .database()
              .ref(
                "users/" +
                  firebase.auth().currentUser?.uid +
                  "/hide/" +
                  data.key
              );

            hideNoti.on("value", (hideId) => {
              // console.log("users=>", hideId.exists());
              //   console.log(hideId.key);
              if (!hideId.exists()) {
               
                notis.push({
                  id: child.key,
                  image: data.val().image,
                  message: data.val().message,
                  name: data.val().name,
                  postid: data.key,
                  //time:moment(data?.val()?.createdAt)- new Date().getTime()
                  time:data?.val()?.createdAt
                });
              }
            });
          });
        }
      });
    });
      let arr=[];
    var notification = firebase
      .database()
      .ref("Likes/" + uid);
      notification.on('value',(child)=>{
        child.forEach(item=>{
          arr.push({
            id: item.key,
            image: item.val().image,
            message: item.val().message,
            name: item.val().name,
          });
        })
      })
    // Array.prototype.push.apply(arr,notis);
    
    const num=await AsyncStorage.getItem('num');
    console.log(num,'\n',arr.length);
    if(Number (num)>0){
      // alert('here')
      setnots(arr.length-Number(num));
    }
  }
  const _keyboardDidHide = () => {
    console.log("Keyboard Hidden");
  };
  function CheckConnectivity  ()  {
    // For Android devices
    NetInfo.fetch().then((state) => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected,state.isInternetReachable);
      //if (Platform.OS === "android") {
        if (state.isConnected) {
        } else {
          setRefreshing(false);
          setMessage('Network error has occurred');
          setIsVisible(!isVisible)

        }
      
    });
  };

  async function  loadFonts() {
     Font.useFonts({
      // Load a font `Montserrat` from a static resource
      // Montserrat: require('./assets/fonts/Montserrat.ttf'),FontsFree-Net-SFProText-Regular

      // Any string can be used as the fontFamily name. Here we use an object to provide more control
      'Sf-pro-display': {
        uri: require('../../../assets/sf-pro-display-cufonfonts/SF-Pro-Display-Light.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
      'Sf-pro-display-bold': {
        uri: require('../../../assets/sf-pro-display-cufonfonts/SF-Pro-Display-Bold.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
      'Sf-pro-display-medium': {
        uri: require('../../../assets/sf-pro-display-cufonfonts/SF-Pro-Display-Medium.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
      'FontsFree-Net-SFProText-Regular': {
        uri: require('../../../assets/sf-pro-display-cufonfonts/FontsFree-Net-SFProText-Regular.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
    });
    setfontsLoaded(true)
  }

  async function imageloaderStart(id) {
    // setonstart(true)

    const res = posts.map((item) => {
      if (item.id === id) {
        // console.log('Item-image==>',item.loadimage)
        return {
          ...item,
          loadimage: true,
        };
      } else {
        return {
          ...item,
          // loadimage: false,
        };
      }
    });

    setPosts(res);
  }

  async function imageloaderEnd(id) {
    const res = posts.map((item) => {
      if (item.id === id) {
        // console.log('Item-image==>',item.loadimage)
        return {
          ...item,
          loadimage: false,
        };
      } else {
        return {
          ...item,
          // loadimage: false,
        };
      }
    });

    setPosts(res);
  }

  async function postimageloader(id) {
    const res = posts.map((item) => {
      if (item.id === id) {
        console.log("Item-image==>", item.loadpostimage);
        return {
          ...item,
          loadpostimage: !item.loadpostimage,
        };
      } else {
        return {
          ...item,
          // loadimage: false,
        };
      }
    });

    setPosts(res);
  }

  async function handleTimerComplete(index, time) {
    //posts[index].time= time
    //fetchAllPosts()
    settimerReset(false);
    settimerStart(false);
    // alert("custom completion function");
  }

  const openLocalMap = () => {
    setmapModal(false)  
    createOpenLink({ latitude: Blat, longitude: Blong});
    // console.log("OKKKKKKKKK",Blat,Blong)
    // var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    // var url = scheme + `${Blat},${Blong}`;
    // Linking.openURL(url);
  }

  const openGoogleMap= ()=>{
    setmapModal(false)  
    let ways = '';
  let currentLocation= ''
    ways = ways + Blat + ',' + Blong;
    currentLocation= currentLocation+lat+ ','+long
    console.log(ways,currentLocation)
    let url =
    'https://www.google.com/maps/dir/?api=1&origin=' +
    currentLocation +
    '&destination=' +
    ways
  
    Linking.canOpenURL(url)
    .then(supported => {
        if (!supported) {
            console.warn("Can't handle url: " + url);
        } else {
            return Linking.openURL(url);
        }
    })
    .catch(err => console.warn('An error occurred', err));
   
  }
  const openGps = async (lat1, lng1)=>{
    setBlat(lat1)
    setBlong(lng1)
    setmapModal(true)
  
  }
  async function fetchLocation() {
    setRefreshing(true);
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        setMessage("Permission to access location was denied");
        setIsVisible(!isVisible);
        // alert("Permission to access location was denied");
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
        setlat(location?.coords?.latitude);
        setlong(location?.coords?.longitude);
        if (location) {
          try {
            
            const id =  firebase.auth().currentUser?.uid;
            console.log("I ma testing LOC",location)

            if(id){
            const mylocation = 
            firebase.database().
            ref("locations/" + 
            id);
            mylocation.set(da);
            }
          } catch (err) {
            setRefreshing(false);
            
          }
        }
        setRefreshing(false);
      }
    } catch (err) {
      setRefreshing(false);
      setMessage(err.message);
      setIsVisible(!isVisible);
      //  alert(err.message);
    }
  }
  async function savePost() {
    try {
      
        if ( lat&&long) {
          // setRefreshing(true);
          try {
           
        const id =  firebase.auth().currentUser?.uid;
        
        setburstModel(false);
        var myRef = firebase.database().ref("user_posts").push();
        var key = myRef.getKey();
        let Details = {
          post_id: key,
          user: firebase.auth().currentUser.uid,
          userName: name,
          user_image: Dp,
          likes_count: 0,
          likes_user: [],
          latitude: lat,
          longitude: long,
          burstvalue,
          createdAt: new Date().toISOString(),
          
        };
        myRef.set(Details);
        setloading(false);
        setburstModel(false);
        setburstvalue('');
      //   setMessage('Brust Added Succesfully');
      // setIsVisible(!isVisible);
        return;
          } catch (error) {
            console.log("error.message", error.message);
            setloading(false);
      setMessage(error.message);
      setIsVisible(!isVisible);
      setModalVisible(false);
      setburstModel(false);
      setburstvalue('');setRefreshing(false);
          }
        }else{
          setloading(false);
          setMessage('Turn on location to add brust.');
          setIsVisible(!isVisible);
          setModalVisible(false);
          setburstModel(false);
          setburstvalue('');
          setRefreshing(false);setRefreshing(false);
        }
      
    
    } catch (error) {
      setloading(false);setRefreshing(false);
      setMessage(error.message);
      setIsVisible(!isVisible);
      setModalVisible(false);
      setburstModel(false);
      setburstvalue('');
      setRefreshing(false);
      // alert(error.message);
    }
  }
  async function fetchAllPosts() {
    setRefreshing(true);
    CheckConnectivity();
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
   firebase
      .database()
      .ref("user_posts").orderByChild("createdAt")
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
              .ref("user_posts/" + child.key + "/Hide");
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

                        if (ishide.val() !== firebase.auth().currentUser.uid) {
                          setData({ ...data });
                          arr.push({
                            id: child.key,
                            likes_count: child.val()?.likes_count,
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
                            loadimage: false,
                            loadpostimage: false,
                            latitude: child.val()?.latitude,
                            longitude: child.val()?.longitude,
                            burstvalue:child.val()?.burstvalue,
                          });
                        } else {
                          return;
                        }
                      });
                    } else {
                      hideuser.on("value", (ishide) => {

                        if (ishide.val() !== firebase.auth().currentUser.uid) {
                          setData({ ...data });
                          arr.push({
                            id: child.key,
                            time: child.val().time,
                            likes_count: child.val()?.likes_count,
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
                            loadimage: false,
                            loadpostimage: false, latitude: child.val()?.latitude,
                            longitude: child.val()?.longitude,
                            burstvalue:child.val()?.burstvalue,
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
    AsyncStorage.setItem('posts',JSON.stringify (ik));
    setPosts(ik);
    console.log("posts", arr.length);
    setRefreshing(false);
    // imageloader()
  }

  async function likeHandler(post_id,post_user, likes_count, islike, index) {
    console.log('Notifications check',islike)
    let userName = firebase.database().ref("users/" + post_user);
    let arr = '';
    //getting user push notification token
    userName.on("value", (userdata) => {
      if (
            userdata.val()?.isEnabled === true &&
            userdata.key !== user &&
            userdata?.val()?.isLogin
          ) {
           arr=userdata.val()?.pushToken;
           console.log(arr);
          }
          else{
            console.log('Notifications else',userdata.val()?.isEnabled,userdata?.val()?.isLogin)
            console.log(arr)
          }
    });
    if(!islike){
      var notification = firebase
      .database()
      .ref("Likes/" + post_user);
      let addNoti = {
        image:Dp,
        name:name,
        message: `liked your post. `,
        createdAt:new Date().toLocaleString(),
        userId:firebase.auth()?.currentUser?.uid
      };
      console.log(arr,'\n','Name',name);
      if(uid != post_user && arr!==''){
      notification.push(addNoti);
      RequestPushMsg(arr, name, 'liked your post.','liked your post.')
    }
    }
    const Details = {
      likes_count: islike ? likes_count - 1 : likes_count + 1,
    };
    posts[index].likes_count = Details.likes_count;
    posts[index].like = !islike;
    setSelectedId(post_id + likes_count);
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
    setTimeout(() => {
      setMessage("This post is no longer available for you");
      setIsVisible(!isVisible);
    }, 200);

    let filtered = posts.filter((i) => {
      return post_id !== i.id;
    });

    console.log("\n", post_id);

    setPosts(filtered);

    const hiderPost = firebase
      .database()
      .ref("user_posts/" + post_id + "/Hide/");
    hiderPost.set(uid);
    setShow(false);

    console.log("post_id==>", post_id);
    // setRefreshing(false);
    // fetchAllPosts();
  }
  async function reportHandler(post_id) {
    // alert("Reported");
    setIsVisible(!isVisible);
    setMessage("Reported");
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
    }, 2000);

    // >>>>>>> 0c399b6e4f264d33f2bc88f865686658ecbcdb99
    if (!isplaying) {
      try {
        // console.log("isplaying", isplaying);
        await Audio.setAudioModeAsync({
          allowsRecordingIOS:false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          playThroughEarpieceAndroid: false,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        });
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

  async function delPost(postid) {
    console.log("calling del");
    setTimeout(() => {
      setMessage("Post Deleted Successfully");
      setIsVisible(!isVisible);
    }, 200);

    let filtered = posts.filter((i) => {
      return postid !== i.id;
    });
    // console.log("post filter", filtered, "\n", postid);
    setPosts(filtered);
    // alert("Post Deleted Successfully");

    const del = firebase.database().ref("user_posts").child(postid);
    del.remove().then(() => console.log("Post Deleted Successfully"));
  }

  const renderPosts = ({ item, index }) => {
    return (
      <View key={index} style={styles.cardStyle}>
        <View
          style={[
            {
              // backgroundColor: "orange",
              backgroundColor: "#FBFBFB",
              height:186,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
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
                marginTop: responsiveHeight(0.5),
              },
            ]}
          >
            <View style={[{ flexDirection: "row", }]}>
              <View>
                <Image
                  onLoadStart={() => imageloaderStart(item.id)}
                  onLoadEnd={() => imageloaderEnd(item.id)}
                  source={item.user_image ? { uri: item.user_image } : user}
                  style={[styles.userImgStyle, {}]}
                />
                {/* {item.loadimage ?  */}
                <ActivityIndicator
                  animating={item.loadimage}
                  // animating={onstart}
                  size="small"
                  color="orange"
                  style={{ bottom: responsiveHeight(5) }}
                />
                {/* :null
                  } */}
              </View>
              <Text
                style={[
                  styles.largeText,
                  {
                    
                    marginTop: responsiveHeight(1.2),
                    paddingLeft: 5,
                  },
                ]}
              >
                <Text style={[{
                  // fontFamily:'Sf-pro-display-bold', 
                  color: "#464646", fontWeight: "700" }]}>
                  {item.userName}
                </Text>
                <Text
                  style={[
                    styles.mediumText,
                    {
                      color: "#464646",
                      fontSize: 11,
                    },
                  ]}
                >{`\n@${item?.userName.replace(/ /g, "")}. ${moment(
                  item.createdAt
                ).format("ddd, HH:mm")}`}</Text>
              </Text>
            { item?.burstvalue&& <View>
              <Image
                  source={item?.burstvalue==='30+'?b30:item?.burstvalue==='20+'?b20:b10}
                  style={[ {height:30,width:30,top:10,left:5}]}
                  resizeMode='contain'
                />
              </View>}
            </View>
            <OptionsMenu
              button={more}
              buttonStyle={{
                width: 30,
                height: 15,
                resizeMode: "contain",
                marginTop: 14,
              }}
              destructiveIndex={
                firebase.auth().currentUser?.uid === item.user ? 0 : 1
              }
              options={
                firebase.auth().currentUser?.uid === item.user
                  ? ["Delete", "Cancel"]
                  : ["Hide", "Report", "Cancel"]
              }
              optionText={{ color: "green" }}
              actions={
                firebase.auth().currentUser?.uid === item.user
                  ? [
                      () => {
                        delPost(item.id);
                      },
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

        {item?.burstvalue?
        <TouchableOpacity
        onPress={()=>openGps(item?.latitude,item?.longitude)}
            style={{
            
            }}
          >
            <Image
                  source={gmap}
                  style={{ width: '100%', 
                  height:responsiveScreenHeight(13) }}
                  resizeMode='cover'
                />
          </TouchableOpacity>:
          <View
            style={{
              flexDirection: "row",
              paddingLeft: 10,
              // right:5,
              paddingVertical: 10,
            }}
          >
            {item.post_image ? (
              <TouchableOpacity
                onPress={() => {
                  setmodelUsername(item?.userName);
                  setmodeltime( item.createdAt);
                  setLargeImage(item.post_image);
                  setmodeltxt(item?.post_text);
                  setModalVisible(true);
                  setRefreshingModal(true);
                  setmodeluserImage(item?.user_image);
                }}
                style={{ flex: 1.2,marginLeft:responsiveWidth(1) }}
              >
                <Image
                  onLoadStart={() => postimageloader(item.id)}
                  onLoadEnd={() => postimageloader(item.id)}
                  source={{ uri: item.post_image }}
                  style={{ width: 65, height:65 }}
                />
                {/* {item.loadpostimage ? */}
                <ActivityIndicator
                  animating={item.loadpostimage}
                  size="large"
                  color="orange"
                  style={{ bottom: responsiveHeight(6) }}
                />
                {/* :null}  */}
              </TouchableOpacity>
            ) : null}
            <View
              style={
                item.post_image
                  ? {
                      flex: 5,
                      paddingLeft: responsiveHeight(1.5),
                      // marginTop: responsiveHeight(0.2),
                    }
                  : { flex: 20, marginTop: responsiveHeight(0.2) }
              }
            >
              <Text
                numberOfLines={4}
                style={{ textAlign: "left", color: "#464646", fontSize: 13 }}
              >
                {/* {item?.post_text?.length > 75 ? item?.post_text?.substring(0, 74) + "..." :
              item?.post_text} */}
                {item.post_text}
              </Text>
              {item.rec ? (
                <View
                  style={{
                    // backgroundColor: "#FCB040",
                    width: responsiveWidth(50),
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 5,
                    marginTop: 3,
                    borderRadius: 100,
                    borderWidth:1,
                    borderColor:'#EFEFEF'
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      playSound(item.id, item.rec, item.time);
                    }}
                    style={{
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                  >
                    {item.isShow ? (
                      <Ionicons name="pause" color="#979797" size={24} />
                    ) : (
                      <Ionicons name="play" color="#979797" size={24} />
                    )}
                  </TouchableOpacity>
                  <>
                    {item.isShow ? (
                      <>
                        {isplaying ? (
                          <CountDown
                            until={(parseInt(item.time) / 1000).toFixed(0)}
                            onChange={(e) => {
                              console.log(e);
                            }}
                            size={14}
                            onFinish={() => handleTimerComplete}
                            digitStyle={{
                              backgroundColor: "transparent",
                              width: responsiveWidth(5),
                            }}
                            digitTxtStyle={{ color: "#979797" }}
                            timeToShow={["M", "S"]}
                            timeLabels={{ m: "", s: "" }}
                            showSeparator
                            separatorStyle={{ color: "#979797" }}
                            // style={{ marginLeft: responsiveWidth(-2) }}
                          />
                        ) : (
                          <>
                            <ActivityIndicator size={"small"} color={"#979797"} />
                          </>
                        )}
                      </>
                    ) : (
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            color: "#979797",
                            fontSize: 14,
                            // fontWeight: "bold",
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
                            color: "#979797",
                            fontSize: 14,
                            // fontWeight: "bold",
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
                    )}
                  </>
                  <Image
                    source={bars}
                    style={{
                      tintColor:'#979797',
                      height: 30,
                      width: responsiveWidth(30),
                    }}
                    resizeMode="contain"
                  />
                </View>
              ) : null}
            </View>
          </View>}
        </View>
        <View
          style={[
            {
              flexDirection: "row",
              width: "100%",
              height:52,
              justifyContent: "space-between",
              // marginTop: responsiveHeight(1),
              backgroundColor: "#F1F1F1",
              // backgroundColor: "red",
              paddingVertical: 5,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              // backgroundColor: "tomato",
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
            <View style={[styles.bottomContainer,{left:responsiveWidth(2.5)}]}>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() =>
                  likeHandler(item.id,item.user, item?.likes_count, item.like, index)
                }
              >
                {item.like?
                  <Image
                    source={heartf}
                    style={{width:18,height:16,alignSelf:'center'}}
                  />
                  :
                  <Image
                    source={hearth}
                    style={{width:18,height:16,alignSelf:'center'}}
                  />
                }
                <Text style={styles.smallText}>{` ${item?.likes_count} `}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.bottomContainer, { right: 10 }]}
              onPress={() =>
                props.navigation.navigate("CommentScreen", { id: item.id,owner_id:item.user })
              }
            >
              <Image
                source={comments}
                resizeMode="contain"
                style={{ height: 18, width: 18, alignSelf: "center" }}
              />

              <Text style={styles.smallText}>{item.comm}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={true}
              onPress={() => saveHandler(item.id, item.save_count, item.save)}
              style={[styles.bottomContainer]}
            ></TouchableOpacity>
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
  const onShare = async () => {
   
    try {
      const result = await Share.share({
        message: modeltxt,
        url:largImage,
        title:modeltxt
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={[styles.main,{opacity:burstModel||modalVisible|| mapModal?0.4:1}]}>
      <Modal
        style={{ justifyContent: 'flex-end', margin: 0 }}
        animationType="slide"
        transparent={true}
        visible={mapModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setmapModal(!mapModal);
        }}>
        <View style={styles.centeredViewUp}>
          <View style={styles.modalViewUp}>
          <TouchableOpacity
              style={[styles.buttonUp,{marginBottom:responsiveHeight(0),borderBottomLeftRadius:0,borderBottomRightRadius:0}]}
              onPress={() => 
              setmapModal(!mapModal),
              openLocalMap
              
              }>
              <Text style={styles.textStyleUp}>Maps</Text>
            </TouchableOpacity>
          <TouchableOpacity
              style={[styles.buttonUp,{marginBottom:responsiveHeight(1.5),borderTopLeftRadius:0,borderTopRightRadius:0,}]}
              onPress={() => setmapModal(!mapModal),openGoogleMap}>
              <Text style={styles.textStyleUp}>Google Maps</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonUp]}
              onPress={() => setmapModal(!mapModal)}>
              <Text style={styles.textStyleUp}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setMessage("Modal has been closed.");
          setIsVisible(!isVisible);
          // Alert.alert("Modal has been closed.");
        }}
      >
        <View style={{width:'100%',alignSelf:'center',justifyContent:'center',
        flex:1}}>
        <View style={{flexDirection:'row',width:'70%',
        justifyContent:'flex-end',alignSelf:'center'}}>
        <TouchableOpacity style={{marginRight:10}} onPress={onShare}>
      <Feather name='share' size={30} color={'black'} />
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => {
                setModalVisible(!modalVisible);
              }}>
        <Entypo name='cross' size={30} color={'black'} />
        </TouchableOpacity>
        </View>
          <View style={{
                  backgroundColor:'white',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    elevation: 5,
    width: '70%',borderRadius:20,alignSelf:'center',
    height:responsiveScreenHeight (30),
    
    }}>
      
            <Image
              style={{ width:"100%",height:'100%'}}
              source={{ uri: largImage }}
              // resizeMode=''
            />
             <View style={[{ flexDirection: "row",backgroundColor:'white',width:'100%',
             borderBottomRightRadius:20,borderBottomLeftRadius:20}]}>
                <Image
                  source={modeluserImage ? { uri: modeluserImage } : user}
                  style={ {
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    margin: 5,
                  //  bottom:10
                  }}
                />
              <View>
              <Text
                style={[
                  {
                    marginTop: responsiveHeight(1.2),
                  },
                ]}
              >
               
                <Text style={[{fontFamily:'Sf-pro-display-bold', color: "#464646", fontWeight: "700" }]}>
                  {modelUsername}
                </Text>
                <Text
                  style={[
                    styles.mediumText,
                    {
                      color: "#464646",
                      fontSize: 11,
                    },
                  ]}
                >{`\n@${modelUsername}. ${moment(
                  modeltime
                ).format("ddd, HH:mm")}`}</Text>
              </Text>
              <Text
                numberOfLines={2}
                style={{ textAlign: "left", color: "#464646", fontSize: 13,marginTop:responsiveHeight(2),marginBottom:responsiveHeight(2)

              }}
              >
                {modeltxt}
              </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={burstModel}
        onRequestClose={() => {
          setMessage("Modal has been closed.");
          setIsVisible(!isVisible);
          // Alert.alert("Modal has been closed.");
        }}
      >
        <View style={{width:'100%',
        alignSelf:'center',
        justifyContent:'center',
        flex:1,
        // backgroundColor:'lightgrey',
        opacity:1
        }}>
        <TouchableOpacity
        style={{
         
            alignItems: 'flex-end',
            width: '77%',borderRadius:30,alignSelf:'center',
}}
        onPress={() => {
                setburstModel(false);
              }}>
        <Entypo name='cross' size={30} color={'black'} />
        </TouchableOpacity>
          <View style={{
                  backgroundColor:'lightgrey',
                    alignItems: "center",
                    width: '80%',borderRadius:30,alignSelf:'center',
                    height:responsiveScreenHeight (40),
    }}>
      <View style={{backgroundColor:'white',height:'80%',width:'100%',borderTopLeftRadius:30,borderTopRightRadius:30}}>
        <View style={{marginTop:responsiveScreenHeight(3),alignSelf:'center'}}>
        <Text style={{fontSize:18,fontWeight:'bold'}}>Demand indicator</Text>
        </View>
        <TouchableOpacity
        onPress={()=>setburstvalue('10+')}
        style={{marginTop:responsiveScreenHeight(3),
        alignSelf:'center',width:'80%',
        backgroundColor:burstvalue==='10+'?'lightgreen':'lightgrey',
        paddingVertical:10,borderRadius:20
        }}>
        <Text style={{fontSize:18,fontWeight:'bold',textAlign:'center'}}>10+</Text>
        </TouchableOpacity>
        <TouchableOpacity
         onPress={()=>setburstvalue('20+')}
        style={{marginTop:responsiveScreenHeight(3),
        alignSelf:'center',width:'80%',
        backgroundColor:burstvalue==='20+'?'skyblue':'lightgrey',
        paddingVertical:10,borderRadius:20
        }}>
        <Text style={{fontSize:18,fontWeight:'bold',textAlign:'center'}}>20+</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>{setburstvalue('30+'),console.log(burstvalue)}}
        style={{marginTop:responsiveScreenHeight(3),
        alignSelf:'center',width:'80%',
        backgroundColor:burstvalue==='30+'?'pink':'lightgrey',
        paddingVertical:10,borderRadius:20
        }}>
        <Text style={{fontSize:18,fontWeight:'bold',textAlign:'center'}}>30+</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity
        disabled={burstvalue===''?true:false}
         onPress={()=>{savePost(),setburstModel(false)}}
        style={{marginTop:responsiveScreenHeight(3),
        alignSelf:'center',
        width:'80%',
        backgroundColor:'lightgrey',
        //paddingVertical:10,
        justifyContent:'center',
        // borderBottomLeftRadius:20
        }}>
          {loading ? (
                <ActivityIndicator animating color={"red"} size={'large'} style={{bottom:10}}/>
              ) : (
        <Text style={{fontSize:18,fontWeight:'bold',textAlign:'center'}}>BURST IT</Text>)}
        </TouchableOpacity>
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
              source={drawer}
              resizeMode={"contain"}
              style={{height: 25, width: 25 }}
            />
          </TouchableWithoutFeedback>
        }
        rightComponent={
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Notifications")}
            style={{ alignItems: "center" }}
          >
            <ImageBackground
              source={noti}
              resizeMode={"contain"}
              style={{
                height: 25,
                width: 25,
                alignItems: "flex-end",
              }}
            >
             {nots>0&& <Text style={{height:10,width:10,borderRadius:5,backgroundColor:'tomato'}}></Text>}
            </ImageBackground>
          </TouchableOpacity>
        }
        // centerComponent={<HeaderCenterComponent name="News Feed" />}
        centerComponent={<View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 17,
    color: "#000000",
    fontWeight: "700",
    alignSelf: "center",
    // fontFamily:'FontsFree-Net-SFProText-Regular'
  }}>News Feed</Text>
      </View>}
      />
      {isVisible ? (
        <View style={{ height: 60 }}>
          <Snackbar
            style={{
              backgroundColor: "#FFF4E3",
              marginLeft: 8,
              marginRight: 8,
              marginTop: 8,
              borderRadius: 30,
            }}
            visible={isVisible}
            // action={{ label: "ok" }}
            onDismiss={() => setIsVisible(!isVisible)}
            duration={1800}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: "auto",
              }}
            >
              <AntDesign name="checkcircle" size={24} color="#FCB040" />
              <Text
                style={{
                  color: "black",
                  alignSelf: "center",
                  left: 8,
                  fontSize: 14,
                  fontWeight: "600",
                  color: "grey",
                  width: 300,
                }}
              >
                {messge}
              </Text>
            </View>
          </Snackbar>
        </View>
      ) : (
        <></>
      )}
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
  
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={Dimensions.get("window").height / 1.3}
        customStyles={{
          draggableIcon:{
            // width:'100%'
          },
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
               {Dp ? <Image
                  onLoadStart={() => setonimage(true)}
                  onLoadEnd={() => setonimage(false)}
                  source={Dp ? { uri: Dp } : user}
                  style={styles.smallImage}
                />: <Image
                onLoadStart={() => setonimage(true)}
                onLoadEnd={() => setonimage(false)}
                source={Dp ? { uri: Dp } : user}
                style={styles.smallImage}/>
                }
                {/* {onimage && ( */}
                <ActivityIndicator
                  animating={onimage}
                  size="small"
                  color="#FFD700"
                  style={{ bottom: responsiveHeight(5) }}
                />
                {/* )} */}
              </View>
              <View style={styles.userInfo2}>
                <Text style={styles.userName,{fontFamily:'Sf-pro-display-bold',color:'#394143'}}>{name}</Text>
              </View>
              <View style={styles.userInfo3}>
                <Text
                  style={[styles.info3Text, {fontFamily:'Sf-pro-display', fontWeight: "500" }]}
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
                <ActionButton.Item buttonColor="transparent"
                    size={34}
                    // title="Book Resource"
                    onPress={() => {setburstModel(true)
                    ,
                    setburstvalue('10+')
                    }}>
                    <ImageBackground
                    source={brst} resizeMode={"contain"}
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
export default NewsFeed;
