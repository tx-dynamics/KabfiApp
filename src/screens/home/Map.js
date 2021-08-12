import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useIsFocused } from "@react-navigation/native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { user } from "../../../assets";
const Map = ({ route }) => {
  // var data = route.params;
  // var markers = [{
  //   title: 'hello',
  //   coordinates: {
  //     latitude: 31.456801732578736,
  //     longitude: 74.31160880386359
  //   },
  // },
  // {
  //   title: 'hello',
  //   coordinates: {
  //     latitude: 31.460807644045822,
  //     longitude: 74.31386530053891
  //   },
  // }]
  const [region, setRegion] = useState([
    {
      // latitude: data.latitude,
      // longitude: data.longitude,
      // latitude: 31.461094192311403,
      // longitude: 74.31311014215765,
      // latitudeDelta: 0.015,
      // longitudeDelta: 0.0121,
    },
  ]);
  const [loc, setLoc] = useState([]);
  const [coords, setCoords] = useState([
    {  
   
    }
  ]);
  const isFocused = useIsFocused();
  useEffect(() => {
    // setDataUpdated(!dataUpdated);

    fetchLocation();
  }, [isFocused]);
  async function fetchLocation() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      alert("Permission to access location was denied");
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
      return;
    }
    let location = await Location.getCurrentPositionAsync({});

    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
    setLoc(location);
    console.log("Location", region);
  }
  const onRegionChange = (region) => {
  //   const location = {
  //     latitude: region.latitude,
  //     longitude: region.longitude,
  // };
    console.log(region)
    //setRegion(region);
    //setCoords(location)
  };
  return (
    <View style={styles.container}>
      {/* <Text>Ali</Text> */}
      <MapView
        style={styles.map}
        showsUserLocation={true}
        followUserLocation={true}
        zoomEnabled={true}
        region={region}
        Marker
        onRegionChange={onRegionChange}
      >
        {/* <Marker
          coordinate={coords}
          title="this is a marker"
          description="this is a marker example"
        /> */}

      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Map;
