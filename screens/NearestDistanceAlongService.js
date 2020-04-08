import React, { Component } from "react";
import { Dimensions, StyleSheet, View, Text, AsyncStorage } from "react-native";

import { ActivityIndicator } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import * as geolib from "geolib";
import Axios from "axios";
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
    justifyContent: "flex-end"
  },
  versionText: {
    padding: 4,
    backgroundColor: "#FFF",
    color: "#000"
  },
  container: {
    flex: 1,
    top: 30
  }
});

class NearestDistanceAlongService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPosition: {},
      coordinatesEnd: {},
      distance: null,
      listOfLatlng: [123],
      Latlng: [123],
      points: [123]
    };

    this.mapView = null;
  }

  async componentDidMount() {
    value = await AsyncStorage.getItem("x-auth-token");

    this.setState({ isLoading: true });
    await Axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/SalonSignUp",
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6dHJ1ZSwiaWQiOiI1ZTcwYTliODAyZDc0MjAwMTdjYzkyNjMiLCJpYXQiOjE1ODU3MzUwNzN9.ALDXfQ6lhQ9GAZPo2eO4Tdu-QwSHq2r3xIK9g2eaZxg"
      }
    })
      .then(response => {
        // console.log("RESPONSE OBJECT", response.data);

        this.setState({ listOfLatlng: response.data });
      })

      .catch(error => {
        showMessage({
          message: { error },
          type: "danger"
        });
      });
    this.setState({ isLoading: false });
    this.getInitialState();
  }

  onReady = result => {
    this.mapView.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: width / 10,
        bottom: height / 10,
        left: width / 10,
        top: height / 10
      }
    });
  };

  onError = errorMessage => {
    console.log(errorMessage); // eslint-disable-line no-console
  };

  setDistance = (distance, duration_in_traffic) => {
    this.setState({
      distance: parseFloat(distance),
      durationInTraffic: parseInt(duration_in_traffic)
    });
  };

  getInitialState = () => {
    getLocation().then(data => {
      //   console.log("data current location", data);
      var obj = {};

      obj["latitude"] = data.latitude;
      obj["longitude"] = data.longitude;
      //   console.log("obj current location", obj);

      let points = [];
      let obj1 = {};

      for (let i = 0; i < this.state.listOfLatlng.length; i++) {
        obj1["latitude"] = this.state.listOfLatlng[i].Latitude;
        obj1["longitude"] = this.state.listOfLatlng[i].Longitude;
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
        points
      });
    });
  };

  render() {
    const {
      currentPosition,
      coordinatesEnd,
      distance,
      points,
      listOfLatlng
    } = this.state;
    console.log("points in render", points);
    return (
      //   <View style={{ top: 100 }}>
      //     <Text>distance {distance}</Text>
      //     <Text>destination latitude{coordinatesEnd.latitude}</Text>
      //     <Text>destination longitude{coordinatesEnd.longitude}</Text>
      //     <Text>current latitude = {currentPosition.latitude}</Text>
      //     <Text>current longitude = {currentPosition.longitude}</Text>
      //   </View>

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
              longitudeDelta: LONGITUDE_DELTA
            }}
            style={styles.container}
            ref={c => (this.mapView = c)} // eslint-disable-line react/jsx-no-bind
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
              onStart={params => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination}"`
                );
              }}
              onReady={this.onReady}
              onError={errorMessage => {
                console.log(errorMessage);
              }}
              resetOnChange={false}
            />
            <Marker
              title={distance.toString()}
              description="This is a description"
              coordinate={{
                latitude: currentPosition.latitude,
                longitude: currentPosition.longitude
              }}
            />

            <Marker
              title="This is a title"
              description="This is a description"
              coordinate={{
                latitude: coordinatesEnd.latitude,
                longitude: coordinatesEnd.longitude
              }}
            />

            {points.map(point => (
              <Marker coordinate={point} title="Other Salon" />
            ))}
          </MapView>
        )}
      </View>
    );
  }
}

export default NearestDistanceAlongService;
