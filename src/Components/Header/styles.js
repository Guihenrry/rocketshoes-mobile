import styled from 'styled-components/native';

import logo from '../../assets/logo.png';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background: #141419;
  padding: 20px;
`;

export const LogoButton = styled.TouchableOpacity``;

export const Logo = styled.Image.attrs({
  source: logo,
})``;

export const CartButton = styled.TouchableOpacity``;

export const CartCount = styled.Text`
  position: absolute;
  top: -8px;
  right: -8px;
  text-align: center;
  font-size: 12px;
  min-width: 18px;
  min-height: 18px;
  border-radius: 9px;
  background: #7159c1;
  color: #fff;
  padding: 2px;
`;
