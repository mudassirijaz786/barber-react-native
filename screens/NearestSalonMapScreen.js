//importing
import React, { Component } from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
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

//class NearestSalonMapScreen
class NearestSalonMapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: {},
      coordinatesEnd: {},
      distance: null,
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
      this.state.items ? this.getNearestState() : null;
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

  //error in maps
  onError = (errorMessage) => {
    console.log(errorMessage);
  };

  //getting current position
  getNearestState = () => {
    getLocation().then((data) => {
      var obj = {};
      obj["latitude"] = data.latitude;
      obj["longitude"] = data.longitude;
      let points = [];
      let obj1 = {};

      //getting and setting latitude and longitude of all salons
      for (let i = 0; i < this.state.items.length; i++) {
        obj1["latitude"] = this.state.items[i].Latitude;
        obj1["longitude"] = this.state.items[i].Longitude;

        //pushing created object in array
        points.push(obj1);

        //get the object as empty to fill it again
        obj1 = {};
      }

      //find the nearest coordinate
      const bounds1 = geolib.findNearest(obj, points);

      //measuring distance from current location to that nearest coordinate
      const distanceInM = geolib.getDistance(obj, bounds1);

      //converting distance from meters to kilometers
      const distance = geolib.convertDistance(distanceInM, "km");

      //setting states
      this.setState({
        currentPosition: obj,
        coordinatesEnd: bounds1,
        distance,
        points,
      });
    });
  };

  //rendering
  render() {
    const { longitude, latitude } = this.state.coordinatesEnd;
    const { currentPosition, distance } = this.state;
    const { items, points } = this.state;

    return (
      <Container>
        <Title>Nearest Salon</Title>
        <View>
          <Blocked row>
            <Text> Nearest Salon is locating at Distance of</Text>
            <Distance> {distance} km</Distance>
            <Text> from your current location</Text>
          </Blocked>
          {!currentPosition.latitude && !currentPosition.longitude && (
            <ActivityIndicator size="large" color="blueviolet" />
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
                title={`Distance`}
                description={`Distance is ${distance.toString()}`}
                coordinate={{
                  latitude: latitude,
                  longitude: longitude,
                }}
              />
              <MapView.Marker
                title="Current location"
                description="This is your current location"
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
      </Container>
    );
  }
}

//exporting class NearestSalonMapScreen
export default NearestSalonMapScreen;
