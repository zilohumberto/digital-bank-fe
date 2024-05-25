import { REQUESTS_FAILURE, REQUESTS_SUCCESS, SELECT_ACCOUNT, MOVEMENTS_REQUESTS_SUCCESS, ACCOUNT_TRANSACTION_TYPE } from '../types';

const initialState = {
  accounts: []
};

const accountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUESTS_SUCCESS:
      const uniqueCurrencies = Array.from(new Set(action.payload.map(account => ({ currency_name: account.currency_name, id: account.id }))));
      console.log(uniqueCurrencies);
      return {
        ...state,
        accounts: action.payload,
        unique_currencies: uniqueCurrencies,
        error: null,
      };
    case REQUESTS_FAILURE:
      return {
        ...state
      };
      case SELECT_ACCOUNT:
        return {
          ...state,
          account: action.payload
        };
      case MOVEMENTS_REQUESTS_SUCCESS:
        return {
          ...state,
          movements: action.payload
        };
      case ACCOUNT_TRANSACTION_TYPE:
        return {
        ...state,
        transaction_type: action.payload
      };
    default:
      return state;
  }
};

export default accountsReducer;
