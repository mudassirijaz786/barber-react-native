//importing
import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Animated,
  Text,
  ActivityIndicator,
} from "react-native";
import {
  widthToDp,
  listenToOrientationChange,
  removeOrientationChange,
} from "../styling/responsive";

/* Logo */
import Logo from "../assets/images/start.png";

//class StartScreen
class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LogoAnime: new Animated.Value(0),
      LogoText: new Animated.Value(0),
      loadingSpinner: false,
    };
  }

  componentWillUnMount() {
    removeOrientationChange();
  }

  //animations goes here
  componentDidMount() {
    listenToOrientationChange(this);

    const { LogoAnime, LogoText } = this.state;
    Animated.parallel([
      Animated.spring(LogoAnime, {
        toValue: 1,
        tension: 30,
        friction: 1,
        duration: 1500,
      }).start(),
      Animated.timing(LogoText, {
        toValue: 1,
        duration: 2000,
      }),
    ]).start(() => {
      this.setState({
        loadingSpinner: true,
      });
      setTimeout(() => {
        this.props.navigation.navigate("Second");
      }, 1500);
    });
  }

  //rendering
  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: this.state.LogoAnime,
            top: this.state.LogoAnime.interpolate({
              inputRange: [0, 1],
              outputRange: [80, 0],
            }),
          }}
        >
          <Image source={Logo} style={{ width: 300, height: 300 }} />
          {this.state.loadingSpinner ? (
            <ActivityIndicator
              animating={this.state.loadingSpinner}
              size={50}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
              color="orange"
            />
          ) : null}
        </Animated.View>
        <Animated.View style={{ opacity: this.state.LogoText }}>
          <Text style={styles.logoTextOne}>Welcome </Text>
          <Text style={styles.logoTextTwo}>To</Text>
          <Text style={styles.logoTextThree}>Hairway</Text>
          <Text style={styles.logoTextFour}>By Mudassir & CO</Text>
        </Animated.View>
      </View>
    );
  }
}

//exporting StartScreen
export default StartScreen;

//styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    justifyContent: "center",
    alignItems: "center",
  },
  logoTextOne: {
    color: "blueviolet",
    textAlign: "center",
    fontSize: widthToDp("6%"),
    fontWeight: "bold",
  },
  logoTextTwo: {
    color: "orange",
    textAlign: "center",
    fontSize: widthToDp("10%"),
    fontWeight: "normal",
  },
  logoTextThree: {
    color: "blueviolet",
    textAlign: "center",
    fontSize: widthToDp("6%"),
    fontWeight: "600",
  },
  logoTextFour: {
    color: "blueviolet",
    textAlign: "center",
    fontSize: widthToDp("3%"),
    fontWeight: "600",
  },
});
