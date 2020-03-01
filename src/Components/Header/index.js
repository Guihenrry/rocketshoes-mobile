import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, LogoButton, Logo, CartButton, CartCount } from './styles';

export default function Header({ navigation }) {
  const cartSize = useSelector(state => state.cart.products.length);
  return (
    <Container>
      <LogoButton onPress={() => navigation.navigate('Home')}>
        <Logo />
      </LogoButton>
      <CartButton onPress={() => navigation.navigate('Cart')}>
        <Icon name="shopping-basket" color="#FFF" size={24} />
        <CartCount>{cartSize}</CartCount>
      </CartButton>
    </Container>
  );
}

Header.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
