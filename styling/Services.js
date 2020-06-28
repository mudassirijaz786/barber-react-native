import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { Block } from "galio-framework";
import { Content, Thumbnail } from "native-base";
import { Card } from "react-native-paper";

export const Container = styled.View`
  flex: 1;
  align-content: center;
  background-color: whitesmoke;
  padding-left: 15px;
  padding-right: 15px;
`;

export const Title = styled.Text`
  color: blueviolet;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
`;

export const ServiceName = styled.Text`
  color: blueviolet;
  font-size: 24px;
  font-weight: 400;
`;

export const Reviews = styled.Text`
  color: #089920;
  font-size: 18px;

  font-weight: 400;
`;

export const Time = styled.Text`
  color: #089920;
  font-size: 12px;
  font-weight: 700;
`;

export const Price = styled.Text`
  color: #eb6709;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
`;

export const ContentForCard = styled(Content)`
  align-content: center;
  text-align: center;
`;

export const CardPaper = styled(Card)`
  margin-top: 10px;
`;

export const ServiceButton = styled(Button)`
  background-color: transparent;
  border-radius: 60px;
  border-color: blueviolet;
  margin-left: 3px;
`;

export const NoService = styled.Text`
  color: red;
  text-align: center;
  font-size: 24px;
  font-weight: 200;
`;

export const ServiceImage = styled(Thumbnail)`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-right: 10px;
`;

export const Category = styled.Text`
  color: #eb6709;
  font-size: 24px;
  font-weight: 500;
`;

export const Name = styled.Text`
  color: #eb6709;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
`;

export const Filter = styled.Text`
  color: blueviolet;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
`;
export const Blocked = styled(Block)`
  align-content: center;
  justify-content: center;
  text-align: center;
  padding-top: 15px;
`;
