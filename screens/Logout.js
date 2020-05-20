//importing
import { Container, Title } from "../styling/Logout";
import React, { Component } from "react";
import { AsyncStorage, Alert } from "react-native";

//exporting logout screen
export default class Logout extends Component {
  constructor(props) {
    super(props);
  }

  //logging out
  logout = async () => {
    this.setState({ loading: true });
    await AsyncStorage.removeItem("x-auth-token");
    this.props.navigation.navigate("Login");
  };

  //calling logout
  componentDidMount() {
    Alert.alert(
      "Logout",
      `Please confirm before logging out`,
      [
        {
          text: "Ask me later",
          onPress: () => console.log(),
        },
        {
          text: "Cancel",
          onPress: () => console.log(),
          style: "cancel",
        },
        //if user press delete then call to deleteAppointedService
        { text: "Logout", onPress: () => this.logout() },
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      <Container>
        <Title>Logging off?</Title>
      </Container>
    );
  }
}
