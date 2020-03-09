import React, { Component } from "react";
import { Alert, StyleSheet, View, Text, Picker } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Block } from "galio-framework";

export default class ViewAppointment extends Component {
  state = {};
  cancelAppointment() {
    console.log("Appointment Schedule Canceled");
  }

  render() {
    return (
      <View style={{ marginTop: 100 }}>
        <Text style={{ textAlign: "center" }}>Appointment Details</Text>
        <Card elevation={12} style={{ margin: 20 }}>
          <Card.Title title="Tommy and guy" subtitle="Hair cut" />
          <Card.Content>
            <Paragraph>Start timings: 10:30</Paragraph>
            <Paragraph>Start timings: 11:30</Paragraph>
          </Card.Content>

          <Card.Actions>
            <Button
              mode="contained"
              style={{ color: "black" }}
              onPress={() => this.props.navigation.navigate("SignIn")}
            >
              cancel appointment
            </Button>
            <Block row>
              <Block>
                <Text size={16}>Total ammount 300 rupees</Text>
              </Block>
            </Block>
          </Card.Actions>
        </Card>
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
