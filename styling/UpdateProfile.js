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

export const Title = styled.Text`
  color: blueviolet;
  text-align: center;
  font-size: 36px;
  font-weight: 700;
`;

export const InputField = styled(TextInput)`
  margin-top: 15px;
  background-color: transparent;
`;

export const UpdateProfileButton = styled(Button)`
  margin-top: 15px;
  background-color: transparent;
  border-radius: 60px;
  border-color: blueviolet;
`;

export const Error = styled.Text`
  font-size: 14px;
  color: red;
`;
