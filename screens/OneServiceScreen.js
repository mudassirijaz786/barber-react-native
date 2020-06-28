//importing
import React, { Component } from "react";
import { TouchableOpacity, Image } from "react-native";
import { Text } from "galio-framework";
import { CardItem, Thumbnail, Left, Body, Right, Icon } from "native-base";
import {
  Container,
  Title,
  ServiceName,
  Price,
  Category,
  ContentForCard,
  Description,
  CardPaper,
  ServiceButton,
  NoFeedback,
  Reviews,
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
    console.log(items);
    return (
      <Container>
        <Title>Service information</Title>
        <ContentForCard>
          <CardPaper
            key={items._id}
            containerStyle={{ elevation: 16 }}
            style={{ borderRadius: 12 }}
          >
            <CardItem
              header
              bordered
              style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
            >
              <Left>
                <TouchableOpacity onPress={() => this.onPressed(items)}>
                  <Thumbnail
                    source={{
                      uri: items.image_url,
                    }}
                  />
                </TouchableOpacity>
                <Body>
                  <TouchableOpacity onPress={() => this.onPressed(items)}>
                    <ServiceName>{items.serviceName}</ServiceName>
                    <Category>{items.service_category}</Category>
                  </TouchableOpacity>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <TouchableOpacity onPress={() => this.onPressed(items)}>
                  <Image
                    style={{ borderRadius: 12, width: 297, height: 260 }}
                    source={{
                      uri: items.image_url,
                    }}
                  />
                </TouchableOpacity>
                <Reviews>Reviews: {items.ServiceAvgRating}</Reviews>
                <Description muted>{items.serviceDescription}</Description>
              </Body>
            </CardItem>
            <CardItem
              footer
              style={{
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
              }}
            >
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
          <Title>Feedbacks</Title>
          {items.feedbacks.length === 0 ? (
            <NoFeedback>{items.serviceName} has no feedbacks</NoFeedback>
          ) : (
            items.feedbacks.map((feedback) => {
              return (
                <CardPaper
                  key={feedback._id}
                  containerStyle={{ elevation: 16 }}
                  style={{ borderRadius: 12 }}
                >
                  <CardItem
                    header
                    bordered
                    style={{
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  >
                    <Left>
                      <Body>
                        <TouchableOpacity onPress={() => this.onPressed(items)}>
                          <ServiceName>Rating: {feedback.rating}</ServiceName>
                          <Category>Review: {feedback.description}</Category>
                        </TouchableOpacity>
                      </Body>
                    </Left>
                  </CardItem>
                </CardPaper>
              );
            })
          )}
        </ContentForCard>
      </Container>
    );
  }
}
