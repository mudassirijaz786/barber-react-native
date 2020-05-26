//importing
import React, { Component } from "react";
import { Body, CardItem, Icon, Right, Left } from "native-base";
import { Block } from "galio-framework";
import { ActivityIndicator } from "react-native-paper";
import Axios from "axios";
import { showMessage } from "react-native-flash-message";
import { AirbnbRating } from "react-native-elements";
import moment from "moment";
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
  RatingText,
  CardPaper,
  Price,
  SalonName,
  Close,
} from "../styling/AppointedServices";

//exporting class AppointedServicesScreen
export default class AppointedServicesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      appointedServices: [],
      ratingGiven: false,
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
      `Appointed on ${date}`,
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
    value = await AsyncStorage.getItem("x-auth-token");
    var obj = {};
    obj["current_date"] = moment().format("YYYY-MM-DD");
    // obj["current_date"] = new Date();

    await Axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/customer/schedule",
      method: "POST",
      data: obj,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": value,
      },
    })
      .then((response) => {
        this.setState({
          appointedServices: response.data,
        });
        console.log(this.state.app);
      })
      .catch((error) => {
        showMessage({
          message: "There might be no appoinments",
          description:
            "There occured an error getting appointments from backend",
          type: "info",
        });
      });

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
      .then((response) => {
        showMessage({
          message: "Appointment is deleted",
          description: "You have deleted the appointment successfully",
          type: "success",
        });
        const { appointedServices } = this.state;
        const result = appointedServices.filter((item) => item._id !== id);
        this.setState({ appointedServices: result });
      })
      .catch((err) => {
        showMessage({
          message: "Error in appointment deletion",
          description: "There occured an error while deleting appointment",
          type: "danger",
        });
      });
  };

  //refreshing appointments
  onRefresh = async () => {
    this.setState({ isFetching: true });
    await this.gettingAppointedServices();
    this.setState({ isFetching: false });
  };

  //confirmation message before giving rating
  confirmationBeforRating = (rating, id) => {
    Alert.alert(
      "Do you wanna rate an availed service?",
      `You have selected rating as ${rating} out of 5`,
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
        //if user press rate it now then call to ratingCompleted
        {
          text: "Rate it now",
          onPress: () => this.ratingCompleted(rating, id),
        },
      ],
      { cancelable: false }
    );
  };

  ratingCompleted = async (rating, id) => {
    value = await AsyncStorage.getItem("x-auth-token");
    var obj = {};
    obj["rating"] = rating;
    await Axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/service/rating/" +
        id,
      method: "POST",
      data: obj,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": value,
      },
    })
      .then((response) => {
        showMessage({
          message: "Rating to an availed appointment",
          description: "You have successfully given rating to an Appointment",
          type: "success",
        });
        this.setState({ ratingGiven: true });
      })
      .catch((error) => {
        showMessage({
          message: "Error in giving rating to appoitment",
          description: "Appointment cannot be rated due to some issue",
          type: "danger",
        });
      });
  };

  renderingAppointedServices = ({ item }) => {
    return (
      <ContentForCard>
        {item.service_status ? (
          <CardPaper containerStyle={{ elevation: 16 }}>
            {this.state.ratingGiven ? (
              <Text>You have given rating</Text>
            ) : (
              <CardPaper>
                <RatingText>Please give rating on availed service</RatingText>
                <AirbnbRating
                  count={5}
                  reviews={["Terrible", "Bad", "Normal", "Good", "Amazing"]}
                  defaultRating={4}
                  onFinishRating={(rating, id) =>
                    this.confirmationBeforRating(rating, item._id)
                  }
                  size={30}
                />
              </CardPaper>
            )}
          </CardPaper>
        ) : (
          <CardPaper containerStyle={{ elevation: 16 }}>
            <CardItem header>
              <SalonName>{item.Salon_id}</SalonName>
            </CardItem>
            <CardItem style={{ marginLeft: 73 }}>
              <Block>
                <Close>
                  Timings: from {item.stating_time} to {item.ending_time}
                </Close>
                <ServiceName>
                  Booked at: {item.booking_date.split("", 10)}
                </ServiceName>
              </Block>
            </CardItem>
            <CardItem footer>
              <Left>
                <Price>{item.service_id}</Price>
              </Left>
              <Right>
                <TouchableOpacity>
                  <Icon
                    onPress={() =>
                      this.confirmationBeforDeletion(
                        item._id,
                        item.booking_date
                      )
                    }
                    name="delete-outline"
                    type="MaterialCommunityIcons"
                    style={{ color: "red", fontSize: 30 }}
                  />
                </TouchableOpacity>
              </Right>
            </CardItem>
          </CardPaper>
        )}
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
