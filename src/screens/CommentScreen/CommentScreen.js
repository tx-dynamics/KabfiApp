import React, { useState } from "react";
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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import { Header } from "react-native-elements";
import HeaderCenterComponent from "../../components/HeaderCenterComponent";
import HeaderRight from "../../components/HeaderRight";
import HeaderLeftComponent from "../../components/HeaderLeftComponent";
const CommentScreen = (props) => {
  const data = [
    {
      id: 0,
      image: user,
      name: "Mati",
      from: "Murree",
      to: "Kashmir",
      postedtime: "6 mins ago",
      postImg: postImage,
      comments: "200",
      likes: "200",
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, `,
    },
    {
      id: 2,
      image: user,
      name: "Mati",
      from: "Murree",
      to: "Kashmir",
      postedtime: "6 mins ago",
      postImg: postImage,
      comments: "200",
      likes: "200",
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, `,
    },
    {
      id: 3,
      image: user,
      name: "Mati",
      from: "Murree",
      to: "Kashmir",
      postedtime: "6 mins ago",
      postImg: postImage,
      comments: "200",
      likes: "200",
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, `,
    },
    {
      id: 4,
      image: user,
      name: "Mati",
      from: "Murree",
      to: "Kashmir",
      postedtime: "6 mins ago",
      postImg: postImage,
      comments: "200",
      likes: "200",
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, `,
    },
    {
      id: 5,
      image: user,
      name: "Mati",
      from: "Murree",
      to: "Kashmir",
      postedtime: "6 mins ago",
      postImg: postImage,
      comments: "200",
      likes: "200",
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, `,
    },
  ];
  const [cmnt, setCmnt] = useState("");
  const [posts, setPosts] = useState(data);
  const renderPosts = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.9}
        style={styles.cardStyle}
      >
        {/* <View style={[{ alignSelf: 'flex-end' }]}>
                    <OptionsMenu
                        button={more}
                        buttonStyle={{
                            width: 30,
                            height: 15,
                            resizeMode: 'contain',
                            marginTop: 10,
                        }}
                        destructiveIndex={0}
                        options={['Report', 'Delete']}
                        actions={[
                            () => {
                                alert('Reported');
                            },
                            () => {
                                alert('Deleted');
                            },
                        ]}
                    />
                </View> */}
        <View
          style={[
            styles.horizontalContainer,
            // { justifyContent: 'space-between' },
          ]}
        >
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
            <Text style={[styles.largeText, { color: "black" }]}></Text>
            {item.name}
          </Text>
        </View>
        <View>
          <Text style={styles.mediumText}>{item.text}</Text>
        </View>
        <View style={styles.horizontalContainer}>
          <Text
            style={[
              styles.mediumText,
              {
                // alignSelf: 'flex-start',
                // marginLeft: '15.5%',
                color: "gray",
              },
            ]}
          >
            {item.postedtime}
          </Text>

          <Text style={[styles.mediumText, { marginLeft: 10 }]}>Like</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        backgroundColor="white"
        leftComponent={
          <HeaderLeftComponent icon="back" navigation={props.navigation} />
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
          autoCorrect={props.autoCorrect}
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
        <TouchableOpacity style={{ justifyContent: "center", marginLeft: 15 }}>
          <MaterialCommunityIcons name="send" size={32} color={"black"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CommentScreen;
