//importing
import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Animated,
  Text,
  ImageBackground,
} from "react-native";

/* Logo */
import {
  Container,
  Title,
  Forget,
  SignupLink,
  InputField,
  SigninButton,
  Blocked,
  Error,
} from "../styling/Login";

//class StartScreen
class SecondScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //animations goes here
  componentDidMount() {}
  signin = () => {
    this.props.navigation.navigate("Login");
  };
  signup = () => {
    this.props.navigation.navigate("Registration");
  };
  //rendering
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/second_screen.png")}
          style={styles.image}
        >
          <View style={{ marginTop: 150 }}>
            <SigninButton
              mode="outlined"
              uppercase={false}
              onPress={this.signin}
              contentStyle={{ height: 50 }}
            >
              Sign In
            </SigninButton>
            <SigninButton
              mode="outlined"
              uppercase={false}
              onPress={this.signup}
              contentStyle={{ height: 50 }}
            >
              Sign Up
            </SigninButton>
          </View>
          <Text style={styles.text}>
            Book an Appointment for Salon & Barber
          </Text>
        </ImageBackground>
      </View>
    );
  }
}

//exporting StartScreen
export default SecondScreen;

//styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 0.8,
  },
  text: {
    top: 100,
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});
