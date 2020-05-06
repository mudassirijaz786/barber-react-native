//importing
import { Text } from "galio-framework";
import React, { Component } from "react";
import { TouchableOpacity, AsyncStorage } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SearchBar } from "react-native-elements";
import { Left, Right, CardItem, Body } from "native-base";
import Axios from "axios";
import { showMessage } from "react-native-flash-message";
import {
  Container,
  Title,
  CardPaper,
  ServiceName,
  NoService,
  ContentForCard,
  Category,
  ServiceButton,
  ServiceImage,
  Price,
} from "../styling/Services";

//exporting ServicesScreen
export default class ServicesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      isLoading: false,
      search: "",
      filterTheServices: [123],
    };
  }

  //getting services from salon id in props
  async componentDidMount() {
    this.setState({ isLoading: true });

    //getting token from local storage
    value = await AsyncStorage.getItem("x-auth-token");
    await Axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/salonservices/" +
        this.props.items._id,
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": value,
      },
    })
      .then((response) => {
        //setting services to state
        this.setState({
          services: response.data,
          filterTheServices: response.data,
        });
      })
      .catch((error) => {
        showMessage({
          message: { error },
          type: "danger",
        });
      });
    this.setState({ isLoading: false });
  }

  //moving to Service
  onPressed(items) {
    this.props.navigation.navigate("Service", { items: items });
  }

  //updating search
  updateSearch = (search) => {
    const newData = this.state.filterTheServices.filter((item) => {
      //applying filter on basis of service name
      const itemData = item.serviceName
        ? item.serviceName.toLowerCase()
        : "".toLowerCase();
      const textData = search.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ search, services: newData });
  };

  //rendering
  render() {
    const { search } = this.state;
    return (
      <Container>
        <Title>Availible services</Title>
        <SearchBar
          round
          placeholderTextColor="blueviolet"
          underlineColorAndroid="blueviolet"
          lightTheme
          inputContainerStyle={{ backgroundColor: "transparent" }}
          containerStyle={{ backgroundColor: "transparent" }}
          placeholder="Search service by name..."
          onChangeText={this.updateSearch}
          value={search}
          showLoading={this.state.isLoading}
        />
        {this.state.isLoading ? (
          <ActivityIndicator
            animating={this.state.isLoading}
            size="large"
            color="blueviolet"
          />
        ) : (
          <ContentForCard>
            {this.state.services.length !== 0 &&
              this.state.services.map((items, index) => {
                return (
                  <CardPaper elevation={10} key={index}>
                    <CardItem header>
                      <Left>
                        <ServiceImage source={{ uri: items.image_url }} />
                        <Body>
                          <ServiceName>{items.serviceName}</ServiceName>
                          <Text muted>{items.serviceDescription}</Text>
                        </Body>
                      </Left>
                      <Right>
                        <Category>{items.service_category}</Category>
                      </Right>
                    </CardItem>
                    <CardItem>
                      <Left>
                        <TouchableOpacity>
                          <ServiceButton
                            mode="outlined"
                            uppercase={false}
                            contentStyle={{ height: 30 }}
                            onPress={() => this.onPressed(items)}
                          >
                            Explore
                          </ServiceButton>
                        </TouchableOpacity>
                      </Left>
                      <Right>
                        <Text>
                          <Price> {items.servicePrice} Rs</Price>
                        </Text>
                      </Right>
                    </CardItem>
                  </CardPaper>
                );
              })}
            {this.state.services.length == 0 && (
              <NoService>Sorry, No service to display</NoService>
            )}
          </ContentForCard>
        )}
      </Container>
    );
  }
}
