import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../utils/format';

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

function Cart({
  cart,
  total,
  navigation,
  updateAmountRequest,
  removeFromCart,
}) {
  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  function remove(id) {
    removeFromCart(id);
  }

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
            <ProductDeleteButton onPress={() => remove(product.id)}>
              <Icon name="delete-forever" size={24} color="#7159c1" />
            </ProductDeleteButton>
          </ProductHeader>
          <ProductFooter>
            <ProductAmountButton onPress={() => decrement(product)}>
              <Icon name="remove-circle-outline" size={20} color="#7159c1" />
            </ProductAmountButton>
            <ProductAmount value={String(product.amount)} />
            <ProductAmountButton onPress={() => increment(product)}>
              <Icon name="add-circle-outline" size={20} color="#7159c1" />
            </ProductAmountButton>
            <ProductSubtotal>{product.subTotal}</ProductSubtotal>
          </ProductFooter>
        </Product>
      ))}
      <TotalText>Total</TotalText>
      <Total>{total}</Total>
      <SubmitButton>
        <SubmitButtonText>Finalizar Pedido</SubmitButtonText>
      </SubmitButton>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.products.map(product => ({
    ...product,
    subTotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.products.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      image: PropTypes.string,
      priceFormated: PropTypes.string,
      amount: PropTypes.number,
      subTotal: PropTypes.string,
    })
  ).isRequired,
  total: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  updateAmountRequest: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
