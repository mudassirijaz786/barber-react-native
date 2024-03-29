//importing
import { Text } from "galio-framework";
import React, { Component } from "react";
import {
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Left, Right, CardItem, Body, Icon } from "native-base";
import Axios from "axios";
import { showMessage } from "react-native-flash-message";
import decode from "jwt-decode";
import { url } from "./config.json";

import {
  Container,
  Title,
  CardPaper,
  ServiceName,
  NoService,
  ContentForCard,
  Category,
  ServiceButton,
  Time,
  Reviews,
  ServiceImage,
  Price,
} from "../styling/Services";

//exporting FavouriteServices
export default class FavouriteServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      isLoading: false,
      search: "",
      filterServices: [],
      isFetching: false,
    };
  }

  //header Services
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Favourite Services",
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

  //getting services from salon id in props
  componentDidMount() {
    this.gettingFavouriteServices();
  }

  gettingFavouriteServices = async () => {
    this.setState({ isLoading: true });

    //getting token from local storage
    value = await AsyncStorage.getItem("x-auth-token");
    await Axios({
      url: url + "/book/appointment/favourites",
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
          filterServices: response.data,
        });
      })
      .catch((error) => {
        showMessage({
          message: "Error in getting services",
          description:
            "We are sorry but there exists error while fetching services",
          type: "danger",
        });
      });
    this.setState({ isLoading: false });
  };
  //moving to Service
  onPressed(items) {
    this.props.navigation.navigate("Service", { items: items });
  }

  //updating search
  updateSearch = (search) => {
    const newData = this.state.filterServices.filter((item) => {
      //applying filter on basis of service name
      const itemData = item.serviceName
        ? item.serviceName.toLowerCase()
        : "".toLowerCase();
      const textData = search.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ search, services: newData });
  };

  //implement pulling request on refresh
  onRefresh = async () => {
    this.setState({ isFetching: true });
    await this.gettingFavouriteServices();
    this.setState({ isFetching: false });
  };

  //rendering services
  renderingServices = ({ item }) => {
    return (
      <ContentForCard>
        <CardPaper
          containerStyle={{ elevation: 16 }}
          style={{ borderRadius: 12 }}
        >
          <CardItem
            header
            bordered
            style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
          >
            <Left>
              <TouchableOpacity onPress={() => this.onPressed(item)}>
                <ServiceImage source={{ uri: item.image_url }} />
              </TouchableOpacity>
              <Body>
                <TouchableOpacity onPress={() => this.onPressed(item)}>
                  <ServiceName>{item.serviceName}</ServiceName>
                  <Text muted>{item.serviceDescription}</Text>
                </TouchableOpacity>

                <Category>{item.service_category}</Category>
                <Text muted>
                  Service time <Time>{item.service_time}</Time> minutes
                </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem
            footer
            style={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}
          >
            <Left>
              <TouchableOpacity>
                <ServiceButton
                  mode="outlined"
                  uppercase={false}
                  contentStyle={{ height: 30 }}
                  onPress={() => this.onPressed(item)}
                >
                  Explore
                </ServiceButton>
              </TouchableOpacity>
            </Left>
            <Body>
              <Reviews>Reviews: {item.ServiceAvgRating}</Reviews>
            </Body>
            <Right>
              <Text>
                <Price> {item.servicePrice} </Price> Rs
              </Text>
            </Right>
          </CardItem>
        </CardPaper>
      </ContentForCard>
    );
  };
  //rendering
  render() {
    const { search, services, isLoading, isFetching } = this.state;
    return (
      <Container>
        <Title>Favourite Services</Title>
        <SearchBar
          round
          placeholderTextColor="#808080"
          lightTheme
          containerStyle={{ backgroundColor: "transparent" }}
          inputContainerStyle={{ backgroundColor: "#e4e4e5", borderRadius: 50 }}
          placeholder="Search favourite service by name"
          onChangeText={this.updateSearch}
          value={search}
          showLoading={isLoading}
        />
        {services.length === 0 && (
          <NoService>Sorry, No service to display</NoService>
        )}
        {isLoading ? (
          <ActivityIndicator
            animating={isLoading}
            size={50}
            color="blueviolet"
          />
        ) : (
          <FlatList
            data={services}
            renderItem={this.renderingServices}
            onRefresh={this.onRefresh}
            refreshing={isFetching}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </Container>
    );
  }
}
