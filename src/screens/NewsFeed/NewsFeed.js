import React, { useState } from "react";
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
} from "../../../assets";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderCenterComponent from "../../components/HeaderCenterComponent";
import HeaderRight from "../../components/HeaderRight";
import HeaderLeftComponent from "../../components/HeaderLeftComponent";
import Main from "../home/Main";
const NewsFeed = (props) => {
  const userPost = [
    {
      id: 0,
      image: user,
      name: "Zaid",
      from: "Murree",
      to: "Kashmir",
      postedtime: "49s",
      postImg: postImage,
      comments: "200",
      likes: "200",
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.  `,
    },
    {
      id: 2,
      image: user,
      name: "Zaid",
      from: "Murree",
      to: "Kashmir",
      postedtime: "49s",
      postImg: postImage,
      comments: "200",
      likes: "200",
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.  `,
    },
    {
      id: 3,
      image: user,
      name: "Zaid",
      from: "Murree",
      to: "Kashmir",
      postedtime: "49s",
      postImg: postImage,
      comments: "200",
      likes: "200",
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.  `,
    },
    {
      id: 4,
      image: user,
      name: "Zaid",
      from: "Murree",
      to: "Kashmir",
      postedtime: "49s",
      postImg: postImage,
      comments: "200",
      likes: "200",
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.  `,
    },
  ];
  const [posts, setPosts] = useState(userPost);
  const renderPosts = ({ item, index }) => {
    return (
      <View
        key={index}
        // activeOpacity={0.9}
        style={styles.cardStyle}
      >
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
            <Image source={item.image} style={styles.userImgStyle} />
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
                {"JohnThompson"}
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
              >{`\n@JohnThompson.${item.postedtime}`}</Text>
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
            <Image style={{width:80, height:80, alignSelf:'flex-end'}} source={item.postImg} />
          </View>
          
          <View style={{flex:5, paddingHorizontal:10}}>
            <Text style={{textAlign:'justify'}}>{item.text}</Text>
          </View>
          
          <View style={{flex:2, alignSelf:'flex-end', alignItems:'center' }}>
            <EvilIcons name="location" size={40} />
            <Text style={{ fontSize: 14 }}>Location</Text>
          </View>  
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
              <Ionicons name="ios-heart" size={22} color="red" />
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
      <Header
        backgroundColor="white"
        containerStyle={{ marginTop: 15 }}
        leftComponent={<HeaderLeftComponent navigation={props.navigation} />}
        rightComponent={<HeaderRight />}
        centerComponent={<HeaderCenterComponent name="News Feed" />}
      />
      <FlatList
        data={posts}
        // extraData={po}
        renderItem={renderPosts}
        // refreshing={this.state.isRefreshing}
        // onRefresh={this.onRefresh}
        keyExtractor={(item, index) => item + index.toString()}
        showsVerticalScrollIndicator={false}
        // ListFooterComponent={this.renderFooter}
        // onEndReachedThreshold={0.01}
        // bounces={Platform.OS === 'ios' ? true : false}
        // onMomentumScrollBegin={() => {
        //   this.onEndReachedCalledDuringMomentum = false;
        // }}
        // onEndReached={({distanceFromEnd}) => {
        //   if (!this.onEndReachedCalledDuringMomentum) {
        //     // this.onLoadMore();
        //     this.onEndReachedCalledDuringMomentum = true;
        //   }
        // }}
      />
    </View>
  );
};
export default NewsFeed;
