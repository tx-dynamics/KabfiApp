import React, { Component } from "react";
import { StyleSheet, View, Platform, ActivityIndicator } from "react-native";
import MapView, { Heatmap, PROVIDER_GOOGLE } from "react-native-maps";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
require("firebase/database");
import firebase from "firebase";
import { responsiveHeight } from "react-native-responsive-dimensions";
import HeaderLeftComponent from "../../components/HeaderLeftComponent";
import { Header } from "react-native-elements";
// export default class HeatMap extends Component {
//   static navigationOptions = {
//     title: "New York",
//   };

//   state = {
//     initialPosition: {
//       latitude: 40.7143,
//       longitude: -74.0042,
//       latitudeDelta: 0.09,
//       longitudeDelta: 0.035,
//     },
//     region: {},
//     points: [{ latitude: 40.7828, longitude: -74.0065 }],
//   };

//   async componentDidMount() {
//     this.fetchLocation();
//   }

//   async fetchLocation() {
//     let { status } = await Permissions.askAsync(Permissions.LOCATION);
//     if (status !== "granted") {
//       alert("Permission to access location was denied");
//       // this.setState({
//       //   errorMessage: "Permission to access location was denied",
//       // });
//       return;
//     }
//     let location = await Location.getCurrentPositionAsync({});
//     const uid = firebase.auth().currentUser?.uid;
//     var myRef = firebase.database().ref("locations/");
//     var points = [];
//     this.setState({
//       initialPosition:
//       {
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.015,
//         longitudeDelta: 0.0121,
//       }
//     })
//     myRef.on("value", (child) => {
//       if (child.hasChildren()) {
//         child.forEach((chill) => {
//           points.push({
//             latitude: chill.val().latitude,
//             longitude: chill.val().longitude,
//             latitudeDelta: 0.015,
//             longitudeDelta: 0.0121,
//           });
//         });

//         if (points[0].latitude) {
//           this.setState({
//             initialPosition: {
//               latitude: points[0].latitude,
//               longitude: points[0].longitude,
//               latitudeDelta: 0.015,
//               longitudeDelta: 0.0121,
//             },
//           });
//         }
//         this.setState({ points });
//         console.log("myRef", points);
//       }
//     });

//     // this.setState({
//     //   initialPosition: {
//     //     latitude: location.coords.latitude,
//     //     longitude: location.coords.longitude,
//     //     latitudeDelta: 0.015,
//     //     longitudeDelta: 0.0121,
//     //   },
//     //   location: {
//     //     latitude: location.coords.latitude,
//     //     longitude: location.coords.longitude,
//     //     latitudeDelta: 0.015,
//     //     longitudeDelta: 0.0121,
//     //   },
//     // });
//     // console.log("Region", this.state.initialPosition);
//   }
//   points = [
//     { latitude: 40.7828, longitude: -74.0065 },
//     { latitude: 41.7121, longitude: -74.0042 },
//     { latitude: 40.7102, longitude: -75.006 },
//     { latitude: 40.7123, longitude: -74.0052 },
//     { latitude: 40.7032, longitude: -74.0042 },
//     { latitude: 40.7198, longitude: -74.0024 },
//     { latitude: 41.7223, longitude: -74.0053 },
//     { latitude: 40.7181, longitude: -74.0042 },
//     { latitude: 40.7124, longitude: -74.0023 },
//     { latitude: 40.7648, longitude: -74.0012 },
//     { latitude: 41.7128, longitude: -74.0027 },
//     { latitude: 40.7223, longitude: -74.0153 },
//     { latitude: 40.7193, longitude: -74.0052 },
//     { latitude: 40.7241, longitude: -75.0013 },
//     { latitude: 41.7518, longitude: -74.0085 },
//     { latitude: 40.7599, longitude: -74.0093 },
//     { latitude: 41.7523, longitude: -74.0021 },
//     { latitude: 40.7342, longitude: -74.0152 },
//     { latitude: 40.7484, longitude: -75.0042 },
//     { latitude: 40.7929, longitude: -75.0023 },
//     { latitude: 40.7292, longitude: -74.0013 },
//     { latitude: 40.794, longitude: -74.0048 },
//     { latitude: 40.7874, longitude: -74.0052 },
//     { latitude: 40.7824, longitude: -74.0024 },
//     { latitude: 40.7232, longitude: -74.0094 },
//     { latitude: 41.7342, longitude: -74.0152 },
//     { latitude: 41.7484, longitude: -74.0012 },
//     { latitude: 41.7929, longitude: -74.0073 },
//     { latitude: 41.7292, longitude: -74.0013 },
//     { latitude: 41.794, longitude: -74.0058 },
//     { latitude: 41.7874, longitude: -74.0352 },
//     { latitude: 41.7824, longitude: -74.0024 },
//     { latitude: 41.7232, longitude: -74.0094 },
//     { latitude: 41.0342, longitude: -75.0152 },
//     { latitude: 41.0484, longitude: -75.0012 },
//     { latitude: 41.0929, longitude: -75.0073 },
//     { latitude: 41.0292, longitude: -74.0013 },
//     { latitude: 41.094, longitude: -74.0068 },
//     { latitude: 41.0874, longitude: -74.0052 },
//     { latitude: 41.0824, longitude: -74.0024 },
//     { latitude: 41.0232, longitude: -74.0014 },
//   ];

