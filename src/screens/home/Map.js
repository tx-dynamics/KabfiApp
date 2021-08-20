import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import MapView, { Marker, MarkerAnimated } from "react-native-maps";
import { useIsFocused } from "@react-navigation/native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { user } from "../../../assets";
import { Header } from "react-native-elements";
import HeaderLeftComponent from "../../components/HeaderLeftComponent";
const Map = ({ route, navigation }) => {
  const [region, setRegion] = useState({
    latitude: 31.461094192311403,
    longitude: 74.31311014215765,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [loc, setLoc] = useState({
    latitude: 31.461094192311403,
    longitude: 74.31311014215765,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [coords, setCoords] = useState([{}]);
  const isFocused = useIsFocused();

  useEffect(() => {
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
    setLoc({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
    console.log("Location", region);
  }
  const onRegionChange = async (region) => {
    console.log(region);
    setRegion(region);
    setLoc(region);
    AsyncStorage.setItem("location", JSON.stringify(region));
  };
  return (
    <View style={styles.container}>
      <Header
        backgroundColor="white"
        leftComponent={
          <HeaderLeftComponent icon="back" navigation={navigation} />
        }
      />
      <MapView
        style={styles.map}
        showsUserLocation={true}
        followUserLocation={true}
        zoomEnabled={true}
        // region={region}
        Marker
        trackViewChanges={false}
        initialRegion={region}
        onRegionChange={onRegionChange}
      >
        <TouchableOpacity>
          <Marker.Animated
            draggable
            coordinate={loc}
            onDragEnd={(e) => setLoc(e.nativeEvent.coordinate)}
          />
        </TouchableOpacity>
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
    width: Dimensions.get("screen").width,
    height: Dimensions.get("window").height / 1.04,
  },
});

export default Map;
