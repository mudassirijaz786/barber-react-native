//importing
import React, { Component } from "react";
import { Text, AsyncStorage } from "react-native";
import { Left, Right, Body, CardItem, Icon } from "native-base";
import moment from "moment";
import { ActivityIndicator } from "react-native-paper";
import Axios from "axios";
import {
  Container,
  Title,
  NoService,
  ContentForCard,
  ServiceName,
  Category,
  CardPaper,
  Price,
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
        {Object.keys(responseData).length !== 0 && (
          <ContentForCard>
            <CardPaper>
              <CardItem header>
                <Left>
                  <ServiceName>{responseData.service_id}</ServiceName>
                </Left>
                <Right>
                  <Category>{responseData.customer_id}</Category>
                </Right>
              </CardItem>
              <CardItem>
                <Body>
                  <Category>{responseData.stating_time}</Category>
                  <Category>{responseData.stating_time}</Category>
                </Body>
                <ServiceName>{responseData.Salon_id}</ServiceName>
              </CardItem>
              <CardItem>
                <Left>
                  <Description muted>{responseData.booking_date}</Description>
                </Left>
                <Right>
                  <Text>
                    <Price>{responseData.service_status}</Price>
                  </Text>
                </Right>
              </CardItem>
            </CardPaper>
          </ContentForCard>
        )}
      </Container>
    );
  }
}
