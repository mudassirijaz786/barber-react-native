//importing
import React, { Component } from "react";
import DatePicker from "react-native-datepicker";
import { CardItem, Left, Body, Right, Icon } from "native-base";
import Axios from "axios";
import { showMessage } from "react-native-flash-message";
import { Picker, AsyncStorage } from "react-native";
import moment from "moment";
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

  //date picked
  datePick = (date) => {
    this.setState({ booking_date: date });
  };

  //handling date submission
  handleSubmit = async () => {
    var obj = {};
    const h = this.state.selecthour;
    const i = this.state.slectmin;
    const j = this.state.selectslot;
    const f = h + ":" + i + " " + j;
    this.setState({ stating_time: f }, async () => {
      obj["booking_date"] = this.state.booking_date;
      obj["stating_time"] = this.state.stating_time;
      obj["current_date"] = moment().format("YYYY-MM-DD");
      obj["salon_id"] = this.props.navigation.state.params.items.Salon_id;
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
          showMessage({
            message: "",
            description: "You have successfully booked Appointment",
            type: "success",
          });
          this.props.navigation.navigate("SlotsAvailing");
        })
        .catch((error) => {
          showMessage({
            message: "Error in scheduling a service",
            description:
              "Appoitnment is not booked due to wrong time selection",
            type: "danger",
          });
        });
    });
  };

  //rendering
  render() {
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
                        borderColor: "transparent",
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
