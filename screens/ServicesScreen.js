import { Text, Block } from "galio-framework";

import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Image
} from "react-native-paper";
import Service from "../components/Service";
import { Icon } from "../components";
import { Images, materialTheme } from "../constants";
import Axios from "axios";

export default class ServicesScreen extends Component {
  state = {
    List_of_services: [123],
    name: "mudassir"
  };

  componentDidMount() {
    Axios({
      url:
        "https://digital-salon-app.herokuapp.com/Digital_Saloon.com/api/salonservices",
      method: "GET"
    })
      .then(response => {
        console.log("RESPONSE OBJECT", response.data);
        // List_of_services = { ...this.state.List_of_services0 };
        // List_of_services = response;
        this.setState({ List_of_services: response.data });
      })

      // console.log("IN COMPONENT DID MOUNT", this.state.name);

      .catch(function(error) {
        alert(error);
      });
  }

  render() {
    if (this.state.List_of_services.length === 0) {
      return <h2>You have no serive to display </h2>;
    }
    return this.state.List_of_services.map(items => {
      return (
        <ScrollView style={{ flex: 1, boderColor: "indigo" }}>
          <Block
            style={{
              flex: 1,
              resizeMode: "cover",
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "#dddddd",
              marginLeft: 18,
              marginRight: 18
            }}
          >
            <Card>
              <Card.Content>
                <Title>{items.serviceName}</Title>
                <Paragraph> {items.serviceDescription}</Paragraph>
              </Card.Content>
              {/* <Card.Cover
                style={{
                  flex: 1,
                  resizeMode: "cover",
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "#dddddd",
                  marginLeft: 18,
                  marginRight: 18
                }}
                source={{ uri: "https://picsum.photos/700" }}
              /> */}
              <Card.Actions>
                <Button
                  onPress={() => this.props.navigation.navigate("Service")}
                >
                  {items.service_category}
                </Button>
                <Block row>
                  <Block>
                    <Text>{items.servicePrice}</Text>
                  </Block>
                </Block>
              </Card.Actions>
            </Card>
          </Block>
        </ScrollView>
      );
    });
  }
}

const styles = StyleSheet.create({});
