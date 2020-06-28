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
import _ from "lodash";
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
  Name,
  ServiceButton,
  Time,
  Reviews,
  ServiceImage,
  Filter,
  Blocked,
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
        url + "/salonservices/" + this.props.navigation.state.params.items._id,
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
    await this.gettingServices();
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

  //sorting services on rating basis
  onRatingSort() {
    const ratedService = _.sortBy(this.state.services, [
      function (service) {
        return service.ServiceAvgRating;
      },
    ]).reverse();
    this.setState({ services: ratedService });
  }

  //rendering
  render() {
    const { search, services, isLoading, isFetching } = this.state;
    return (
      <Container>
        <Title>Availible Services</Title>
        <Name>{this.props.navigation.state.params.items.SalonName}</Name>
        <SearchBar
          round
          placeholderTextColor="#808080"
          lightTheme
          containerStyle={{ backgroundColor: "transparent" }}
          inputContainerStyle={{ backgroundColor: "#e4e4e5", borderRadius: 50 }}
          placeholder="Search service by name"
          onChangeText={this.updateSearch}
          value={search}
          showLoading={isLoading}
        />
        {services.length === 0 && (
          <NoService>Sorry, No service to display</NoService>
        )}
        <Blocked row>
          <Filter>Sort by rating</Filter>
          <Icon
            size={30}
            name="sort"
            type="MaterialIcons"
            style={{ color: "#eb6709" }}
            onPress={() => this.onRatingSort()}
          />
        </Blocked>
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
