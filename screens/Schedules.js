import { Block, theme, Text } from "galio-framework";
import materialTheme from "../constants/Theme";
import { SearchBar } from "react-native-elements";

import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import {
  Avatar,
  Button,
  Title,
  Paragraph,
  ActivityIndicator,
} from "react-native-paper";
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

export default class Schedules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // items: this.props.navigation.state.params.items,
      search: "",
      cartArray: [
        {
          _id: "5e884ff0eeb1ee00170b72ba",
          serviceName: "hair",
          servicePrice: 200,
          serviceDescription: "single service provided by tony and guy",
          image_url:
            "https://storage.googleapis.com/fyp-images/challenger_concept.jpg",
          service_category: "Khat",
          Salon_id: "5e883a40df32450017a2c6f2",
          service_time: 90,
          __v: 0,
        },
        {
          _id: "5e884ff0eeb1ee00170b72ca",
          serviceName: "facial",
          servicePrice: 400,
          serviceDescription: "single service provided by tony and guy",
          image_url:
            "https://storage.googleapis.com/fyp-images/challenger_concept.jpg",
          service_category: "Khat",
          Salon_id: "5e883a40df32450017a2c6f2",
          service_time: 20,
          __v: 0,
        },
        {
          _id: "5e884ff0eeb1ee00170b72da",
          serviceName: "relaxers",
          servicePrice: 300,
          serviceDescription: "single service provided by tony and guy",
          image_url:
            "https://storage.googleapis.com/fyp-images/challenger_concept.jpg",
          service_category: "Khat",
          Salon_id: "5e883a40df32450017a2c6f2",
          service_time: 40,
          __v: 0,
        },
      ],
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
  updateSearch = (search) => {
    this.setState({ search });
  };

  onClick = () => {
    console.log("add to cart clicked");
  };
  onPressed = (items) => {
    // console.log("add to cart clicked");
    // this.props.navigation.navigate("TimePick", { items: items });
  };
  render() {
    const { items, search, cartArray } = this.state;

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
          Your cart
        </Title>
        <SearchBar
          placeholderTextColor="indigo"
          underlineColorAndroid="indigo"
          lightTheme
          inputContainerStyle={{ backgroundColor: "transparent" }}
          containerStyle={{ backgroundColor: "transparent" }}
          placeholder="Search cart by name..."
          onChangeText={this.updateSearch}
          value={search}
        />
        <Content style={{ marginBottom: 30 }}>
          {cartArray.length !== 0 &&
            cartArray.map((items) => {
              return (
                <Card style={{ flex: 0 }}>
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
                      <Button
                        transparent
                        textStyle={{ color: "#87838B" }}
                        onPress={this.onClick}
                      >
                        <Icon
                          name="remove-shopping-cart"
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
                      <Text>{items.service_time}</Text>
                    </Right>
                  </CardItem>
                </Card>
              );
            })}
        </Content>
        <Button
          style={styles.button}
          mode="outlined"
          uppercase={false}
          contentStyle={{ height: 50 }} // onPress={() => this.onFilter(this.state.List_of_salons)}
          onPress={() => this.onPressed(items)}
        >
          Continue Shopping?
        </Button>
      </Container>
    );
  }
  // }
}

const styles = StyleSheet.create({
  input: {
    margin: 10,
  },
  button: {
    borderRadius: 40,
    marginLeft: 10,
    marginBottom: 30,
    marginRight: 10,
  },
});
