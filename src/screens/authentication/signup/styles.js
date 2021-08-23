import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  root: {
    // width:Dimensions.get('window').width,
    // height:Dimensions.get('window').height,
    backgroundColor: "white",
    flex: 1,
  },
  contentArea: {
    width: "100%",
    height: "100%",
    marginTop: "5%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logoContainer: {
    alignItems: "center",
  },
  logoImage: {
    width: 140,
    height: 30,
  },
  topLeftArrow: {
    fontSize: 24,
    color: "black",
    position: "absolute",
    left: 0,
    top: 5,
  },
  createAccountText: {
    marginTop: 25,
    fontSize: 17,
    fontWeight: "bold",
  },
  form: {
    marginTop: 20,
  },
  formField: {
    marginTop: 20,
  },
  label: {},
  textFieldHalfContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  textFieldFullContainer: {
    marginTop: 5,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E6E6E6",
    justifyContent: "space-between",
  },
  textFieldHalf: {
    borderWidth: 1,
    borderColor: "#E6E6E6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "48.5%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  textFieldHalf1: {
    fontSize: 13,
  },
  textFieldFull: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    fontSize: 13,
    textAlign: "left",
    width: "80%",
  },
  countryCode: {
    alignSelf: "center",
    paddingLeft: 7,
    // position: 'absolute',
    // top: 38.5, left: 10
  },
  uploadImageFieldsContainer: {
    width: "48.5%",
  },
  uploadImageFields: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 13,
  },
  uploadImageFieldLabel: {
    marginBottom: 5,
    marginLeft: 5,
  },
  uploadIMageIcon: {
    alignSelf: "center",
    width: 15,
    height: 15,
    marginRight: 10,
  },
  checkImageIcon: {
    alignSelf: "center",
    width: 15,
    height: 15,
  },
  submitText: {
    // color:'#FCD291'
    color: "#FCB040",
  },
  loginBtn: {
    marginTop: 40,
    backgroundColor: "#FAB040",
    alignItems: "center",
    padding: 12,
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
  },
  eyeIcon: {
    fontSize: 24,
    color: "#E6E6E6",
    alignSelf: "center",
  },
  eyeIconContainer: {
    //position: 'absolute',
    //top: 13,

    width: 35,
    height: 25,
    alignSelf: "center",
    //zIndex: 1
  },
});

export default styles;
