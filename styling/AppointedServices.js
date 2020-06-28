import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { Text } from "galio-framework";
import { Content } from "native-base";
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

export const SalonName = styled.Text`
  color: blueviolet;
  text-align: center;
  font-size: 28px;
  font-weight: 400;
`;

export const RatingText = styled.Text`
  color: blueviolet;
  text-align: center;
  font-size: 18px;
  font-weight: 200;
`;
export const ServiceName = styled.Text`
  color: burlywood;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;

export const Category = styled.Text`
  color: #eb6709;
  font-size: 16px;
  font-weight: 100;
`;

export const Select = styled.Text`
  color: orangered;
  text-align: center;
  font-size: 16px;
  font-weight: 100;
`;

export const ContentForCard = styled(Content)`
  align-content: center;
  text-align: center;
`;

export const CardPaper = styled(Card)`
  margin-top: 2px;
  margin-bottom: 2px;
`;

export const Price = styled.Text`
  color: #eb6709;
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 500;
`;

export const AppointmentButton = styled(Button)`
  background-color: transparent;
  border-radius: 60px;
  margin-top: 15px;
  border-color: blueviolet;
`;

export const NoService = styled.Text`
  color: red;
  text-align: center;
  font-size: 24px;
  font-weight: 200;
`;

export const Open = styled.Text`
  color: blueviolet;
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  font-weight: 300;
`;

export const Close = styled.Text`
  color: blueviolet;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
`;

export const Confirm = styled(Button)`
  margin-top: 15px;
  background-color: transparent;
  border-radius: 60px;
  border-color: blueviolet;
`;
