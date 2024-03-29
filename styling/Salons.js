import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { Block } from "galio-framework";
import { Content } from "native-base";
import { Card } from "react-native-paper";

export const Container = styled.View`
  flex: 1;
  align-content: center;
  background-color: whitesmoke;
  padding-left: 15px;
  text-align: center;
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
  font-size: 24px;
  font-weight: 400;
`;

export const Open = styled.Text`
  color: #eb6709;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
`;

export const Close = styled.Text`
  color: #eb6709;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
`;

export const Filter = styled.Text`
  color: blueviolet;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
`;

export const Distance = styled.Text`
  color: blueviolet;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
`;

export const ContentForCard = styled(Content)`
  text-align: center;
`;

export const CardPaper = styled(Card)`
  margin-top: 10px;
`;

export const SalonButton = styled(Button)`
  background-color: transparent;
  font-size: 12px;
  border-radius: 60px;
  border-color: blueviolet;
`;

export const Blocked = styled(Block)`
  align-content: center;
  justify-content: center;
  text-align: center;
  padding-top: 15px;
`;

export const NoSalon = styled.Text`
  color: red;
  text-align: center;
  font-size: 24px;
  font-weight: 200;
`;
