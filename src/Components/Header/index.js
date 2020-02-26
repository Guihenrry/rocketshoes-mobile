import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, LogoButton, Logo, CartButton, CartCount } from './styles';

export default function Header({ navigation }) {
  return (
    <Container>
      <LogoButton onPress={() => navigation.navigate('Home')}>
        <Logo />
      </LogoButton>
      <CartButton onPress={() => navigation.navigate('Cart')}>
        <Icon name="shopping-basket" color="#FFF" size={24} />
        <CartCount>1</CartCount>
      </CartButton>
    </Container>
  );
}

Header.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
