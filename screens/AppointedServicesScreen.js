//importing
import React, { Component } from "react";
import { Text, AsyncStorage, TouchableOpacity } from "react-native";
import { Body, CardItem, Icon } from "native-base";
import moment from "moment";
import { ActivityIndicator } from "react-native-paper";
import Axios from "axios";
import {
  Container,
  Title,
  NoService,
  ContentForCard,
  ServiceName,
  CardPaper,
  Price,
  Open,
  AppointmentButton,
  Close,
  Description,
} from "../styling/AppointedServices";

//exporting class AppointedServicesScreen
export default class AppointedServicesScreen extends Component {
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

  //header appointed service
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Appointed service",
      headerLeft: (
        <Icon
          onPress={() => navigation.openDrawer()}
          name="menu"
          type="MaterialIcons"
          style={{ marginLeft: 10 }}
        />
      ),
    };
  };

  //getting current appointed service
  async componentDidMount() {
    this.setState({ isLoading: true });
    var date = moment().utcOffset("PST").format("YYYY-MM-DD hh:mm:ss a");
    this.setState({
      date,
    });

    //getting token from local storage
    value = await AsyncStorage.getItem("x-auth-token");
    var obj = {};
    obj["current_date"] = date;
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
      .then((response) => {
        this.setState({ responseData: response.data });
        console.log("response", response);
      })
      .catch((error) => {
        console.log("error", error);
        this.setState({ noHistory: "No appointment" });
      });
    this.setState({ isLoading: false });
  }

  //rendering
  render() {
    const { isLoading, responseData, noHistory } = this.state;
    return (
      <Container>
        <Title>Availible services</Title>
        {isLoading && (
          <ActivityIndicator
            animating={this.state.isLoading}
            size="large"
            color="blueviolet"
          />
        )}
        {Object.keys(responseData).length === 0 && (
          <NoService>{noHistory}</NoService>
        )}
        <ContentForCard>
          {Object.keys(responseData).length !== 0 && (
            <CardPaper elevation={10} key={responseData}>
              <CardItem header>
                <Body>
                  <ServiceName>{responseData.Salon_id}</ServiceName>
                  <Price>{responseData.service_id}</Price>
                  <Text>
                    Booking date
                    <Description> {responseData.booking_date}</Description>
                  </Text>
                  <Text>
                    Starting time
                    <Open> {responseData.stating_time}</Open>
                  </Text>

                  <Text>
                    Ending time
                    <Close> {responseData.ending_time}</Close>
                  </Text>
                  <TouchableOpacity>
                    <AppointmentButton
                      mode="outlined"
                      uppercase={false}
                      contentStyle={{ height: 30 }}
                    >
                      {responseData.service_status}
                    </AppointmentButton>
                  </TouchableOpacity>
                </Body>
              </CardItem>
            </CardPaper>
          )}
        </ContentForCard>
      </Container>
    );
  }
}
