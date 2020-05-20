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
      filteredResult: [],
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
        obj1["name"] = this.state.items[i].SalonName;
        //pushing created object in array
        points.push(obj1);

        //get the object as empty to fill it again
        obj1 = {};
      }

      //find the nearest coordinate
      const bounds1 = geolib.findNearest(obj, points);
      const filtered = this.state.items.filter((item) => {
        return item.Latitude === bounds1.latitude;
      });

      // console.log(filtered._id);
      const filteredResult = filtered[0];

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
        filteredResult,
      });
    });
  };

  filterServices(filteredResult) {
    this.props.navigation.navigate("NearestSalonServices", {
      item: filteredResult,
    });
  }

  //rendering
  render() {
    const { longitude, latitude } = this.state.coordinatesEnd;
    const {
      currentPosition,
      distance,
      filteredResult,
      items,
      points,
    } = this.state;

    return (
      <Container>
        <Title>Nearest Salon </Title>
        <View>
          <Blocked flex={0.18}>
            <Text style={{ textAlign: "center" }}>
              Tap on salon name to see services
            </Text>
            <Category onPress={() => this.filterServices(filteredResult)}>
              {filteredResult.SalonName}
            </Category>
            <Distance> at {distance} km </Distance>
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
                onReady={this.onReady}
                resetOnChange={false}
              />
              <Marker
                pinColor="orange"
                title={filteredResult.SalonName}
                description={`Distance is ${distance.toFixed(2).toString()}`}
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
              {points.map((point) => (
                <Marker
                  pinColor="aqua"
                  coordinate={point}
                  title={point.name}
                  description="This is other salon"
                />
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
