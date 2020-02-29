import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Product,
  ProductHeader,
  ProductImage,
  ProductInfo,
  ProductTitle,
  ProductPrice,
  ProductDeleteButton,
  ProductFooter,
  ProductAmountButton,
  ProductAmount,
  ProductSubtotal,
  TotalText,
  Total,
  SubmitButton,
  SubmitButtonText,
  EmptyContainer,
  EmptyCartTitle,
  EmptyCartText,
  EmptyCartButton,
  EmptyCartButtonText,
} from './styles';

function Cart({ cart, navigation }) {
  if (cart.length === 0) {
    return (
      <EmptyContainer>
        <Icon name="remove-shopping-cart" size={60} color="#ccc" />
        <EmptyCartTitle>Seu carrinho está vazio</EmptyCartTitle>
        <EmptyCartText>
          Adicione produtos clicando no botão “Adicionar ao carrinho” na página
          de produto.
        </EmptyCartText>
        <EmptyCartButton>
          <EmptyCartButtonText onPress={() => navigation.navigate('Home')}>
            Voltar para o inicio
          </EmptyCartButtonText>
        </EmptyCartButton>
      </EmptyContainer>
    );
  }

  return (
    <Container>
      {cart.map(product => (
        <Product key={String(product.id)}>
          <ProductHeader>
            <ProductImage source={{ uri: product.image }} />
            <ProductInfo>
              <ProductTitle>{product.title}</ProductTitle>
              <ProductPrice>{product.priceFormatted}</ProductPrice>
            </ProductInfo>
            <ProductDeleteButton>
              <Icon name="delete-forever" size={24} color="#7159c1" />
            </ProductDeleteButton>
          </ProductHeader>
          <ProductFooter>
            <ProductAmountButton>
              <Icon name="remove-circle-outline" size={20} color="#7159c1" />
            </ProductAmountButton>
            <ProductAmount value={String(product.amount)} />
            <ProductAmountButton>
              <Icon name="add-circle-outline" size={20} color="#7159c1" />
            </ProductAmountButton>
            <ProductSubtotal>R$ 192,00</ProductSubtotal>
          </ProductFooter>
        </Product>
      ))}
      <TotalText>Total</TotalText>
      <Total>R$ 1619,10</Total>
      <SubmitButton>
        <SubmitButtonText>Finalizar Pedido</SubmitButtonText>
      </SubmitButton>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart,
});

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      image: PropTypes.string,
      priceFormated: PropTypes.string,
      amount: PropTypes.number,
    })
  ).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Cart);
