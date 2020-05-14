//importing
import React from "react";
import { AsyncStorage, TouchableOpacity, FlatList } from "react-native";
import { Text } from "galio-framework";
import { ActivityIndicator } from "react-native-paper";
import { SearchBar } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import Axios from "axios";
import { Left, Right, CardItem, Icon } from "native-base";
import decode from "jwt-decode";
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
  componentDidMount() {
    this.gettingSalons();
  }

  //getting data from backend
  gettingSalons = async () => {
    //getting token from local storage
    const value = await AsyncStorage.getItem("x-auth-token");
    const decoded = decode(value);
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
          message: { error },
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
  onFilter(items) {
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

  //rendering salons
  renderingSalon = ({ item }) => {
    return (
      <ContentForCard>
        <CardPaper elevation={10}>
          <CardItem header>
            <SalonName>{item.SalonName}</SalonName>
          </CardItem>
          <CardItem>
            <Left>
              <Text>
                Opening at <Open>{item.Salon_opening_hours}</Open>
              </Text>
            </Left>
            <Right>
              <Text>
                Closing at <Close> {item.Salon_closing_hours}</Close>
              </Text>
            </Right>
          </CardItem>
          <CardItem>
            <TouchableOpacity>
              <SalonButton
                mode="outlined"
                uppercase={false}
                contentStyle={{ height: 30 }}
                onPress={() => this.onPressed(item)}
              >
                See services
              </SalonButton>
            </TouchableOpacity>
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
          <Filter>Nearest Salon</Filter>
          <Icon
            size={30}
            name="filter-outline"
            type="MaterialCommunityIcons"
            style={{ color: "#eb6709" }}
            onPress={() => this.onFilter(salons)}
          />
        </Blocked>
        <Title>Availible salons</Title>
        <SearchBar
          round
          placeholderTextColor="blueviolet"
          underlineColorAndroid="blueviolet"
          lightTheme
          inputContainerStyle={{ backgroundColor: "transparent" }}
          containerStyle={{ backgroundColor: "transparent" }}
          placeholder="Search salon by name..."
          onChangeText={this.updateSearch}
          value={search}
          showLoading={isLoading}
        />
        {salons.length === 0 && <NoSalon>Sorry, No salon to display</NoSalon>}
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
