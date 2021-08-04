import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import MapView from 'react-native-maps';

const Map = ({route}) => {
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
    return (
        <View style={styles.container}>
            {/* <Text>Ali</Text> */}
            <MapView 
                style={styles.map} 
                showsUserLocation={true}
                followUserLocation={true}
                zoomEnabled={true}
                region={{
                    // latitude: data.latitude,
                    // longitude: data.longitude,
                    latitude: 31.461094192311403,
                    longitude: 74.31311014215765,                    
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
              
             {/* {data.markers.map(marker => (
              <MapView.Marker 
                coordinate={marker.coordinates}
                title={marker.title}
              />
            ))} */}

          </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });

export default Map;