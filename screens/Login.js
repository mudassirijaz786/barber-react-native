import React, { Component } from "react";
import { Alert, StyleSheet, View, Text, Picker } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Block } from "galio-framework";

export default class Login extends Component {
  state = {};

  render() {
    return (
      <View style={{ marginTop: 100 }}>
        <Button
          onPress={() => this.props.navigation.navigate("ViewAppointment")}
        >
          view appointment
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 200
  },
  input: {
    margin: 10
  }
});
