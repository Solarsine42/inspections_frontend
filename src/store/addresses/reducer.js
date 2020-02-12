import {
  LOAD_ADDRESSES_SUCCESS,
  LOAD_ADDRESSES_FAILURE,
  LOAD_ADDRESSES_PENDING,
  LOAD_ADDRESS_SUCCESS,
  LOAD_ADDRESS_FAILURE,
  LOAD_ADDRESS_PENDING
} from "../constants";

const initialState = {
  all: [],
  err: {},
  address: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ADDRESSES_PENDING:
    case LOAD_ADDRESS_PENDING:
      return state;

    case LOAD_ADDRESSES_SUCCESS:
      return { ...state, all: action.payload };
    case LOAD_ADDRESS_SUCCESS:
      return { ...state, address: action.payload };

    case LOAD_ADDRESSES_FAILURE:
    case LOAD_ADDRESS_FAILURE:
      return { ...state, err: action.payload };

    default:
      return state;
  }
};
