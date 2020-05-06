//importing
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import SalonTrackingScreen from "./SalonTrackingScreen";
import ServicesScreen from "./ServicesScreen";
import { Icon } from "native-base";

//exporting MapandServicesScreen
export default class MapandServicesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.navigation.state.params.items,
    };
  }

  //header profile
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Salon Map and Services",
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

  //rendering
  render() {
    const { items } = this.state;
    return (
      <View style={styles.container}>
        <SalonTrackingScreen items={items} />
        <ServicesScreen items={items} navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
