import React, { Component } from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";

import { ActivityIndicator } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import * as geolib from "geolib";
import { Title } from "react-native-paper";

import MapViewDirections from "react-native-maps-directions";
import { getLocation, geocodeLocationByName } from "./location-service";
import { Button } from "react-native-paper";
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = "AIzaSyARjyRyPhNoOKCNv4bS1W7zP-1reTQElFs";

const styles = StyleSheet.create({
  versionBox: {
    position: "absolute",
    bottom: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  versionText: {
    padding: 4,
    backgroundColor: "#FFF",
    color: "#000",
  },
  container: {
    flex: 1,
  },
});

class DistanceAlongServices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPosition: {},
      coordinatesEnd: {},
      distance: null,
      // jb distance krna ho bs
      latitude: this.props.items.Latitude,
      longitude: this.props.items.Longitude,
      // jb nearest krna ho bs
      items: this.props.items,
      points: [123],
    };

    this.mapView = null;
  }
  componentDidMount() {
    {
      this.state.items ? this.getNearestState() : null;
    }
    {
      this.state.latitude && this.state.longitude
        ? this.getInitialState()
        : null;
    }
  }

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

  onError = (errorMessage) => {
    console.log(errorMessage); // eslint-disable-line no-console
  };

  setDistance = (distance, duration_in_traffic) => {
    this.setState({
      distance: parseFloat(distance),
      durationInTraffic: parseInt(duration_in_traffic),
    });
  };

  getInitialState = () => {
    getLocation().then((data) => {
      // console.log("Current lat", data.latitude);
      // console.log("Current lng", data.longitude);

      var obj = {};

      obj["latitude"] = data.latitude;
      obj["longitude"] = data.longitude;

      // console.log("Current Position", data);

      objDestination = {};
      // objDestination["latitude"] =  31.472692;
      // objDestination["longitude"] =  74.278677;
      objDestination["latitude"] = this.state.latitude;
      objDestination["longitude"] = this.state.longitude;
      // console.log("Destination Position", objDestination);

      const distanceInM = geolib.getDistance(obj, objDestination);

      const distance = geolib.convertDistance(distanceInM, "km");
      // console.log("Distance", distanceInKM / 1000);
      this.setState({
        currentPosition: data,
        coordinatesEnd: objDestination,
        distance,
      });
      // console.log("obj destination", objDestination);
    });
  };

  getNearestState = () => {
    getLocation().then((data) => {
      //   console.log("data current location", data);
      var obj = {};

      obj["latitude"] = data.latitude;
      obj["longitude"] = data.longitude;
      //   console.log("obj current location", obj);

      let points = [];
      let obj1 = {};

      for (let i = 0; i < this.state.items.length; i++) {
        obj1["latitude"] = this.state.items[i].Latitude;
        obj1["longitude"] = this.state.items[i].Longitude;
        points.push(obj1);
        obj1 = {};
      }
      //   console.log("array points", points);

      const bounds1 = geolib.findNearest(obj, points);
      //   console.log(bounds1);
      const distanceInM = geolib.getDistance(obj, bounds1);
      const distance = geolib.convertDistance(distanceInM, "km");

      //   console.log(distance);
      this.setState({
        currentPosition: obj,
        coordinatesEnd: bounds1,
        distance,
        points,
      });
    });
  };

  render() {
    const { longitude, latitude } = this.state.coordinatesEnd;
    const { currentPosition, distance } = this.state;
    const { items, points } = this.state;
    const length = Object.keys(items).length;
    // const { language, longitude } = this.state.currentPosition;

    // console.log("lng ", longitude);
    // console.log("items ", items);

    return (
      <View style={styles.container}>
        <Title>Maps</Title>

        {length == 6 && (
          <View style={styles.container}>
            {latitude && longitude && (
              <View style={styles.container}>
                <Text>Distance: {distance} km</Text>
                {!currentPosition.latitude && !currentPosition.longitude && (
                  <ActivityIndicator
                    animating={this.state.isLoading}
                    size="large"
                    color="#0000ff"
                    style={{ top: 250 }}
                  />
                )}

                {currentPosition.latitude && currentPosition.longitude && (
                  <MapView
                    initialRegion={{
                      latitude: this.state.currentPosition.latitude,
                      longitude: this.state.currentPosition.longitude,
                      latitudeDelta: LATITUDE_DELTA,
                      longitudeDelta: LONGITUDE_DELTA,
                    }}
                    style={styles.container}
                    ref={(c) => (this.mapView = c)} // eslint-disable-line react/jsx-no-bind
                    onPress={this.onMapPress}
                  >
                    <MapViewDirections
                      origin={this.state.currentPosition}
                      destination={this.state.coordinatesEnd}
                      // waypoints={this.state}
                      mode="DRIVING"
                      apikey={GOOGLE_MAPS_APIKEY}
                      language="en"
                      strokeWidth={4}
                      strokeColor="black"
                      onStart={(params) => {
                        console.log(
                          `Started routing between "${params.origin}" and "${params.destination}"`
                        );
                      }}
                      onReady={this.onReady}
                      onError={(errorMessage) => {
                        console.log(errorMessage);
                      }}
                      resetOnChange={false}
                    />
                    <Marker
                      title={distance.toString()}
                      description="This is a description"
                      coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                      }}
                    />

                    <MapView.Marker
                      title="This is a title"
                      description="This is a description"
                      coordinate={{
                        latitude: currentPosition.latitude,
                        longitude: currentPosition.longitude,
                      }}
                    />
                  </MapView>
                )}
              </View>
            )}

            {/* <Text>dasdasdddddd</Text> */}
          </View>
        )}

        {length != 6 && (
          <View style={styles.container}>
            <Text>Distance: {distance} km</Text>
            {!currentPosition.latitude && !currentPosition.longitude && (
              <ActivityIndicator
                animating={this.state.isLoading}
                size="large"
                color="#0000ff"
                style={{ top: 250 }}
              />
            )}

            {currentPosition.latitude && currentPosition.longitude && (
              <MapView
                initialRegion={{
                  latitude: this.state.currentPosition.latitude,
                  longitude: this.state.currentPosition.longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}
                style={styles.container}
                ref={(c) => (this.mapView = c)} // eslint-disable-line react/jsx-no-bind
                onPress={this.onMapPress}
              >
                <MapViewDirections
                  origin={this.state.currentPosition}
                  destination={this.state.coordinatesEnd}
                  // waypoints={this.state}
                  mode="DRIVING"
                  apikey={GOOGLE_MAPS_APIKEY}
                  language="en"
                  strokeWidth={4}
                  strokeColor="black"
                  onStart={(params) => {
                    console.log(
                      `Started Nearest routing between "${params.origin}" and "${params.destination}"`
                    );
                  }}
                  onReady={this.onReady}
                  onError={(errorMessage) => {
                    console.log(errorMessage);
                  }}
                  resetOnChange={false}
                />
                <Marker
                  title={distance.toString()}
                  description="This is a description"
                  coordinate={{
                    latitude: latitude,
                    longitude: longitude,
                  }}
                />

                <MapView.Marker
                  title="This is a title"
                  description="This is a description"
                  coordinate={{
                    latitude: currentPosition.latitude,
                    longitude: currentPosition.longitude,
                  }}
                />
                {points.map((point) => (
                  <Marker coordinate={point} title="Other Salon" />
                ))}
              </MapView>
            )}
          </View>
        )}
      </View>
    );
  }
}

export default DistanceAlongServices;
