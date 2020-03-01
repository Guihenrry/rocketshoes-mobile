import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import { formatPrice } from '../../utils/format';
import * as CartActions from '../../store/modules/cart/actions';

import {
  Container,
  Product,
  ProductTitle,
  ProductImage,
  ProductPrice,
  AddButton,
  AddButtonLoading,
  AddButtonText,
  AddButtonAmount,
  AddButtonAmountText,
} from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const amount = useSelector(state =>
    state.cart.products.reduce((amountSum, product) => {
      amountSum[product.id] = product.amount;

      return amountSum;
    }, {})
  );

  const addingIds = useSelector(state => state.cart.addingIds);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products');
      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
        amount: 1,
      }));

      setProducts(data);
      setLoading(false);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  function renderProduct({ item }) {
    return (
      <Product>
        <ProductImage source={{ uri: item.image }} />
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>{item.priceFormatted}</ProductPrice>
        <AddButton onPress={() => handleAddProduct(item.id)}>
          {addingIds.includes(item.id) ? (
            <AddButtonLoading>
              <ActivityIndicator color="#FFF" size="small" />
            </AddButtonLoading>
          ) : (
            <AddButtonAmount>
              <Icon name="add-shopping-cart" color="#FFF" size={20} />
              <AddButtonAmountText>{amount[item.id] || 0}</AddButtonAmountText>
            </AddButtonAmount>
          )}
          <AddButtonText>Adicionar</AddButtonText>
        </AddButton>
      </Product>
    );
  }

  if (loading) {
    return (
      <Container>
        <ActivityIndicator color="#FFF" size="large" />
      </Container>
    );
  }

  return (
    <Container>
      <FlatList
        horizontal
        data={products}
        keyExtractor={item => String(item.id)}
        renderItem={renderProduct}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
}
