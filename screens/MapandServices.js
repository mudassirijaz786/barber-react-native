import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import MapContainer from "./DistanceAlongServices";
import ServicesScreen from "./ServicesScreen";
import { Title } from "react-native-paper";
export default class MapandServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.navigation.state.params.items,
    };
  }
  render() {
    const { items } = this.state;
    return (
      <View style={styles.container}>
        {/* <MapContainer items={items} /> */}

        <ServicesScreen items={items} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
