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
import {
  Left,
  Right,
  // Title,
  Card,
  Icon,
  Content,
  Thumbnail,
  Grid,
  Col,
  Header,
  CheczkBox,
  Body,
  Container,
  CardItem,
} from "native-base";
import { SearchBar } from "react-native-elements";

import { Block, theme } from "galio-framework";
import { showMessage, hideMessage } from "react-native-flash-message";
import decode from "jwt-decode";
import moment from "moment";
import RNSchedule from "rnschedule";
import {
  Avatar,
  Paragraph,
  Image,
  Button,
  Title,
  ActivityIndicator,
} from "react-native-paper";
import Axios from "axios";

res = [
  { service_time: "ewewqe", date: "e32231" },
  { service_time: "ewewqe", date: "e32231" },
  { service_time: "ewewqe", date: "e32231" },
];
export default class SlotsAvailing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      isLoading: false,

      responseData: {},
      search: "",
      arrayholder: {},
      noHistory: "",
    };
  }

  datePick = (date) => {
    console.log(this.state.date);
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    var date = moment().utcOffset("PST").format("YYYY-MM-DD hh:mm:ss a");
    this.setState({
      date,
    });

    value = await AsyncStorage.getItem("x-auth-token");

    // decodedValue = decode(value);
    // console.log("decoded value of token in home screen", decodedValue.id);

    var obj = {};

    obj["current_date"] = date;

    // obj["current_date"] = "123";

    // console.log("obj before post request", obj);
    const request = await Axios({
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
      // if (response.status === 400) {
      //   this.setState({ noHistory: "No appointment today", isLoading: false });
      //   console.log("404", noHistory);
      // } else {
      //   this.setState({ responseData: response.data });
      //   // console.log("response", response.data);
      // }
      .then((response) => {
        // if (typeof response.data === "string") {
        //   this.setState({
        //     responseData: "yo dont have any service which is going to avail",
        //   });
        // } else {
        this.setState({ responseData: response.data });

        console.log("response", response);

        // }
      })

      .catch((error) => {
        console.log("error", error);
        this.setState({ noHistory: "No appointment" });
      });
    this.setState({ isLoading: false });
  }

  getTimeAndDate() {
    var date = moment().utcOffset("PST").format("YYYY-MM-DD hh:mm:ss a");
    console.log("DATE AND TIME", date);
  }

  render() {
    const { isLoading, responseData, noHistory } = this.state;
    console.log("responseData", responseData);
    console.log("noHistory", noHistory);

    return (
      <Container>
        <Title
          style={{
            textAlign: "center",
            color: "indigo",
            fontSize: 30,
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          Availible services
        </Title>

        {isLoading && (
          <ActivityIndicator
            animating={this.state.isLoading}
            size="large"
            color="#0000ff"
            style={{ marginTop: 350 }}
          />
        )}
        {Object.keys(responseData).length === 0 && (
          <Title
            style={{
              textAlign: "center",
              color: "red",
              fontSize: 30,
              marginTop: 50,
            }}
          >
            {noHistory}
          </Title>
        )}
        <Content style={{ flex: 1 }}>
          <View style={{ boderColor: "indigo" }}>
            {Object.keys(responseData).length !== 0 && (
              <Card style={{ alignItems: "center" }} elevation={8}>
                <CardItem header>
                  <Left>
                    <View style={{ alignItems: "flex-start", top: -10 }}>
                      <Title>{responseData.Salon_id}</Title>
                      <Text style={{ color: "indigo", fontSize: 24 }}>
                        {responseData.service_id}
                      </Text>
                      <View
                        style={{
                          alignItems: "flex-end",
                          marginTop: 20,
                        }}
                      >
                        <Text muted>
                          Starting Time: {responseData.stating_time}
                        </Text>
                        <Text muted>
                          Ending Time: {responseData.ending_time}
                        </Text>
                      </View>
                    </View>
                  </Left>
                </CardItem>
                {/* <CardItem cardBody>
                </CardItem> */}
                <CardItem footer>
                  <Left>
                    <View
                      style={{
                        alignItems: "flex-start",
                        top: -10,
                        marginLeft: 0,
                      }}
                    >
                      <Text color={theme.COLORS.PRIMARY}>
                        {responseData.booking_date}
                      </Text>
                      <Text>Customer ID: {responseData.customer_id}</Text>
                    </View>
                  </Left>
                  <Right>
                    <Text style={{ color: "green", fontSize: 30 }}>
                      {responseData.service_status}
                    </Text>
                  </Right>
                </CardItem>
              </Card>
            )}
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 40,
    marginLeft: 10,
  },
});
