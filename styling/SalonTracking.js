import styled from "styled-components/native";
import { Block } from "galio-framework";

export const Container = styled.View`
  flex: 1;
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

export const Distance = styled.Text`
  color: #eb6709;
  text-align: center;
  font-weight: 600;
`;

export const Blocked = styled(Block)`
  align-content: center;
  justify-content: center;
  text-align: center;
`;

export const View = styled.View`
  align-content: center;
  justify-content: center;
  text-align: center;
  flex: 1;
`;
