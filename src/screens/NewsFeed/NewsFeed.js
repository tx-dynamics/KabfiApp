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
  
  useEffect( () => {
    
    async function fetchAllPosts(){
      let arr = [];   
      const userPost = await firebase.database().ref("posts/");
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
            <Image source={{uri:item.image}} style={styles.userImgStyle} />
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
                {item.name}
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
              >{`\n@${item.name}.${item.postedtime}`}</Text>
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
            <Image style={{width:80, height:80, alignSelf:'flex-end'}} source={{uri:item.postImg}} />
          </View>
          
          <View style={{flex:5, paddingHorizontal:10}}>
            <Text style={{textAlign:'justify'}}>{item.text}</Text>
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
            <TouchableOpacity>
              <Image
                source={heartImage}
                resizeMode="contain"
                style={{ height: 17, width: 17 }}
              />
            </TouchableOpacity>
            <Text style={styles.smallText}>{`${item.comments}  `}</Text>
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
            <Text style={styles.smallText}>{` ${item.likes} `}</Text>
          </TouchableOpacity>
         
          <View style={[styles.bottomContainer]}>
            <Image
              source={favourite}
              resizeMode="contain"
              style={{ height: 17, width: 17 }}
            />
            <Text style={styles.smallText}>{` ${item.likes} `}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      {console.log(posts)}
    
      <Header
        backgroundColor="white"
        containerStyle={{ marginTop: 15 }}
        leftComponent={<HeaderLeftComponent navigation={props.navigation} />}
        rightComponent={<HeaderRight />}
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
