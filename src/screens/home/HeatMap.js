import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform
} from 'react-native';
import MapView, { Heatmap, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
export default class HeatMap extends Component {

  static navigationOptions = {
    title: 'New York',
  };

  state = {
    initialPosition: {
      latitude: 40.7143,
      longitude: -74.0042,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035
    },
    region:{},
  }

  async componentDidMount(){
      this.fetchLocation()
  }

  async fetchLocation() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      alert("Permission to access location was denied");
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
      return;
    }
    let location = await Location.getCurrentPositionAsync({});

    await this.setState({
        initialPosition:{ 
        latitude: location.coords.latitude,
       longitude: location.coords.longitude,
       latitudeDelta: 0.015,
       longitudeDelta: 0.0121,
       },
       location:{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
       }
    })
   console.log("Region",this.state.initialPosition) 
  }
  points = [
    { latitude: 40.7828, longitude: -74.0065,  },
    { latitude: 41.7121, longitude: -74.0042,  },
    { latitude: 40.7102, longitude: -75.0060,  },
    { latitude: 40.7123, longitude: -74.0052,  },
    { latitude: 40.7032, longitude: -74.0042,  },
    { latitude: 40.7198, longitude: -74.0024,  },
    { latitude: 41.7223, longitude: -74.0053,  },
    { latitude: 40.7181, longitude: -74.0042,  },
    { latitude: 40.7124, longitude: -74.0023,  },
    { latitude: 40.7648, longitude: -74.0012,  },
    { latitude: 41.7128, longitude: -74.0027,  },
    { latitude: 40.7223, longitude: -74.0153, },
    { latitude: 40.7193, longitude: -74.0052,  },
    { latitude: 40.7241, longitude: -75.0013,  },
    { latitude: 41.7518, longitude: -74.0085,  },
    { latitude: 40.7599, longitude: -74.0093,  },
    { latitude: 41.7523, longitude: -74.0021,  },
    { latitude: 40.7342, longitude: -74.0152,  },
    { latitude: 40.7484, longitude: -75.0042,  },
    { latitude: 40.7929, longitude: -75.0023,  },
    { latitude: 40.7292, longitude: -74.0013, },
    { latitude: 40.7940, longitude: -74.0048,  },
    { latitude: 40.7874, longitude: -74.0052,},
    { latitude: 40.7824, longitude: -74.0024, },
    { latitude: 40.7232, longitude: -74.0094, },
    { latitude: 41.7342, longitude: -74.0152,  },
    { latitude: 41.7484, longitude: -74.0012, },
    { latitude: 41.7929, longitude: -74.0073,  },
    { latitude: 41.7292, longitude: -74.0013, },
    { latitude: 41.7940, longitude: -74.0058,  },
    { latitude: 41.7874, longitude: -74.0352,  },
    { latitude: 41.7824, longitude: -74.0024,  },
    { latitude: 41.7232, longitude: -74.0094,  },
    { latitude: 41.0342, longitude: -75.0152,  },
    { latitude: 41.0484, longitude: -75.0012,  },
    { latitude: 41.0929, longitude: -75.0073,  },
    { latitude: 41.0292, longitude: -74.0013,  },
    { latitude: 41.0940, longitude: -74.0068,  },
    { latitude: 41.0874, longitude: -74.0052,  },
    { latitude: 41.0824, longitude: -74.0024,  },
    { latitude: 41.0232, longitude: -74.0014,  }
  ];

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={map => this._map = map}
          style={styles.map}
          initialRegion={this.state.initialPosition}>
          <Heatmap
            points={this.points}
            radius={100}
            opacity={1}
            gradient={{
              colors: ["purple", "red", "yellow", "blue", "white"],
              startPoints: Platform.OS === 'ios' ? [0.01, 0.04, 0.1, 0.45, 0.5] :
                [0.1, 0.25, 0.5, 0.75, 1],
              colorMapSize: 100000
            }}
          >
          </Heatmap>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});