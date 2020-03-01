import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

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

export default function Cart({ navigation }) {
  const cart = useSelector(state =>
    state.cart.products.map(product => ({
      ...product,
      subTotal: formatPrice(product.price * product.amount),
    }))
  );

  const total = useSelector(state =>
    formatPrice(
      state.cart.products.reduce((totalSum, product) => {
        return totalSum + product.price * product.amount;
      }, 0)
    )
  );

  const dispatch = useDispatch();

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  function remove(id) {
    dispatch(CartActions.removeFromCart(id));
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

Cart.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
