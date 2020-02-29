import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

class Home extends Component {
  state = {
    products: [],
    loading: true,
  };

  static propTypes = {
    addToCartRequest: PropTypes.func.isRequired,
    amount: PropTypes.objectOf(PropTypes.number).isRequired,
    addingIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  };

  async componentDidMount() {
    const response = await api.get('/products');
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
      amount: 1,
    }));

    this.setState({
      products: data,
      loading: false,
    });
  }

  handleAddProduct = id => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  renderProduct = ({ item }) => {
    const { amount, addingIds } = this.props;

    return (
      <Product>
        <ProductImage source={{ uri: item.image }} />
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>{item.priceFormatted}</ProductPrice>
        <AddButton onPress={() => this.handleAddProduct(item.id)}>
          {addingIds.includes(item.id) ? (
            <AddButtonLoading>
              <ActivityIndicator color="#FFF" size="small" />
            </AddButtonLoading>
          ) : (
            <AddButtonAmount>
              <Icon name="add-shopping-cart" color="#FFF" size={20} />
              <AddButtonAmountText>
                {' '}
                {amount[item.id] || 0}{' '}
              </AddButtonAmountText>
            </AddButtonAmount>
          )}
          <AddButtonText>Adicionar</AddButtonText>
        </AddButton>
      </Product>
    );
  };

  render() {
    const { products, loading } = this.state;

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
          renderItem={this.renderProduct}
          showsHorizontalScrollIndicator={false}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.products.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
  addingIds: state.cart.addingIds,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
