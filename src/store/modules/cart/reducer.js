import produce from 'immer';

const INITIAL_STATE = {
  products: [],
  addingIds: [],
};

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@cart/ADD_REQUEST':
      return produce(state, draft => {
        const addingExists = draft.addingIds.indexOf(action.id);

        if (addingExists === -1) {
          draft.addingIds.push(action.id);
        }
      });
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        draft.products.push(action.product);

        const loadingIndex = draft.addingIds.indexOf(action.product.id);
        if (loadingIndex >= 0) {
          draft.addingIds.splice(loadingIndex, 1);
        }
      });
    case '@cart/UPDATE_AMOUNT_SUCCESS':
      return produce(state, draft => {
        const productIndex = draft.products.findIndex(p => p.id === action.id);

        draft.products[productIndex].amount = action.amount;

        const loadingIndex = draft.addingIds.indexOf(action.id);
        if (loadingIndex >= 0) {
          draft.addingIds.splice(loadingIndex, 1);
        }
      });
    case '@cart/UPDATE_AMOUNT_FAILURE':
      return produce(state, draft => {
        const loadingIndex = draft.addingIds.indexOf(action.id);
        if (loadingIndex >= 0) {
          draft.addingIds.splice(loadingIndex, 1);
        }
      });
    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.products.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft.products.splice(productIndex, 1);
        }
      });
    default:
      return state;
  }
}
