import { StyleSheet, Dimensions } from "react-native";
const SCREEN_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  imageBG: {
    flex: 0.4,
    backgroundColor: "tomato",
  },
  searchContainer: {
    backgroundColor: "transparent",
    // borderBottomWidth: 0.5,
    borderTopWidth: 0,
    width: "80%",
    alignSelf: "center",
    marginTop: 10,
  },
  inputStyle: {
    width: "100%",
    backgroundColor: "white",

    // borderColor: '#E8E8E8',
    borderRadius: 5,
    // alignSelf: 'center',
    elevation: 1,
    // marginVertical: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    shadowColor: "gray",

    shadowRadius: 1,
    shadowOpacity: 1.0,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    // borderRadius: 10,
  },
  categoryContainer: {
    margin: 7,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    padding: 12,
  },

  categoryTitle: {
    fontSize: 16,
    // fontFamily: Fonts.GoogleSansMedium,
  },
  cardContainer: {
    flex: 1,
  },
  questionImage: {
    width: "100%",
    height: SCREEN_HEIGHT / 5,
    marginVertical: "2%",
  },
  cardViewContainer: {
    marginLeft: SCREEN_HEIGHT / 9,
    marginRight: SCREEN_HEIGHT / 9,
  },
  horizontalContainer: {
    flexDirection: "row",
  },
  verticalContainer: {
    margin: 10,
  },
  input: {
    backgroundColor: "white",
    paddingLeft: 15,
    borderRadius: 30,
    width: "85%",
    borderColor: "lightgray",
    borderWidth: 1,
    paddingVertical: 10,
  },
  statusIcon: {
    height: 18,
    width: 18,
    alignSelf: "center",
    margin: 5,
    borderRadius: 5,
  },
  mediumText: {
    // fontFamily: Fonts.RobotoRegular,
    fontSize: 12,
    // alignSelf: "center",
  },
  largeText: {
    fontSize: 16,
    color: "black",
  },
  userImgStyle: {
    height: 70,
    width: 70,
    borderRadius: 35,
    alignSelf: "center",
    margin: 5,
  },
  iconsStyle: {
    height: 18,
    width: 18,
  },
  bottomTabIcon: {
    height: 25,
    width: 25,
  },
  bottomContainer: {
    flex: 0.5,
    padding: 5,
    marginTop: 15,
    // justifyContent: 'center',
  },
  cardStyle: {
    flex: 1,
    margin: 10,
    backgroundColor: "white",
    elevation: 10,
    shadowColor: "#BDBDBD",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    // borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    justifyContent: "center",
    padding: 10,
    width: "95%",
    alignSelf: "center",
  },
});

export default styles;
