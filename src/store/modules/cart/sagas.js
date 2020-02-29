import { Alert } from 'react-native';
import { all, takeLatest, call, put, select } from 'redux-saga/effects';

import api from '../../../services/api';
import {
  addToCartSuccess,
  updateAmountSuccess,
  updateAmountFailure,
} from './actions';
import { formatPrice } from '../../../utils/format';

function* addToCart({ id }) {
  const productsExists = yield select(state =>
    state.cart.products.find(product => product.id === id)
  );

  const responseStock = yield call(api.get, `/stock/${id}`);

  const productStock = responseStock.data.amount;
  const currentAmount = productsExists ? productsExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > productStock) {
    yield put(updateAmountFailure(id));
    Alert.alert('Ops', 'Quantidade solicitada fora de estoque.');
    return;
  }

  if (productsExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const responseStock = yield call(api.get, `/stock/${id}`);
  const productStock = responseStock.data.amount;

  if (amount > productStock) {
    Alert.alert('Ops', 'Quantidade solicitada fora de estoque.');
  } else {
    yield put(updateAmountSuccess(id, amount));
  }
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
