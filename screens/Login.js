import React, { Component } from "react";
import DatePicker from "react-native-datepicker";
import { Alert, StyleSheet, View, Button, Text, Picker } from "react-native";
import RNSchedule from "rnschedule";
import { Avatar, Card, Title, Paragraph, Image } from "react-native-paper";
import Axios from "axios";

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
  state = {
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
    selectslot: "",
    stating_time: "",
    booking_date: ""
  };

  fun = () => {
    console.log("moment.fn.format");
    const h = this.state.selecthour;
    const i = this.state.slectmin;
    const j = this.state.selectslot;
    const f = h + ":" + i + " " + j;
    this.setState({ c: f });
    console.log("DATE", f);
  };
  datePick = date => {
    this.setState({ booking_date: date });
    console.log("DATE", date);
  };

  async timeSelect(JsonObj) {
    const response = await fetch(
      "https://digital-salon-app.herokuapp.com/Digital_Saloon.com/api/book/appointment",
      {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(JsonObj)
      }
    );
    console.log("RESPONSE APPOINTMENT");
  }

  okTime = () => {
    const h = this.state.selecthour;
    const i = this.state.slectmin;
    const j = this.state.selectslot;
    const f = h + ":" + i + " " + j;
    this.setState({ stating_time: f });
  };
  handleSubmit = () => {
    var obj = {};
    console.log("moment.fn.format");
    const h = this.state.selecthour;
    const i = this.state.slectmin;
    const j = this.state.selectslot;
    const f = h + ":" + i + " " + j;
    console.log("before starting time", this.state.stating_time);
    this.setState({ stating_time: f }, async () => {
      obj["booking_date"] = this.state.booking_date;
      obj["stating_time"] = this.state.stating_time;
      Axios({
        url:
          "https://digital-salon-app.herokuapp.com/Digital_Saloon.com/api/book/appointment",
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        data: {
          booking_date: this.state.booking_date,
          stating_time: this.state.stating_time
        }
      })
        .then(response => {
          console.log("RESPONSE", response.data);
          // List_of_services = { ...this.state.List_of_services0 };
          // List_of_services = response;
        })

        // console.log("IN COMPONENT DID MOUNT", this.state.name);

        .catch(function(error) {
          alert(error);
        });
    });
  };
  // console.log("f", f);

  // console.log("booking_date: ", this.state.booking_date);
  // console.log("stating_time: ", this.state.stating_time);

  // obj["booking_date"] = this.state.booking_date;
  // obj["stating_time"] = this.state.stating_time;
  // this.timeSelect(obj);

  prit = () => {
    console.log("stating_time: ", this.state.stating_time);
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
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
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
        {/* <Button title="ok" color="#f194ff" onPress={this.okTime} /> */}
        <Button title="Press me" color="#f194ff" onPress={this.handleSubmit} />
        {/* <Button title="See states" color="#f194ff" onPress={this.prit} /> */}
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
