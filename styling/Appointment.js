import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { Block } from "galio-framework";
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
  font-size: 24px;
  font-weight: 700;
`;

export const SalonName = styled.Text`
  color: blueviolet;
  text-align: center;
  font-size: 24px;
  font-weight: 400;
`;

export const Select = styled.Text`
  color: orangered;
  text-align: center;
  font-size: 16px;
  font-weight: 100;
`;

export const ContentForCard = styled(Content)`
  background-color: whitesmoke;
  align-content: center;
  text-align: center;
`;

export const CardPaper = styled(Card)`
  margin-top: 5px;
`;

export const AppointmentButton = styled(Button)`
  background-color: transparent;
  border-radius: 60px;
  margin-top: 15px;
  border-color: blueviolet;
`;
