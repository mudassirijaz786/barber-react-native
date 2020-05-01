import { Text, Block } from "galio-framework";

import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Icon } from "../components";
import { Images, materialTheme } from "../constants";

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
    console.log("RESPONSE IN STATE ONE SERVICE", this.state.items);
    const { items } = this.state;
    if (this.state.items.length === 0) {
      return <Text>no serive to display </Text>;
    } else {
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
              marginRight: 18,
            }}
          >
            <Card key={items._id}>
              <Card.Content>
                <Title>{items.serviceName}</Title>
                <Paragraph> {items.serviceDescription}</Paragraph>
                <Paragraph>{items.Salon_id}</Paragraph>
                <Paragraph>{items.service_time}</Paragraph>
                <Paragraph>{items.service_category}</Paragraph>
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
                <Button onPress={() => this.onPressed(items)}>
                  Explore it
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
    }
  }
}

const styles = StyleSheet.create({
  input: {
    margin: 10,
  },
});
