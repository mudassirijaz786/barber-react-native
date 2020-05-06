//importing
import React, { Component } from "react";
import DatePicker from "react-native-datepicker";
import { CardItem, Left, Body, Right, Icon } from "native-base";
import Axios from "axios";
import { showMessage } from "react-native-flash-message";
import { Picker, AsyncStorage } from "react-native";
import {
  Container,
  Title,
  AppointmentButton,
  Select,
  ContentForCard,
  CardPaper,
} from "../styling/Appointment";

//exporting AppointmentScreen
export default class AppointmentScreen extends Component {
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
  };

  //header appointment
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Appointment",
      headerLeft: (
        <Icon
          onPress={() => navigation.goBack()}
          name="back"
          type="AntDesign"
          style={{ marginLeft: 10 }}
        />
      ),
    };
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
        " this.props.navigation.state.params.items._id",
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
    console.log("Service id", "this.props.navigation.state.params.items._id");
  }

  async getToken() {
    try {
      const value = await AsyncStorage.getItem("x-auth-token");
      if (value !== null) {
        console.log(value);
      }
    } catch (error) {}
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
      const value = await AsyncStorage.getItem("x-auth-token");
      Axios({
        url:
          "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/book/appointment/" +
          "this.props.navigation.state.params.items._id",
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
          showMessage({
            message: "Appointment is booked",
            type: "success",
          });
          this.props.navigation.navigate("SlotsAvailing");
        })
        .catch((error) => {
          console.log(error);
          showMessage({
            message: "Appoitnment is not booked",
            type: "danger",
          });
        });
    });
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
    let jsonStringfy = JSON.stringify(concate);
    console.log(jsonStringfy.split(":")[0]);
    console.log(jsonStringfy.split(":")[1]);
  };
  render() {
    const { date } = this.state;

    console.log(date);
    return (
      <Container>
        <Title>Appoint this service</Title>
        <ContentForCard>
          <CardPaper>
            <CardItem bordered>
              <Left>
                <Body>
                  <DatePicker
                    style={{ width: 200, marginLeft: 80 }}
                    date={this.state.booking_date}
                    mode="date"
                    placeholder="Select Date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
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
                    }}
                    onDateChange={(date) => {
                      this.datePick(date);
                    }}
                    minuteInterval={8}
                  />
                </Body>
              </Left>
            </CardItem>
            <CardItem header>
              <Left>
                <Select> Select Hour</Select>
              </Left>
              <Right>
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
              </Right>
            </CardItem>
            <CardItem body>
              <Left>
                <Select> Select minutes</Select>
              </Left>
              <Right>
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
              </Right>
            </CardItem>
            <CardItem footer>
              <Left>
                <Select> Select mode</Select>
              </Left>
              <Right>
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
              </Right>
            </CardItem>
          </CardPaper>
          <AppointmentButton
            mode="outlined"
            uppercase={false}
            contentStyle={{ height: 50 }}
            onPress={this.handleSubmit}
          >
            Schedule an appointment
          </AppointmentButton>
        </ContentForCard>
      </Container>
    );
  }
}
