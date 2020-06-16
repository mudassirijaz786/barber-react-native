import styled from "styled-components/native";
import { TextInput, Button } from "react-native-paper";
import { Block } from "galio-framework";

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

export const Forget = styled.Text`
  color: blueviolet;
  text-align: right;
  font-size: 14px;
  font-weight: 100;
  margin-top: 15px;
`;

export const SignupLink = styled.Text`
  color: blueviolet;
  text-align: center;
  font-size: 18px;
  font-weight: 100;
`;

export const InputField = styled(TextInput)`
  margin-top: 15px;
  background-color: transparent;
`;

export const SigninButton = styled(Button)`
  margin-top: 15px;
  background-color: transparent;
  border-radius: 60px;
  border-color: blueviolet;
`;

export const Blocked = styled(Block)`
  align-content: center;
  justify-content: center;
  text-align: center;
  padding-top: 15px;
`;

export const Error = styled.Text`
  font-size: 14px;
  color: red;
`;
