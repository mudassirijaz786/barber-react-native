import React, { Component } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as geolib from "geolib";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

let { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Maps extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        });
        const location = JSON.stringify(position);
        console.log("CURRENT LOCATION", location);
        const distance = geolib.getDistance(position.coords, {
          latitude: 31.462723,
          longitude: 74.330949
        });
        console.log("DISTANCE IN KM", distance / 1000);
      },
      error => console.log("ERROR IN CURRENT LOCATION", error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition(position => {
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      });
    });
  }

  getCoordsFromName(loc) {
    this.setState({
      region: {
        latitude: loc.lat,
        longitude: loc.lng,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003
      }
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  render() {
    return (
      <View>
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2} // minimum length of text to search
          autoFocus={true}
          returnKeyType={"search"} // Can be left out for default return key
          listViewDisplayed={false} // true/false/undefined
          fetchDetails={true}
          query={{
            key: "AIzaSyARjyRyPhNoOKCNv4bS1W7zP-1reTQElFs",
            language: "en"
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={300}
        />
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.container}
          showsUserLocation={true}
          zoomEnabled={true}
          scrollEnabled={true}
          pitchEnabled={false}
          rotateEnabled={false}
          region={this.state.region}
          onRegionChange={region => this.setState({ region })}
          onRegionChangeComplete={region => this.setState({ region })}
        >
          <MapView.Marker
            title="This is a title"
            description="This is a description"
            coordinate={this.state.region}
          />
        </MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%"
  }
});