//   render() {
//     return (
//       <View style={styles.container}>
//         <MapView
//           provider={PROVIDER_GOOGLE}
//           ref={(map) => (this._map = map)}
//           style={styles.map}
//           // initialRegion={this.state.initialPosition}
//           region={this.state.initialPosition}
//         >
//           <Heatmap
//             points={this.state.points}
//             radius={50}
//             opacity={1}
//             gradient={{
//               colors: ["purple", "red", "yellow", "blue", "white"],
//               startPoints:
//                 Platform.OS === "ios"
//                   ? [0.01, 0.04, 0.1, 0.45, 0.5]
//                   : [0.1, 0.25, 0.5, 0.75, 1],
//               // colorMapSize: 100000,
//             }}
//           ></Heatmap>
//         </MapView>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});

export default class HeatMap extends Component {
  state = {
    initialPosition: {
      latitude: 53.74314330157041,
      longitude: -1.6919068119555305,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035,
    },
    loader: false,
    region: {},
    points: [],
    show: false,
  };
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.fetchLocation();
    }
  }
  componentDidMount() {
    this.fetchLocation();
  }

  // async fetchLocation() {
  //   try {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       alert("Permission to access location was denied");
  //       return;
  //     }
  //     let location = await Location.getCurrentPositionAsync({});
  //     //const uid = firebase.auth().currentUser?.uid;
  //     var myRef = firebase.database().ref("locations/");
  //     var points = [];
  //     this.setState({
  //       initialPosition: {
  //         latitude: location.coords.latitude,
  //         longitude: location.coords.longitude,
  //         latitudeDelta: 0.015,
  //         longitudeDelta: 0.0121,
  //       },
  //     });
  //     myRef.on("value", (child) => {
  //       console.log(child.key);
  //       if (child.hasChildren()) {
  //         child.forEach((chill) => {
  //           points.push({
  //             latitude: chill.val().latitude,
  //             longitude: chill.val().longitude,
  //             latitudeDelta: 0.015,
  //             longitudeDelta: 0.0121,
  //           });
  //         });

  //         if (points[0].latitude) {
  //           this.setState({
  //             initialPosition: {
  //               latitude: points[0].latitude,
  //               longitude: points[0].longitude,
  //               latitudeDelta: 0.015,
  //               longitudeDelta: 0.0121,
  //             },
  //           });
  //         }
  //         this.setState({ points });
  //         console.log("myRef", points);
  //       }
  //     });

  //     this.setState({
  //       initialPosition: {
  //         latitude: location.coords.latitude,
  //         longitude: location.coords.longitude,
  //         latitudeDelta: 0.015,
  //         longitudeDelta: 0.0121,
  //       },
  //       location: {
  //         latitude: location.coords.latitude,
  //         longitude: location.coords.longitude,
  //         latitudeDelta: 0.015,
  //         longitudeDelta: 0.0121,
  //       },
  //     });
  //     console.log("Region", this.state.initialPosition);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }
  async fetchLocation() {
    try {
      // let { status } = await Permissions.askAsync(Permissions.LOCATION);
      // if (status !== "granted") {
      //   alert("Permission to access location was denied");
      //   this.props.navigation.navigate("NewsFeed");
      //   return;
      // } else {
      this.setState({ loader: true, show: false });
      // let location = await Location.getCurrentPositionAsync({
      //   accuracy: Location.Accuracy.High,
      // });
      // console.log("Location==>", location);

      // this.setState({
      //   initialPosition: {
      //     latitude: location.coords.latitude,
      //     longitude: location.coords.longitude,
      //     latitudeDelta: 0.015,
      //     longitudeDelta: 0.0121,
      //   },
      // });
      // if (location) {
      //   this.setState({
      //     initialPosition: {
      //       latitude: location.coords.latitude,
      //       longitude: location.coords.longitude,
      //       latitudeDelta: 0.015,
      //       longitudeDelta: 0.0121,
      //     },
      //   });
      try {
        const mylocation = firebase.database().ref("locations/");
        const myRegion = firebase
          .database()
          .ref("locations/" + firebase.auth().currentUser?.uid);
        myRegion.once("value", (child) => {
          if (child.exists()) {
            this.setState({
              initialPosition: {
                latitude: child.val().latitude,
                longitude: child.val().longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              },
            });
          }
        });
        mylocation.once("value", (child) => {
          const points1 = [];

          // if (child.hasChildren()) {
          child.forEach((chill) => {
            points1.push({
              latitude: chill.val().latitude,
              longitude: chill.val().longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            });
          });
          // }
          console.log("Points==>", points1);
          this.setState({ points: points1, loader: false });
        });
      } catch (err) {
        // this.fetchLocation();
        // alert(err.message);
      }
      // }
      // }
    } catch (err) {
      // this.setState({ show: true });
      this.fetchLocation();
      // return;

      // this.props.navigation.navigate("NewsFeed");
      // alert(err.message);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Header
          backgroundColor="white"
          leftComponent={
            <HeaderLeftComponent
              icon="back"
              navigation={this.props.navigation}
            />
          }
          // centerComponent={
          //   <Text style={{ fontSize: 17, color: "#000000", fontWeight: "700" }}>
          //     Comments
          //   </Text>
          // }
        />
        <View style={styles.container}>
          {this.state.loader ? (
            <ActivityIndicator
              size={"large"}
              style={{ marginTop: responsiveHeight(20), alignSelf: "center" }}
            ></ActivityIndicator>
          ) : (
            <MapView
              provider={PROVIDER_GOOGLE}
              ref={(map) => (this._map = map)}
              style={styles.map}
              region={this.state.initialPosition}
              showsUserLocation={false}
              loadingEnabled
            >
              <Heatmap
                points={this.state.points}
                radius={Platform.OS === "ios" ? 150 : 50}
                opacity={1}
                gradient={{
                  colors: [
                    "#877FDC",
                    "#AC6FA6",
                    "#E55F5A",
                    "#FAD462",
                    "#FAD462",
                  ],
                  startPoints:
                    Platform.OS === "ios"
                      ? [0.01, 0.04, 0.1, 0.45, 0.5]
                      : [0.1, 0.25, 0.5, 0.75, 1],
                  colorMapSize: 2000,
                }}
              ></Heatmap>
            </MapView>
          )}
        </View>
      </View>
    );
  }
}
