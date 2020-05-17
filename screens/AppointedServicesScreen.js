//importing
import React, { Component } from "react";
import { Body, CardItem, Icon, Right, Left } from "native-base";
import { ActivityIndicator } from "react-native-paper";
import Axios from "axios";
import { showMessage } from "react-native-flash-message";
import {
  Text,
  AsyncStorage,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
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
      isFetching: false,
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

  //confirmation message before deletion
  confirmationBeforDeletion = (id, date) => {
    Alert.alert(
      "Do you wanna delete an appointment?",
      `appointed on ${date}`,
      [
        {
          text: "Ask me later",
          onPress: () => console.log(),
        },
        {
          text: "Cancel",
          onPress: () => console.log(),
          style: "cancel",
        },
        //if user press delete then call to deleteAppointedService
        { text: "Delete", onPress: () => this.deleteAppointedService(id) },
      ],
      { cancelable: false }
    );
  };

  //getting current appointed service
  async componentDidMount() {
    this.gettingAppointedServices();
  }

  // loading data from backend
  gettingAppointedServices = async () => {
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
      })
      .catch((error) => {});
    this.setState({ isLoading: false });
  };

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

  onRefresh = async () => {
    this.setState({ isFetching: true });
    await this.gettingAppointedServices();
    this.setState({ isFetching: false });
  };

  renderingAppointedServices = ({ item }) => {
    return (
      <ContentForCard>
        <CardPaper elevation={10}>
          <CardItem header>
            <Body>
              <ServiceName>{item.Salon_id}</ServiceName>
              <Price>
                <Text>
                  Starting time
                  <Open> {item.stating_time}</Open>
                </Text>
              </Price>

              <Price>{service_id}</Price>
              <Price>
                <Text>
                  Ending time
                  <Close> {item.ending_time}</Close>
                </Text>
              </Price>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Text>
                Booking date:
                <Description> {item.booking_date}</Description>
              </Text>
            </Left>
            <Right>
              <TouchableOpacity>
                <Icon
                  onPress={() =>
                    this.confirmationBeforDeletion(item._id, item.booking_date)
                  }
                  name="delete-outline"
                  type="MaterialCommunityIcons"
                  style={{ color: "red", fontSize: 30 }}
                />
              </TouchableOpacity>
            </Right>
          </CardItem>
        </CardPaper>
      </ContentForCard>
    );
  };

  //rendering
  render() {
    const { isLoading, appointedServices, isFetching } = this.state;
    return (
      <Container>
        <Title>Availible services for today</Title>
        {appointedServices.length === 0 && (
          <NoService>you have no service appointmented for today</NoService>
        )}
        {isLoading ? (
          <ActivityIndicator
            animating={isLoading}
            size="large"
            color="blueviolet"
          />
        ) : (
          <FlatList
            data={appointedServices}
            renderItem={this.renderingAppointedServices}
            onRefresh={this.onRefresh}
            refreshing={isFetching}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </Container>
    );
  }
}
