import { TextInput } from "react-native";
import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 40px;
  padding: 0 16px;
  margin-top: 2px;
  background: #FFFFFF;
  border-radius: 5px;
  border-width: 1px;
  border-color: #232129;
  flex-direction: row;
  align-items: center;
`;

export const TextInputSearch = styled(TextInput)`
  flex: 1;
  color: #6c6c80;
  font-size: 16px;
  font-family: 'Roboto-Regular';
`;
