import React, { Component } from "react";
import DatePicker from "react-native-datepicker";
import {
  Alert,
  StyleSheet,
  View,
  Button,
  Text,
  Picker,
  AsyncStorage,
} from "react-native";
import RNSchedule from "rnschedule";
import { Avatar, Card, Title, Paragraph, Image } from "react-native-paper";
import Axios from "axios";
import { showMessage, hideMessage } from "react-native-flash-message";

const data = [
  {
    title: "Lunch Appointment",
    subtitle: "With Harry",
    start: new Date(2020, 29, 2, 13, 20),
    end: new Date(2020, 29, 2, 14, 20),
    color: "#390099",
  },
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
      "12",
    ],
    minute: ["15", "30", "45"],
    slot: ["am", "pm"],
    concatDate: "",
    selecthour: "",
    slectmin: "",
    selectslot: "",
    stating_time: "",
    booking_date: "",
    itemId: this.props.navigation.state.params.items._id,
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
  datePick = (date) => {
    this.setState({ booking_date: date });
    console.log("DATE", date);
  };

  async timeSelect(JsonObj) {
    value = await AsyncStorage.getItem("x-auth-token");

    await fetch(
      "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/book/appointment/" +
        this.props.navigation.state.params.items._id,
      {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "x-auth-token": value,
        },
        body: JSON.stringify(JsonObj),
      }
    )
      .then((response) => {
        showMessage({
          message: "Appointment is booked message",
          type: "info",
        });
        console.log("RESPONSE APPOINTMENT", response);
      })
      .catch((err) => {
        showMessage({
          message: "Appoitnment is not booked",
          type: "danger",
        });
        console.log(err);
      });
  }

  componentDidMount() {
    console.log(
      "TOKEN IN TIME COMPONENT",
      AsyncStorage.getItem("x-auth-token")
    );
  }

  async getToken() {
    try {
      const value = await AsyncStorage.getItem("x-auth-token");
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
    // console.log(
    //   "TOKEN IN TIME COMPONENT",
    //   AsyncStorage.getItem("x-auth-token")
    // );
  }
  okTime = () => {
    const h = this.state.selecthour;
    const i = this.state.slectmin;
    const j = this.state.selectslot;
    const f = h + ":" + i + " " + j;
    this.setState({ stating_time: f });
  };
  handleSubmit = async () => {
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

      console.log("Data which is going to be post", obj);
      // try {
      //   const value = await AsyncStorage.getItem("x-auth-token");
      //   if (value !== null) {
      //     // We have data!!
      //     console.log(value);
      //   }
      // } catch (error) {
      //   // Error retrieving data
      // }
      const value = await AsyncStorage.getItem("x-auth-token");

      Axios({
        url:
          "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/book/appointment/" +
          this.props.navigation.state.params.items._id,
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "x-auth-token": value,
        },
        data: obj,
      })
        .then((response) => {
          console.log("RESPONSE OBJECT", response.data);
          // console.log("value of token", value);
          // List_of_services = { ...this.state.List_of_services0 };
          // List_of_services = response;
          // this.setState({ List_of_services: response.data });
          showMessage({
            message: "Appointment is booked",
            type: "success",
          });
          this.props.navigation.navigate("Home");
        })

        // console.log("IN COMPONENT DID MOUNT", this.state.name);

        .catch((error) => {
          // console.log(error);
          showMessage({
            message: "Appoitnment is not booked",
            type: "danger",
          });
          // alert(error);

          // console.log("url", url);
        });

      // const response = await fetch(
      //   "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/book/appointment",
      //   {
      //     method: "post",
      //     headers: {
      //       Accept: "application/json, text/plain, */*",
      //       "Content-Type": "application/json",
      //       "x-auth-token": value
      //     },
      //     body: JSON.stringify(obj)
      //   }
      // ).then(res => {
      //   console.log("RESPONSE OBJECT", res);
      // });

      // console.log("RESPONSE APPOINTMENT", response);
      // console.log(obj);
    });
    // console.log("f", f);

    // console.log("booking_date: ", this.state.booking_date);
    // console.log("stating_time: ", this.state.stating_time);

    // obj["booking_date"] = this.state.booking_date;
    // obj["stating_time"] = this.state.stating_time;
    // this.timeSelect(obj);
  };

  prit = () => {
    console.log("stating_time: ", this.state.stating_time);
  };
  concatDate = (e) => {
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
        <Text>Service Id: {this.props.navigation.state.params.items._id}</Text>
        <DatePicker
          style={{ width: 200, marginLeft: 80 }}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          // minDate="2016-05-01"
          // maxDate="2020-03-25"
          confirmBtnText="Confirm"
          minTime="09-30"
          maxTime="13-20"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {
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
          {this.state.hours.map((option) => (
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
          {this.state.minute.map((option) => (
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
          {this.state.slot.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
        {/* <Button title="ok" color="#f194ff" onPress={this.okTime} /> */}
        <Button title="Press me" color="#f194ff" onPress={this.handleSubmit} />
        {/* <Button title="See states" color="#f194ff" onPress={this.prit} /> */}
        <Button
          title="Get Token"
          color="#f194ff"
          onPress={this.getToken}
        ></Button>
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
    marginTop: 200,
  },
  input: {
    margin: 10,
  },
});
