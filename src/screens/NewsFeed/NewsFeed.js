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
import { user, more, postImage } from "../../../assets";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
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
      <TouchableOpacity
        key={index}
        activeOpacity={0.9}
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
        <View
          style={{
            flexDirection: "row",
            width: "95%",
            alignSelf: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "60%",
              justifyContent: "space-between",
              //   backgroundColor: "tomato",
            }}
          >
            <Image
              style={styles.questionImage}
              resizeMode={"contain"}
              source={item.postImg}
            />
            <Text style={styles.mediumText}>{item.text}</Text>
          </View>
          <View style={{ alignSelf: "center" }}>
            <EvilIcons name="location" size={60} />
            <Text>Location</Text>
          </View>
        </View>

        <View
          style={[
            {
              //   justifyContent: "space-between",
              flexDirection: "row",
              width: "95%",
              alignSelf: "center",
            },
          ]}
        >
          <View style={[styles.bottomContainer]}>
            <TouchableOpacity>
              <Ionicons name="ios-heart" size={22} color="red" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CommentScreen")}
          >
            <View style={[styles.bottomContainer]}>
              <FontAwesome name="comments-o" size={22} color="gray" />
            </View>
          </TouchableOpacity>
          <View
            style={[
              styles.bottomContainer,
              { flexDirection: "row", paddingHorizontal: 10 },
            ]}
          >
            <Text style={styles.mediumText}>{`${item.comments}  `}</Text>

            <Text style={styles.mediumText}>{` ${item.likes} `}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      <Header
        backgroundColor="white"
        leftComponent={{
          icon: "menu",
          color: "black",
          iconStyle: { color: "black" },
        }}
        centerComponent={{ text: "News Feed", style: { color: "black" } }}
        rightComponent={{ icon: "home", color: "black" }}
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
