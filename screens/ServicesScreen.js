import { Text, Block, theme } from "galio-framework";

import React, { Component } from "react";
import { StyleSheet, View, ScrollView, AsyncStorage } from "react-native";
import {
  Avatar,
  Button,
  Paragraph,
  Title,
  Image,
  ActivityIndicator,
} from "react-native-paper";
import { SearchBar } from "react-native-elements";

import {
  Left,
  Right,
  // Title,
  Card,
  Icon,
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

import Axios from "axios";
import { showMessage, hideMessage } from "react-native-flash-message";

export default class ServicesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      List_of_services: [123],
      name: "mudassir",
      storedValue: "",
      isLoading: false,
      search: "",

      salonId: this.props.items._id,
      arrayholder: [123],
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    // console.log("Salon ID", this.props.navigation.state.params.items._id);
    // console.log("value", storedValue);
    value = await AsyncStorage.getItem("x-auth-token");
    // console.log("TOKEN IN SERVICES SCREEN", value);
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
        // console.log("RESPONSE OBJECT", response.data);
        // console.log("value of token", value);

        // List_of_services = { ...this.state.List_of_services0 };
        // List_of_services = response;
        this.setState({
          List_of_services: response.data,
          arrayholder: response.data,
        });
      })

      // console.log("IN COMPONENT DID MOUNT", this.state.name);

      .catch((error) => {
        showMessage({
          message: { error },
          type: "danger",
        });

        console.log("url", url);
      });
    this.setState({ isLoading: false });
  }

  onPressed(items) {
    this.props.navigation.navigate("Service", { items: items });
  }
  updateSearch = (search) => {
    const newData = this.state.arrayholder.filter((item) => {
      //applying filter for the inserted text in search bar
      const itemData = item.serviceName
        ? item.serviceName.toLowerCase()
        : "".toLowerCase();
      const textData = search.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({ search, List_of_services: newData });
  };
  render() {
    // console.log("RESPONSE IN STATE ALL SERVICES", this.state.List_of_services);
    const { search } = this.state;

    return (
      <Container>
        <Title
          style={{
            textAlign: "center",
            color: "indigo",
            fontSize: 30,
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          Availible services
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
          {this.state.List_of_services.length !== 0 &&
            this.state.List_of_services.map((items) => {
              return (
                <View style={{ boderColor: "indigo" }}>
                  {this.state.isLoading ? (
                    <ActivityIndicator
                      animating={this.state.isLoading}
                      size="large"
                      color="#0000ff"
                      style={{ marginTop: 350 }}
                    />
                  ) : (
                    <Card style={{ alignItems: "center" }} elevation={8}>
                      <CardItem header>
                        <Left>
                          <Thumbnail
                            source={{ uri: items.image_url }}
                            style={{
                              width: 100,
                              height: 100,
                              borderRadius: 10,
                              marginRight: 10,
                            }}
                          />
                          <View style={{ alignItems: "flex-start", top: -10 }}>
                            <Title>{items.serviceName}</Title>
                            <Text>{items.servicePrice} Rs</Text>
                            <View
                              style={{
                                alignItems: "flex-end",
                                marginTop: 20,
                              }}
                            >
                              <Text muted>{items.serviceDescription}</Text>
                            </View>
                          </View>
                        </Left>
                        {/* <Right>
                         
                        </Right> */}
                      </CardItem>
                      {/* <CardItem cardBody>
                      </CardItem> */}
                      <CardItem footer>
                        <Left>
                          <View
                            style={{
                              alignItems: "flex-start",
                              top: -10,
                              marginLeft: 5,
                            }}
                          >
                            <Text color={theme.COLORS.PRIMARY}>
                              {items.service_category}
                            </Text>
                            <Text>{items.service_time}</Text>
                          </View>
                        </Left>
                        <Right>
                          <View style={{ alignItems: "flex-end", top: -10 }}>
                            <Button
                              style={styles.button}
                              mode="outlined"
                              uppercase={false}
                              contentStyle={{ height: 30 }}
                              // onPress={() => this.onFilter(this.state.List_of_salons)}
                              onPress={() => this.onPressed(items)}
                            >
                              Explore
                            </Button>
                          </View>
                        </Right>
                      </CardItem>
                    </Card>
                  )}
                </View>
              );
            })}

          {this.state.List_of_services.length == 0 && (
            <Title
              style={{
                textAlign: "center",
                color: "red",
                fontSize: 30,
                marginTop: 50,
              }}
            >
              Sorry, No service to display
            </Title>
          )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 40,
    marginLeft: 10,
  },
});
