import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  AsyncStorage,
  View,
} from "react-native";
import { Block, Text, Input, theme } from "galio-framework";
import {
  Avatar,
  Button,
  Title,
  Paragraph,
  ActivityIndicator,
} from "react-native-paper";
import materialTheme from "../constants/Theme";
import { SearchBar } from "react-native-elements";

import { showMessage, hideMessage } from "react-native-flash-message";
import decode from "jwt-decode";
import Axios from "axios";
import {
  Left,
  Right,
  // Title,
  Card,
  Content,
  Thumbnail,
  Grid,
  Col,
  Header,
  CheczkBox,
  Body,
  Container,
  CardItem,
} from "native-base";
import Icon from "../components/Icon";
const { width } = Dimensions.get("screen");
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List_of_salons: [123],
      isLoading: false,
      search: "",
      arrayholder: [123],
    };
  }

  async componentDidMount() {
    const value = await AsyncStorage.getItem("x-auth-token");
    this.setState({ isLoading: true });
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
        this.setState({
          List_of_salons: response.data,
          arrayholder: response.data,
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
  onPressed(items) {
    console.log("clicked");
    this.props.navigation.navigate("MapandServices", { items: items });
  }

  onFilter(items) {
    this.props.navigation.navigate("MapandServices", { items: items });
  }
  updateSearch = (search) => {
    const newData = this.state.arrayholder.filter((item) => {
      //applying filter for the inserted text in search bar
      const itemData = item.SalonName
        ? item.SalonName.toLowerCase()
        : "".toLowerCase();
      const textData = search.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({ search, List_of_salons: newData });
  };
  render() {
    const { title, focused } = this.props;
    const { search } = this.state;
    return (
      <Container>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            // alignItems: "center",
            marginTop: 5,
            // marginBottom: 5,
          }}
        >
          <Text style={{ fontSize: 30 }}>Filter by near location</Text>
          <Icon
            size={30}
            name="filter-list"
            family="material"
            color={focused ? "white" : materialTheme.COLORS.MUTED}
            onPress={() => this.onFilter(this.state.List_of_salons)}
          />
        </View>
        <Title
          style={{
            textAlign: "center",
            color: "indigo",
            fontSize: 30,
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          Availible salons
        </Title>
        <SearchBar
          round
          placeholderTextColor="indigo"
          underlineColorAndroid="indigo"
          lightTheme
          inputContainerStyle={{ backgroundColor: "transparent" }}
          containerStyle={{ backgroundColor: "transparent" }}
          placeholder="Search salon by name..."
          onChangeText={this.updateSearch}
          value={search}
          showLoading={this.state.isLoading}
        />
        <Content style={{ flex: 1 }}>
          {this.state.List_of_salons.length !== 0 &&
            this.state.List_of_salons.map((items) => {
              return (
                <View style={{ boderColor: "indigo" }}>
                  {this.state.isLoading ? (
                    <ActivityIndicator
                      animating={this.state.isLoading}
                      size="large"
                      color="#0000ff"
                      style={{ marginTop: 200 }}
                    />
                  ) : (
                    <Card style={{ alignItems: "center" }} elevation={8}>
                      <CardItem header>
                        <Left>
                          <Body style={{ alignItems: "flex-start", top: -10 }}>
                            <Title>{items.SalonName}</Title>
                          </Body>
                        </Left>
                      </CardItem>
                      <CardItem>
                        <Left>
                          <Body style={{ alignItems: "flex-start", top: -10 }}>
                            <Text>Opening at {items.Salon_opening_hours}</Text>
                          </Body>
                        </Left>
                        <Right>
                          <Body style={{ alignItems: "flex-start", top: -10 }}>
                            <Text>Closing at {items.Salon_closing_hours}</Text>
                          </Body>
                        </Right>
                      </CardItem>
                      <CardItem>
                        <Button
                          style={styles.button}
                          mode="outlined"
                          uppercase={false}
                          contentStyle={{ height: 30 }}
                          // onPress={() => this.onFilter(this.state.List_of_salons)}
                          onPress={() => this.onPressed(items)}
                        >
                          See services
                        </Button>
                      </CardItem>
                    </Card>
                  )}
                </View>
              );
            })}

          {this.state.List_of_salons.length == 0 && (
            <Title
              style={{
                textAlign: "center",
                color: "red",
                fontSize: 30,
                marginTop: 50,
              }}
            >
              Sorry, No salon to display
            </Title>
          )}
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "300",
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
  button: {
    borderRadius: 40,
    marginLeft: 10,
  },
});
