import { Block, theme, Text } from "galio-framework";
import materialTheme from "../constants/Theme";

import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { Avatar, Button, Title, Paragraph } from "react-native-paper";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Icon,
  Left,
  Body,
  Right,
} from "native-base";

export default class ServiceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // items: this.props.navigation.state.params.items,
      services: [
        {
          service_id: "5e8a23d9b32710001701c092",
          __v: 0,
          _id: "123",
          image_url: "https://storage.googleapis.com/fyp-images/4.jpeg",
          serviceDescription: "eye brows service provided by tony and guy",
          serviceName: "eye brows",
          servicePrice: 400,
          service_category: "Facial",
        },
        {
          service_id: "5e8a23d9b32710001701c093",
          __v: 0,
          _id: "456",
          image_url: "https://storage.googleapis.com/fyp-images/4.jpeg",
          serviceDescription: "eye brows service provided by tony and guy",
          serviceName: "eye brows",
          servicePrice: 400,
          service_category: "Facial",
        },
      ],
      name: "mudassir",
      storedValue: "",
      cart: "add-shopping-cart",
      cartIDs: [],
    };
  }

  componentDidMount() {}

  // onClick = (id) => {
  //   console.log(id);
  // };
  onPressed = (service_id) => {
    let l = this.state.cartIDs;
    let addedServices = l.append(service_id);
    console.log("state after id pushing", addedServices);
    this.setState({ cart: "remove-shopping-cart", cartIDs: addedServices });
  };
  render() {
    // console.log("service", this.state.service);
    const { services, cartIDs } = this.state;
    console.log("In render method id's", cartIDs);
    return (
      <Container>
        <Title
          style={{
            textAlign: "center",
            color: "indigo",
            fontSize: 30,
            marginTop: 30,
          }}
        >
          {this.state.cart}
        </Title>
        <Title
          style={{
            textAlign: "center",
            color: "indigo",
            fontSize: 30,
            marginTop: 30,
          }}
        >
          Service information
        </Title>
        <Content>
          {services.map((service) => {
            return (
              <Card style={{ flex: 0 }}>
                <CardItem header>
                  <Left>
                    <Thumbnail
                      source={{
                        uri: service.image_url,
                      }}
                    />
                    <Body>
                      <Text size={24}>{service.serviceName}</Text>
                      <Text size={12} color={theme.COLORS.PRIMARY}>
                        {service.service_category}
                      </Text>
                    </Body>
                  </Left>
                  <Right>
                    <Button
                      transparent
                      textStyle={{ color: "#87838B" }}
                      onPress={() => this.onPressed(service._id)}
                    >
                      <Icon
                        name={this.state.cart}
                        type="MaterialIcons"
                        style={{ fontSize: 40 }}
                      />
                    </Button>
                  </Right>
                </CardItem>
                <CardItem>
                  <Body>
                    <Image
                      source={{
                        uri: service.image_url,
                      }}
                      style={{
                        width: 370,
                        height: 300,
                        borderRadius: 10,
                        flex: 1,
                      }}
                    />
                    <Text muted style={{ marginTop: 20 }}>
                      {service.serviceDescription}
                    </Text>
                  </Body>
                </CardItem>
                <CardItem footer>
                  <Left>
                    <Text>{service.servicePrice}</Text>
                  </Left>
                  <Right>
                    <Text>{service._id}</Text>
                  </Right>
                </CardItem>
              </Card>
            );
          })}

          <Title style={{ textAlign: "center", color: "green", fontSize: 30 }}>
            People reviews
          </Title>
        </Content>
      </Container>
    );
  }
  // }
}

const styles = StyleSheet.create({
  input: {
    margin: 10,
  },
});
