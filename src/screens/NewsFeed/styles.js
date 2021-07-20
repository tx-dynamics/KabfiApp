import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
  },
  userImgStyle: {
    height: 50,
    width: 50,
    borderRadius: 70,
    alignSelf: "center",
    margin: 5,
  },
  questionImage: {
    height: Dimensions.get("window").height / 6,
    width: "70%",
  },
  mediumText: {
    fontSize: 12,
    alignSelf: "center",
    width: "40%",
    marginLeft: 5,
  },
  cardStyle: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "#BDBDBD",
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
