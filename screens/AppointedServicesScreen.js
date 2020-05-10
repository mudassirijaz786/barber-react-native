//importing
import React, { Component } from "react";
import { Text, AsyncStorage, TouchableOpacity } from "react-native";
import { Body, CardItem, Icon, Right, Left } from "native-base";
import { ActivityIndicator } from "react-native-paper";
import Axios from "axios";
import { showMessage } from "react-native-flash-message";
import {
  Container,
  Title,
  NoService,
  ContentForCard,
  ServiceName,
  CardPaper,
  Price,
  Open,
  Close,
  Description,
} from "../styling/AppointedServices";

//exporting class AppointedServicesScreen
export default class AppointedServicesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      appointedServices: [],
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

    //getting token from local storage
    value = await AsyncStorage.getItem("x-auth-token");
    var obj = {};
    obj["current_date"] = new Date();
    await Axios({
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
        this.setState({
          appointedServices: response.data,
        });
        console.log("appointed services", this.state.appointedServices);
      })
      .catch((error) => {
        console.log("error", error);
      });
    this.setState({ isLoading: false });
  }

  //deleting an appointed service from list of appointments
  deleteAppointedService = async (id) => {
    value = await AsyncStorage.getItem("x-auth-token");
    Axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/book/appointment/" +
        id,
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": value,
      },
    })
      .then((res) => {
        showMessage({
          message: "Appointment is deleted successfully",
          type: "success",
        });
        const { appointedServices } = this.state;
        const result = appointedServices.filter((item) => item._id !== id);
        this.setState({ appointedServices: result });
      })
      .catch((err) => {
        showMessage({
          message: "There occured an error",
          type: "danger",
        });
      });
  };

  //rendering
  render() {
    const { isLoading, appointedServices } = this.state;
    return (
      <Container>
        <Title>Availible services for today</Title>
        {isLoading && (
          <ActivityIndicator
            animating={isLoading}
            size="large"
            color="blueviolet"
          />
        )}
        {appointedServices.length === 0 && (
          <NoService>you have no service appointmented for today</NoService>
        )}
        <ContentForCard>
          {appointedServices.length !== 0 &&
            appointedServices.map((items, index) => {
              return (
                <CardPaper elevation={10} key={index}>
                  <CardItem header>
                    <Body>
                      <ServiceName>{items.Salon_id}</ServiceName>
                      <Price>
                        <Text>
                          Starting time
                          <Open> {items.stating_time}</Open>
                        </Text>
                      </Price>

                      <Price>
                        <Text>
                          Ending time
                          <Close> {items.ending_time}</Close>
                        </Text>
                      </Price>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Text>
                        Booking date:
                        <Description> {items.booking_date}</Description>
                      </Text>
                    </Left>
                    <Right>
                      <TouchableOpacity>
                        <Icon
                          onPress={() => this.deleteAppointedService(items._id)}
                          name="delete-outline"
                          type="MaterialCommunityIcons"
                        />
                      </TouchableOpacity>
                    </Right>
                  </CardItem>
                </CardPaper>
              );
            })}
        </ContentForCard>
      </Container>
    );
  }
}
