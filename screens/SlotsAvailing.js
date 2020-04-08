import React, { Component } from "react";
import DatePicker from "react-native-datepicker";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  Picker,
  ScrollView,
  AsyncStorage,
} from "react-native";
import { Block } from "galio-framework";
import { showMessage, hideMessage } from "react-native-flash-message";
import decode from "jwt-decode";
import moment from "moment";
import RNSchedule from "rnschedule";
import {
  Avatar,
  Card,
  Paragraph,
  Image,
  Button,
  Title,
} from "react-native-paper";
import Axios from "axios";
export default class SlotsAvailing extends Component {
  constructor(props) {
    super(props);
    this.state = { date: "", responseData: [123] };
  }

  datePick = (date) => {
    console.log(this.state.date);
  };

  async componentDidMount() {
    var date = moment().utcOffset("PST").format("YYYY-MM-DD hh:mm:ss a");
    this.setState({
      date,
    });

    value = await AsyncStorage.getItem("x-auth-token");

    decodedValue = decode(value);
    console.log("decoded value of token in home screen", decodedValue.id);

    var obj = {};

    obj["current_date"] = date;

    // obj["current_date"] = "123";

    console.log("obj before post request", obj);
    Axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/customer/schedule",

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
        this.setState({ responseData: response.data });

        // this.props.navigation.navigate("Home");
      })

      // console.log("IN COMPONENT DID MOUNT", this.state.name);

      .catch((error) => {
        // console.log(error);
        showMessage({
          message: { error },
          type: "danger",
        });
        // alert(error);

        // console.log("url", url);
      });
  }

  getTimeAndDate() {
    var date = moment().utcOffset("PST").format("YYYY-MM-DD hh:mm:ss a");
    console.log("DATE AND TIME", date);
  }

  render() {
    console.log("responseData", this.state.responseData);

    if (this.state.responseData.length == 0) {
      return <Text>You have no serive to display </Text>;
    }
    return (
      <Block
        style={{
          flex: 1,
          resizeMode: "cover",
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "#dddddd",
          marginLeft: 18,
          marginRight: 18,
        }}
      >
        <Card key={this.state.responseData._id}>
          <Card.Title
            title={this.state.responseData.Salon_id}
            subtitle={this.state.responseData.service_id}
          />
          <Card.Content>
            <Title>{this.state.responseData.stating_time}</Title>
            <Paragraph>{this.state.responseData.ending_time}</Paragraph>
          </Card.Content>
        </Card>
      </Block>
    );

    // return this.state.responseData.map(items => {
    //   return (
    //     <Block
    //       style={{
    //         flex: 1,
    //         resizeMode: "cover",
    //         borderRadius: 5,
    //         borderWidth: 1,
    //         borderColor: "#dddddd",
    //         marginLeft: 18,
    //         marginRight: 18
    //       }}
    //     >
    //       <Card key={items._id}>
    //         <Card.Title title={items.Salon_id} subtitle={items.service_id} />
    //         <Card.Content>
    //           <Title>{items.stating_time}</Title>
    //           <Paragraph>{items.ending_time}</Paragraph>
    //         </Card.Content>
    //       </Card>
    //     </Block>
    //   );
    // });
  }
}
