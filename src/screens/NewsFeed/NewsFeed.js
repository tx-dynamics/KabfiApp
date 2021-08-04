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
  locationImage
} from "../../../assets";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderCenterComponent from "../../components/HeaderCenterComponent";
import HeaderRight from "../../components/HeaderRight";
import HeaderLeftComponent from "../../components/HeaderLeftComponent";
import Main from "../home/Main";
import openMap from 'react-native-open-maps';
// if (!firebase.apps.length) {
//   firebase.initializeApp({
//     apiKey: "AIzaSyASonZ6DlS2cqTonbPSiq8RboZFv4bYKDE",
//     authDomain: "kabfiapp.firebaseapp.com",
//     databaseURL: "https://kabfiapp-default-rtdb.firebaseio.com",
//     projectId: "kabfiapp",
//     storageBucket: "kabfiapp.appspot.com",
//     messagingSenderId: "676638158064",
//     appId: "1:676638158064:web:e01ff8bc3a12a378eee635",
//   });
// }
require("firebase/database");
const NewsFeed = (props) => {
  
  const [posts, setPosts] = useState(null);
  const [dataUpdated, setDataUpdated] = useState(false);

  
  useEffect( () => {
    // setDataUpdated(!dataUpdated);    
    async function fetchAllPosts(){
      let arr = [];   
      const userPost = await firebase.database().ref("user_posts");
      
      userPost.on("value", async (allPosts) => {
        if (allPosts.val()) {
          let posts = await allPosts.val();
          
          for (let x in posts) {
            arr.push(posts[x]);
            
          }
          setPosts(arr);
        }
      });
    }

    fetchAllPosts();
      
  }, []);

  async function likeHandler(post_id){
    var likes_count = 0;
    const data = await firebase.database().ref('user_posts/'+post_id);
    await data.on('value',async userdata=>{
      likes_count = await userdata.val().likes_count;
    });
    console.log('like 1 = ' + likes_count);
    let Details = {
      likes_count: parseInt(likes_count) + 1,        
    };
    console.log('like 2 = ' + (parseInt(likes_count) + 1));
    await firebase.database().ref('user_posts/'+post_id).update(Details); 
    setDataUpdated(!dataUpdated);    
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
            <Image source={{uri:item.user_image}} style={styles.userImgStyle} />
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
          
        <View style={{flexDirection:'row',paddingLeft:10, paddingVertical:20}}>
          <View style={{flex:3}}>
            <Image style={{width:80, height:80, alignSelf:'flex-end'}} source={{uri:item.post_image}} />
          </View>
          
          <View style={{flex:5, paddingHorizontal:10}}>
            <Text style={{textAlign:'justify'}}>{item.post_text}</Text>
          </View>
          
            {
            item.longitude ? 
            <TouchableOpacity style={{flex:2, alignSelf:'flex-end', alignItems:'center', zIndex:1 }} onPress={()=> props.navigation.push('Map',{ latitude: item.latitude, longitude: item.longitude, markers: item.markers }) }>          
            
              {/* <EvilIcons name="location" size={40} /> */}
              <Image source={locationImage} style={{width:20,height:28}} />
              <Text style={{ fontSize: 14 }}>Location</Text>
            </TouchableOpacity>
            :
            <View style={{flex:2, alignSelf:'flex-end', alignItems:'center' }}>          
            </View>
              
            }
          
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
            
            <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>likeHandler(item.post_id)} >
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
            onPress={() => props.navigation.navigate("CommentScreen")}
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
        containerStyle={{ marginTop: 15 }}
        leftComponent={<HeaderLeftComponent navigation={props.navigation} />}
        rightComponent={<HeaderRight navigation={props.navigation} />}
        centerComponent={<HeaderCenterComponent name="News Feed" />}
      />
      <View>
        <FlatList
          data={posts}
          renderItem={renderPosts}

          // keyExtractor={(item) => item.post_id}
          keyExtractor={(item, index) => item + index.toString()}
          // keyExtractor={({post_text}) => post_text }
          showsVerticalScrollIndicator={false}
          // extraData={posts}
        />
      </View>
    </View>
  );
};
export default NewsFeed;
