import { StyleSheet, Dimensions } from "react-native";
import { ScreenHeight, ScreenWidth } from "react-native-elements/dist/helpers";

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.3,
    backgroundColor: "white",
    flex: 1,
  },
  scroll: {
    // height:Dimensions.get('screen').height,
    // width:Dimensions.get('screen').width,
    marginBottom: 10,
  },
  contentArea: {
    borderTopLeftRadius: 50,
    height: Dimensions.get("window").height / 1.3,
    borderTopRightRadius: 50,
    alignItems: "center",
    backgroundColor: "#FBFBFB",
    width: "100%",
    elevation: 10,
    paddingLeft: 25,
    position: "absolute",
    bottom: 0,
  },
  smallLine: {
    height: 2,
    width: 20,
    right:8,
    backgroundColor: "#D6D6D6",
    alignSelf: "center",
    marginTop: 25,
  },
  userInfoContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  userInfo1: {
    width: "20%",
    alignItems: "center",
  },
  smallImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  userInfo2: {
    width: "35%",
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  userName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#464646",
  },
  userInfo2SubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    fontSize: 14,
    color: "#FAB040",
    marginLeft: 5,
    marginTop: 4,
  },
  info2Text: {
    color: "#464646",
  },
  userInfo3: {
    width: "45%",
    paddingHorizontal: 4,
    paddingVertical: 14,
  },
  info3Text: {
    color: "#464646",
    fontSize: 12,
  },
  listContainer: {
    marginTop: 20,
    // backgroundColor:'red',
    width: "100%",
  },
  listItem: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
    alignItems: "center",
  },
  listIconImage: {
    width: 20,
    height: 20,
  },
  listText: {
    marginLeft: 10,
    color: "#474747",
  },
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
    top: 0,
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
    fontSize: 13,
    alignSelf: "center",
    marginLeft: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  cardStyle: {
    flex: 1,
    // width:360,
    // height:186,
    margin: 10,
    padding: 10,
    // backgroundColor: "orange",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    //margin: 20,
    backgroundColor: "white",
    //borderRadius: 20,
    paddingBottom: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: ScreenWidth,
    height: ScreenHeight,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 17,
  },
  modalText: {
    // marginBottom: 15,
    textAlign: "center",
  },




  centeredViewUp: {
    flex:1,
    justifyContent: 'flex-end',
    //alignItems: 'center',
    //marginTop: 22,
  },
  modalViewUp: {
    //margin: 20,
   // backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonUp: {
   width:'110%',
   backgroundColor: 'white',
   padding:20,
   borderRadius:10,
  },
  buttonOpenUp: {
    backgroundColor: '#F194FF',
  },
  buttonCloseUp: {
    backgroundColor: '#2196F3',
  },
  textStyleUp: {
    color: '#2196F3',
    fontWeight: '500',
    textAlign: 'center',
fontSize:18,
    //height:100,
  },
  modalTextUp: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default styles;
