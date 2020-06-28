//importing
import React, { Component } from "react";
import { Button } from "react-native-paper";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import {
  widthToDp,
  heightToDp,
  listenToOrientationChange,
  removeOrientationChange,
} from "../styling/responsive";

//class StartScreen
class SecondScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnMount() {
    removeOrientationChange();
  }

  componentDidMount() {
    listenToOrientationChange(this);
  }

  signin = () => {
    this.props.navigation.navigate("Login");
  };
  signup = () => {
    this.props.navigation.navigate("Registration");
  };
  //rendering
  render() {
    return (
      <ImageBackground
        source={require("../assets/images/second.jpg")}
        style={styles.image}
        imageStyle={{ resizeMode: "stretch" }}
        // type="stretch"
      >
        <View style={{ marginTop: heightToDp("50%") }}>
          <Text style={styles.text}>
            Book an Appointment for Salon & Barber
          </Text>

          <Button
            style={{
              marginTop: heightToDp("3%"),
              backgroundColor: "black",
              borderRadius: widthToDp("10%"),
              marginLeft: widthToDp("10%"),
              marginRight: widthToDp("10%"),
              borderColor: "blueviolet",
              color: "#eaeaec",
            }}
            mode="contained"
            uppercase={false}
            onPress={this.signin}
            contentStyle={{ height: heightToDp("7%") }}
          >
            Sign In
          </Button>
          <Button
            style={{
              marginTop: heightToDp("3%"),
              backgroundColor: "black",
              borderRadius: widthToDp("10%"),
              marginLeft: widthToDp("10%"),
              marginRight: widthToDp("10%"),
              borderColor: "blueviolet",
              color: "#eaeaec",
            }}
            mode="contained"
            uppercase={false}
            onPress={this.signup}
            contentStyle={{ height: heightToDp("7%") }}
          >
            Sign Up
          </Button>
        </View>
      </ImageBackground>
    );
  }
}

//exporting StartScreen
export default SecondScreen;

//styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    height: heightToDp("100%"),
    top: 0,
    bottom: 0,
  },
  image: {
    width: widthToDp("100%"),
    height: heightToDp("100%"),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },
  text: {
    color: "white",
    fontSize: widthToDp("10%"),
    textAlign: "center",
    fontWeight: "bold",
  },
});
