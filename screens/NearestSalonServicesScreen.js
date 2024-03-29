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
  ServiceImage,
  Price,
} from "../styling/Services";

//exporting NearestSalonServicesScreen
export default class NearestSalonServicesScreen extends Component {
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
      title: "Services",
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

  //getting services from salon id in props
  componentDidMount() {
    this.gettingServices();
  }

  gettingServices = async () => {
    this.setState({ isLoading: true });

    //getting token from local storage
    value = await AsyncStorage.getItem("x-auth-token");
    await Axios({
      url:
        url + "/salonservices/" + this.props.navigation.state.params.item._id,
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
          message: { error },
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
    await this.gettingServices();
    this.setState({ isFetching: false });
  };

  //rendering services
  renderingServices = ({ item }) => {
    return (
      <ContentForCard>
        <CardPaper elevation={10}>
          <CardItem header>
            <Left>
              <ServiceImage source={{ uri: item.image_url }} />
              <Body>
                <ServiceName>{item.serviceName}</ServiceName>
                <Text muted>{item.serviceDescription}</Text>
                <Category>{item.service_category}</Category>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
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
        <Title>Availible Services of Nearest salon</Title>
        <Category>{this.props.navigation.state.params.item.SalonName}</Category>
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
        {services.length === 0 && (
          <NoService>Sorry, No service to display</NoService>
        )}
        {isLoading ? (
          <ActivityIndicator size={50} color="blueviolet" />
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
