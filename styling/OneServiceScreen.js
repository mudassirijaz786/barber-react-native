import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { Block, Text } from "galio-framework";
import { Content, Thumbnail } from "native-base";
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
  font-size: 24px;
  font-weight: 400;
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
  margin-top: 5px;
`;

export const ServiceButton = styled(Button)`
  background-color: transparent;
  border-radius: 60px;
  border-color: blueviolet;
  margin-left: 3px;
`;

export const Category = styled.Text`
  color: #eb6709;
  font-size: 16px;
  font-weight: 100;
`;

export const Description = styled(Text)`
  margin-top: 5px;
`;

export const ImageService = styled.Image`
  width: 345px;
  height: 300px;
  margin-right: 10px;
`;
