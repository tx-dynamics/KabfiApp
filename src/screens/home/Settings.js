import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  AsyncStorage,
  Linking,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// import { useLogin } from "../../context/LoginProvider";
import { Header } from "react-native-elements";
import HeaderCenterComponent from "../../components/Settings/HeaderCenterComponent";
import firebase from "firebase";

// import HeaderRight from "../../components/Settings/HeaderRight";
import HeaderLeftComponent from "../../components/Settings/HeaderLeftComponent";
import { connect } from "react-redux";
import { SetSession } from "../../Redux/Actions/Actions";

const Settings = (props) => {
  // const { setIsLoggedIn } = useLogin();
  const [loader, setLoader] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    const switchE = firebase
      .database()
      .ref("users/" + firebase.auth().currentUser?.uid + "/");
    switchE.on("value", (child) => {
      setIsEnabled(child.val().isEnabled);
    });
  }, []);
  const toggleSwitch = async () => {
    const dat = { isEnabled: !isEnabled };
    await firebase
      .database()
      .ref("users/" + firebase.auth().currentUser?.uid + "/")
      .update(dat)
      .then(() => {
        setIsEnabled(!isEnabled);
      });
  };

  async function userLogout() {
    setLoader(true);
    const data = {
      isLogin: false,
    };

    const del = firebase
      .database()
      .ref("locations")
      .child(firebase.auth().currentUser?.uid);
    del.remove();
    firebase
      .database()
      .ref("users/" + firebase.auth().currentUser?.uid)
      .update(data);
    firebase
      .auth()
      .signOut()
      .then(() => {
        setLoader(false), props.navigation.navigate("Signin");
        props.SessionMaintain({ isLogin: false });

        // setIsLoggedIn(false);
      });
    setLoader(false);
  }

  return (
    <View style={styles.root}>
      <Header
        backgroundColor="white"
        containerStyle={{ marginTop: 15 }}
        leftComponent={<HeaderLeftComponent navigation={props.navigation} />}
        centerComponent={<HeaderCenterComponent name="Settings" />}
      />
      <View style={styles.contentArea}>
        <View style={styles.listContainer}>
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => props.navigation.navigate("ResetPassword")}
          >
            <Image
              source={require("../../../assets/ProjectImages/userSettings/change-password.png")}
              style={styles.listIconImage}
              resizeMode="contain"
            />
            <Text style={styles.listText}>Change Password</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <TouchableOpacity style={styles.listItem}>
              <Image
                source={require("../../../assets/ProjectImages/userSettings/notification-settings.png")}
                style={styles.listIconImage}
                resizeMode="contain"
              />
              <Text style={styles.listText}>Notification</Text>
            </TouchableOpacity>
            <Switch
              trackColor={{ false: "#474747", true: "#FCB040" }}
              thumbColor={isEnabled ? "white" : "#FCB040"}
              ios_backgroundColor="#474747"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <TouchableOpacity
            onPress={() => Linking.openSettings()}
            style={[styles.listItem, { marginTop: 15 }]}
          >
            <Image
              source={require("../../../assets/ProjectImages/locationImage.png")}
              style={styles.listIconImage}
              resizeMode="contain"
            />
            <Text style={styles.listText}>Location</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.listItem, { marginTop: 15 }]}
            onPress={userLogout}
          >
            <Image
              source={require("../../../assets/ProjectImages/userSettings/logout.png")}
              style={styles.listIconImage}
              resizeMode="contain"
            />
            {loader ? (
              <ActivityIndicator color={"red"} size={"small"} />
            ) : (
              <Text style={styles.listText}>Log Out</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
    flex: 1,
  },
  contentArea: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  listContainer: {
    width: "100%",
  },
  listItem: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor:'red'
  },
  listIconImage: {
    // backgroundColor:'orange',
    alignSelf:'center',
    width: 20,
    height: 22,
  },
  listText: {
    marginLeft: 10,
    color: "#474747",
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    SessionMaintain: (data) => dispatch(SetSession(data)),
  };
};

export default connect(null, mapDispatchToProps)(Settings);
