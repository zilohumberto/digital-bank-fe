import { MAKE_TRANSFER_SUCCESS, GET_TRANSFER_HISTORY_SUCCESS } from '../types';

const initialState = {
  transfers: [],
};

const transferReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_TRANSFER_SUCCESS:
      return {
        ...state,
        transfers: [action.payload, ...state.transfers],
      };
    case GET_TRANSFER_HISTORY_SUCCESS:
      return {
        ...state,
        transfers: action.payload,
      };
    default:
      return state;
  }
};

export default transferReducer;
