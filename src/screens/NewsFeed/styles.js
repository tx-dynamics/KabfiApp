import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
    //height:Dimensions.get("window").height-100
  },
  userImgStyle: {
    height: 50,
    width: 50,
    borderRadius: 70,
    alignSelf: "center",
    margin: 5,
  },
  bottomContainer: {
    // marginLeft: "4%",
    padding: 5,
    // marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  questionImage: {
    height: Dimensions.get("window").height / 9,
    width: "60%",
  },
  mediumText: {
    fontSize: 12,
    alignSelf: "center",
    width: "40%",
    // marginLeft: 5,
  },
  smallText: {
    fontSize: 12,
    alignSelf: "center",
    // width: "40%",
    marginLeft: 5,
    textAlign: "center",
  },
  cardStyle: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: "#FBFBFB",
    // elevation: 2,
    shadowColor: "#fdfdfd",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1.0,
    // borderWidth: 1,
    // borderColor: theme.colors.lightGray,
    borderRadius: 10,
  },
});
export default styles;
