import React, { Component } from "react";
import DatePicker from "react-native-datepicker";
import { Alert, StyleSheet, View, AsyncStorage, Text } from "react-native";
import RNSchedule from "rnschedule";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Image
} from "react-native-paper";

const data = [
  {
    title: "Lunch Appointment",
    subtitle: "With Harry",
    start: new Date(2020, 29, 2, 13, 20),
    end: new Date(2020, 29, 2, 14, 20),
    color: "#390099"
  }
];

export default class TimePick extends Component {
  constructor(props) {
    super(props);
    this.state = { time: "2020-03-03" };
  }

  datePick = date => {
    this.setState({ date: date });
    console.log(date);
  };

  render() {
    const { date } = this.state;
    console.log(date);
    return (
      <View>
        <Text style={{ textAlign: "center", marginTop: 30 }}>
          Please select date
        </Text>
        <DatePicker
          style={{ width: 200 }}
          date={this.state.date}
          mode="datetime"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2016-05-01"
          maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            this.datePick(date);
          }}
        />
        {/* <RNSchedule dataArray={data} onEventPress={appt => console.log(appt)} /> */}
        <Card style={{ marginTop: 30 }}>
          <Card.Content>
            <Title>{this.state.date}</Title>
            <Paragraph> {this.state.date}</Paragraph>
          </Card.Content>
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
