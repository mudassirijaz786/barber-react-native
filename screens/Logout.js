//importing
import { Container, Title } from "../styling/Logout";
import React, { Component } from "react";
import { AsyncStorage } from "react-native";

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
    this.logout();
  }

  render() {
    return (
      <Container>
        <Title>Logging off</Title>
      </Container>
    );
  }
}
