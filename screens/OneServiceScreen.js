//importing
import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "galio-framework";
import { CardItem, Thumbnail, Left, Body, Right, Icon } from "native-base";
import {
  Container,
  Title,
  ServiceName,
  Price,
  Category,
  ContentForCard,
  ImageService,
  Description,
  CardPaper,
  ServiceButton,
} from "../styling/OneServiceScreen";

//exporting OneServiceScreen
export default class OneServiceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //props from previous screen
      items: this.props.navigation.state.params.items,
    };
  }

  //header single service
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Service",
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

  //moving to TimePick
  onPressed(items) {
    this.props.navigation.navigate("TimePick", { items: items });
  }

  //rendering
  render() {
    const { items } = this.state;
    return (
      <Container>
        <Title>Service information</Title>
        <ContentForCard>
          <CardPaper key={items._id}>
            <CardItem header>
              <Left>
                <Thumbnail
                  source={{
                    uri: items.image_url,
                  }}
                />
                <Body>
                  <ServiceName>{items.serviceName}</ServiceName>
                  <Category>{items.service_category}</Category>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <ImageService
                  source={{
                    uri: items.image_url,
                  }}
                />
                <Description muted>{items.serviceDescription}</Description>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <TouchableOpacity>
                  <ServiceButton
                    mode="outlined"
                    uppercase={false}
                    contentStyle={{ height: 30 }}
                    onPress={() => this.onPressed(items)}
                  >
                    Make Schedule
                  </ServiceButton>
                </TouchableOpacity>
              </Left>
              <Right>
                <Text>
                  <Price> {items.servicePrice} </Price> Rs
                </Text>
              </Right>
            </CardItem>
          </CardPaper>
        </ContentForCard>
      </Container>
    );
  }
}
