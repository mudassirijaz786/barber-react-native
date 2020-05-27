//importing
import React from "react";
import {
  AsyncStorage,
  TouchableOpacity,
  FlatList,
  Alert,
  TouchableHighlight,
} from "react-native";
import { Text } from "galio-framework";
import { ActivityIndicator } from "react-native-paper";
import { SearchBar } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import Axios from "axios";
import { Left, Right, CardItem, Icon } from "native-base";
import { getLocation } from "../components/location-service";
import _ from "lodash";
import * as geolib from "geolib";
import {
  Container,
  Title,
  Filter,
  SalonName,
  Blocked,
  CardPaper,
  NoSalon,
  ContentForCard,
  SalonButton,
  Distance,
  Open,
  Close,
} from "../styling/Salons";

//export class SalonsScreen
export default class SalonsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      salons: [],
      isLoading: false,
      search: "",
      filterSalons: [],
      isFetching: false,
    };
  }

  //header salon
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Salons",
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

  //getting salons method
  async componentDidMount() {
    await this.gettingSalons();
    await this.getInitialState();
  }

  //getting data of current location and setting distance in salon
  getInitialState = async () => {
    const { salons } = { ...this.state };
    getLocation().then((data) => {
      var currentLocation = {};
      currentLocation["latitude"] = data.latitude;
      currentLocation["longitude"] = data.longitude;
      for (let i = 0; i < salons.length; i++) {
        const element = salons[i];
        var salonLocation = {};
        salonLocation["latitude"] = element.Latitude;
        salonLocation["longitude"] = element.Longitude;
        const distanceInM = geolib.getDistance(currentLocation, salonLocation);
        const distance = geolib.convertDistance(distanceInM, "km");
        if (distance === 1) {
          salons[salons.indexOf(element)]["distance"] = distanceInM.toFixed(2);
        } else {
          salons[salons.indexOf(element)]["distance"] = distance.toFixed(2);
        }
      }
      this.setState({ salons, isLoading: false });
    });
  };

  //getting data from backend
  gettingSalons = async () => {
    //getting token from local storage
    const value = await AsyncStorage.getItem("x-auth-token");
    this.setState({ isLoading: true });

    //getting salons from backend
    await Axios({
      url:
        "https://digital-salons-app.herokuapp.com/Digital_Saloon.com/api/SalonSignUp",
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-auth-token": value,
      },
    })
      .then((response) => {
        //setting salons to state
        this.setState({
          salons: response.data,
          filterSalons: response.data,
        });
      })
      .catch((error) => {
        showMessage({
          message: "Error in getting salons",
          description:
            "We are sorry, but salon cannot be listed at this moment",
          type: "danger",
        });
      });
    this.setState({ isLoading: false });
  };

  //moving to MapsAndService
  onPressed(items) {
    this.props.navigation.navigate("MapandServices", { items: items });
  }

  //moving filtered salon to MapsAndService
  onLocationFilter(items) {
    this.props.navigation.navigate("NearestSalonMap", { items: items });
  }

  //implement pulling request on refresh
  onRefresh = async () => {
    this.setState({ isFetching: true });
    await this.gettingSalons();
    this.setState({ isFetching: false });
  };

  //updating search field
  updateSearch = (search) => {
    const newData = this.state.filterSalons.filter((item) => {
      //applying filter by salon name
      const itemData = item.SalonName
        ? item.SalonName.toLowerCase()
        : "".toLowerCase();
      const textData = search.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ search, salons: newData });
  };

  //confirmation message before sorting on the basis of distance
  confirmationBeforSorting = (salons) => {
    Alert.alert(
      "Do you want to sort salons?",
      `On distance basis?`,
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
        { text: "Sort", onPress: () => this.onDistanceSort(salons) },
      ],
      { cancelable: false }
    );
  };

  //sorting salons on distance basis
  onDistanceSort() {
    const distanceSalons = _.sortBy(this.state.salons, [
      function (salon) {
        return salon.distance;
      },
    ]);
    this.setState({ salons: distanceSalons });
  }

  //rendering salons
  renderingSalon = ({ item }) => {
    return (
      <ContentForCard>
        <CardPaper elevation={10}>
          <CardItem header>
            <TouchableOpacity onPress={() => this.onPressed(item)}>
              <SalonName>{item.SalonName}</SalonName>
            </TouchableOpacity>
          </CardItem>
          <CardItem>
            <Left>
              <Text>
                Shop Open Time<Open>{item.Salon_opening_hours}</Open>
              </Text>
            </Left>
            <Right>
              <Text>
                Shop Close Time<Close> {item.Salon_closing_hours}</Close>
              </Text>
            </Right>
          </CardItem>

          <CardItem>
            <Left>
              <TouchableOpacity>
                <SalonButton
                  mode="outlined"
                  uppercase={false}
                  contentStyle={{ height: 30 }}
                  onPress={() => this.onPressed(item)}
                >
                  Explore maps and services
                </SalonButton>
              </TouchableOpacity>
            </Left>
            <Right>
              <Distance>{item.distance} km away</Distance>
            </Right>
          </CardItem>
        </CardPaper>
      </ContentForCard>
    );
  };

  //rendering
  render() {
    const { search, salons, isLoading, isFetching } = this.state;
    return (
      <Container>
        <Blocked row>
          <Filter>See Nearest Salon</Filter>
          <Icon
            size={30}
            name="filter-outline"
            type="MaterialCommunityIcons"
            style={{ color: "#eb6709" }}
            onPress={() => this.onLocationFilter(salons)}
          />
        </Blocked>
        <Title>Availible salons</Title>
        <SearchBar
          round
          placeholderTextColor="#808080"
          lightTheme
          containerStyle={{ backgroundColor: "transparent" }}
          inputContainerStyle={{ backgroundColor: "#e4e4e5", borderRadius: 50 }}
          placeholder="Search salon by name"
          onChangeText={this.updateSearch}
          value={search}
          showLoading={isLoading}
        />
        <Blocked row>
          <Filter>Sort by distance</Filter>
          <Icon
            size={30}
            name="sort"
            type="MaterialIcons"
            style={{ color: "#eb6709" }}
            onPress={() => this.onDistanceSort()}
          />
        </Blocked>
        {salons.length === 0 && isLoading && (
          <NoSalon>Sorry, No salon to display</NoSalon>
        )}
        {isLoading ? (
          <ActivityIndicator
            animating={this.state.isLoading}
            size="large"
            color="blueviolet"
          />
        ) : (
          <FlatList
            data={salons}
            renderItem={this.renderingSalon}
            onRefresh={this.onRefresh}
            refreshing={isFetching}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </Container>
    );
  }
}
