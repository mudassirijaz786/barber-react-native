//importing
import React, { Component } from "react";
import { Dimensions, StyleSheet, Text, ActivityIndicator } from "react-native";
import { Icon } from "native-base";
import MapView, { Marker } from "react-native-maps";
import * as geolib from "geolib";
import MapViewDirections from "react-native-maps-directions";
import { getLocation } from "../components/location-service";
import {
  Container,
  Title,
  Distance,
  Blocked,
  Category,
  View,
} from "../styling/SalonTracking";

//some constants
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = "AIzaSyARjyRyPhNoOKCNv4bS1W7zP-1reTQElFs";

//styling of view
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//class SalonTracking
class SalonTrackingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: {},
      coordinatesEnd: {},
      isLoading: false,
      distance: null,
      latitude: this.props.navigation.state.params.items.Latitude,
      longitude: this.props.navigation.state.params.items.Longitude,
      items: this.props.navigation.state.params.items,
      points: [],
    };
    this.mapView = null;
  }

  //header SalonTrackingServices
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Maps",
      headerLeft: (
        <Icon
          onPress={() => navigation.goBack()}
          name="back"
          type="AntDesign"
          style={{ marginLeft: 10 }}
        />
      ),
    };
  };

  //showing nearest salon or salon
  componentDidMount() {
    {
      this.state.latitude && this.state.longitude
        ? this.getInitialState()
        : null;
    }
  }

  //map ready
  onReady = (result) => {
    this.mapView.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: width / 10,
        bottom: height / 10,
        left: width / 10,
        top: height / 10,
      },
    });
  };

  //getting data of current location
  getInitialState = () => {
    getLocation().then((data) => {
      var obj = {};
      obj["latitude"] = data.latitude;
      obj["longitude"] = data.longitude;
      objDestination = {};
      objDestination["latitude"] = this.state.latitude;
      objDestination["longitude"] = this.state.longitude;

      //measuring distance
      const distanceInM = geolib.getDistance(obj, objDestination);

      //converting distance from meters to kilometers
      const distance = geolib.convertDistance(distanceInM, "km");

      //setting states
      this.setState({
        currentPosition: data,
        coordinatesEnd: objDestination,
        distance,
      });
    });
  };

  //rendering
  render() {
    const { longitude, latitude } = this.state.coordinatesEnd;
    const { currentPosition, distance, isLoading } = this.state;
    const { items, points } = this.state;
    const salonName = this.props.navigation.state.params.items.SalonName;

    return (
      <Container>
        <Title>Locating Salon</Title>
        <Category>{salonName}</Category>
        <View>
          {latitude && longitude && (
            <View>
              <Blocked row style={{ textAlign: "center" }}>
                <Distance>
                  {distance.toFixed(2)} km away from current location{" "}
                </Distance>
              </Blocked>
              {!currentPosition.latitude && !currentPosition.longitude ? (
                <ActivityIndicator
                  animating={isLoading}
                  size={50}
                  color="blueviolet"
                />
              ) : (
                <MapView
                  initialRegion={{
                    latitude: this.state.currentPosition.latitude,
                    longitude: this.state.currentPosition.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }}
                  style={styles.container}
                  ref={(c) => (this.mapView = c)}
                  onPress={this.onMapPress}
                >
                  <MapViewDirections
                    origin={this.state.currentPosition}
                    destination={this.state.coordinatesEnd}
                    mode="DRIVING"
                    apikey={GOOGLE_MAPS_APIKEY}
                    language="en"
                    strokeWidth={4}
                    strokeColor="blueviolet"
                    onReady={this.onReady}
                    resetOnChange={false}
                  />
                  <Marker
                    pinColor="orange"
                    title={salonName}
                    description={`Distance is ${distance
                      .toFixed(2)
                      .toString()}`}
                    coordinate={{
                      latitude: latitude,
                      longitude: longitude,
                    }}
                  />
                  <MapView.Marker
                    pinColor="green"
                    title="Current location"
                    description="This is your current location"
                    coordinate={{
                      latitude: currentPosition.latitude,
                      longitude: currentPosition.longitude,
                    }}
                  />
                </MapView>
              )}
            </View>
          )}
        </View>
      </Container>
    );
  }
}

//exporting class SalonTrackingScreen
export default SalonTrackingScreen;
