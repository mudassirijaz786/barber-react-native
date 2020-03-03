import React, { Component } from "react";
import DatePicker from "react-native-datepicker";
import { Alert, StyleSheet, View, Button, Text, Picker } from "react-native";
import RNSchedule from "rnschedule";
import { Avatar, Card, Title, Paragraph, Image } from "react-native-paper";

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
    this.state = {
      date: "",
      hours: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
      ],
      minute: ["15", "30", "45"],
      slot: ["am", "pm"],
      concatDate: "",
      selecthour: "",
      slectmin: "",
      selectslot: ""
    };
  }

  datePick = date => {
    this.setState({ date: date });
    console.log(date);
  };

  concatDate = e => {
    console.log("concatDAte ");
    console.log(this.state.selecthour);
    console.log(this.state.slectmin);
    console.log(this.state.selectslot);

    const concate = { ...this.state.selecthour };
    const concat2 = { ...this.state.slectmin };
    const concat3 = { ...this.state.selectslot };
    //  var obj = Object.assign({}, concate, concat2, concat3);
    //  console.log(obj);
    //  const fulldate = concate + concat2 + concat3;
    let jsonStringfy = JSON.stringify(concate);
    console.log(jsonStringfy.split(":")[0]);
    console.log(jsonStringfy.split(":")[1]);
  };
  render() {
    const { date } = this.state;
    console.log(date);
    return (
      <View style={{ marginTop: 30 }}>
        <Text style={{ textAlign: "center" }}>Please select date</Text>
        <DatePicker
          style={{ width: 200, marginLeft: 80 }}
          date={this.state.date}
          mode="datetime"
          placeholder="select date"
          format="YYYY-MM-DD-h-mm-a"
          // minDate="2016-05-01"
          maxDate="2020-03-25"
          confirmBtnText="Confirm"
          minTime="09-30"
          maxTime="13-20"
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
          minuteInterval={8}
        />
        {/* <RNSchedule dataArray={data} onEventPress={appt => console.log(appt)} /> */}

        <Picker
          selectedValue={this.state.selecthour}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ selecthour: itemValue })
          }
        >
          {this.state.hours.map(option => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
        <Picker
          selectedValue={this.state.slectmin}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ slectmin: itemValue })
          }
        >
          {this.state.minute.map(option => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
        <Picker
          selectedValue={this.state.selectslot}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ selectslot: itemValue })
          }
        >
          {this.state.slot.map(option => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
        <Button title="Press me" color="#f194ff" onPress={this.concatDate} />
        <Card style={{ marginTop: 30 }}>
          <Card.Content>
            <Title>Your selected datetime</Title>
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
