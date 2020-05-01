import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Block, theme, Text } from "galio-framework";

import { View, ScrollView, Image } from "react-native";
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
      items: this.props.navigation.state.params.items,
      name: "mudassir",
      storedValue: "",
    };
  }

  componentDidMount() {
    // const { items } = this.props.navigation.state.params;
    // this.setState({
    //   items
    // });
    console.log("ITEMS", this.state.items);
  }

  onPressed(items) {
    this.props.navigation.navigate("TimePick", { items: items });
  }
  render() {
    const { items } = this.state;
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
          {items.serviceName}
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
          <Card style={{ flex: 0 }} key={items._id}>
            <CardItem header>
              <Left>
                <Thumbnail
                  source={{
                    uri: items.image_url,
                  }}
                />
                <Body>
                  <Text size={24}>{items.serviceName}</Text>
                  <Text size={12} color={theme.COLORS.PRIMARY}>
                    {items.service_category}
                  </Text>
                </Body>
              </Left>
              <Right>
                <Button onPress={() => this.onPressed(items)}>
                  Explore it
                </Button>
              </Right>
            </CardItem>
            <CardItem>
              <Body>
                <Image
                  source={{
                    uri: items.image_url,
                  }}
                  style={{
                    width: 370,
                    height: 300,
                    borderRadius: 10,
                    flex: 1,
                  }}
                />
                <Text muted style={{ marginTop: 20 }}>
                  {items.serviceDescription}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Left>
                <Text>{items.servicePrice}</Text>
              </Left>
              <Right>
                <Text>{items._id}</Text>
              </Right>
            </CardItem>
          </Card>
          <Title style={{ textAlign: "center", color: "green", fontSize: 30 }}>
            People reviews
          </Title>
        </Content>
      </Container>
    );
  }
}
