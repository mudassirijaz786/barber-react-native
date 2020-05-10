import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { Block, Text } from "galio-framework";
import { Content } from "native-base";
import { Card } from "react-native-paper";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-content: center;
  background-color: whitesmoke;
  padding-left: 15px;
  padding-right: 15px;
`;

export const Title = styled.Text`
  color: blueviolet;
  text-align: center;
  font-size: 36px;
  font-weight: 700;
`;

export const ServiceName = styled.Text`
  color: blueviolet;
  text-align: center;
  font-size: 28px;
  font-weight: 400;
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

export const Description = styled(Text)`
  margin-top: 5px;
  color: #eb6709;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
`;

export const ContentForCard = styled(Content)`
  align-content: center;
  background-color: transparent;
  text-align: center;
`;

export const CardPaper = styled(Card)`
  margin-top: 5px;
`;

export const Price = styled.Text`
  color: #eb6709;
  text-align: center;
  margin-bottom: 15px;
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
  margin-top: 20px;
  font-size: 14px;
  font-weight: 300;
`;
