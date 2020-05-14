import styled from "styled-components/native";
import { TextInput, Button } from "react-native-paper";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-content: center;
  background-color: whitesmoke;
  padding-left: 15px;
  padding-right: 15px;
`;

export const Information = styled.View`
  background-color: whitesmoke;
`;
export const Title = styled.Text`
  color: blueviolet;
  text-align: center;
  font-size: 36px;
  font-weight: 700;
`;

export const Name = styled.Text`
  color: blueviolet;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
`;

export const Email = styled.Text`
  color: #eb6709;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;

export const Phone = styled.Text`
  color: black;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
`;

export const ProfileButton = styled(Button)`
  margin-top: 15px;
  background-color: transparent;
  border-radius: 60px;
  border-color: blueviolet;
`;
