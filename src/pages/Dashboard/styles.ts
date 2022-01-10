import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Header = styled.View`
  padding: 50px 24px 50px;
  background: #FFFFFF;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  margin-top: 12px;
  color: #D42026;
  font-size: 16px;
  line-height: 19px;
`;

export const TitleSearch = styled.Text`
  margin-top: 10px;
  font-family: 'Roboto-Regular';
  color: #D42026;
  font-size: 16px;
  line-height: 19px;
`;

export const FilterContainer = styled.View`
  padding: 0px 24px 0 24px;
  margin-top: -28px;
`;

export const HeroContainer = styled.View`
  margin-top: 5%;
  background: #D42026;
`;

export const TitleContainer = styled.Text`
  padding-left: 35%;
  font-family: 'Roboto-Regular';
  color: #FFFFFF;
  font-size: 16px;
  line-height: 50px;
`;

export const HeroesList = styled.ScrollView`
  background: #D42026;
`;

export const Hero = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #FFFFFF;
  margin-bottom: 2px;
`;

export const HeroImageContainer = styled.View`
  padding: 25px 25px 22px;
  background: #FFFFFF;
  border-radius: 100px;
`;

export const HeroContent = styled.View`
  flex: 1;
  padding: 16px;
`;


export const HeroTitle = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 21px;
  line-height: 24px;
  color: #4E4E4E;
`;

export const Paginator = styled.View`
  display: flex;
  flex-direction: row;
  padding: 18px 10px 24px 20px; 
  background: #FFFFFF;
  display: flex;
  border-bottom-width: 18px;
  border-bottom-color: #D42026; 
  border-top-width: 1px;
  border-top-color: #D42026; 
`;

export const ButtonPage = styled.TouchableOpacity<ContainerProps>`
  display: flex;
  background: #FFFFFF;
  border-radius: 100px;
  height: auto;
  width: auto;
  min-height: 50px;
  min-width: 50px;
  margin: auto;
  border: solid #D42026 2px;

  ${props =>
    props.isFocused &&
    css`
      background: #D42026;
    `}
`;

export const ButtonPageTitle = styled.Text<ContainerProps>`
  padding: 12px;
  font-family: 'Roboto-Regular';
  font-size: 21px;
  line-height: 24px;
  color: #D42026;
  text-align: center; 

  ${props =>
    props.isFocused &&
    css`
      color: #FFFFFF;
    `}
`;