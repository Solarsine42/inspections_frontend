import {
  LOAD_PENDINGS_FAILURE,
  LOAD_PENDINGS_PENDING,
  LOAD_PENDINGS_SUCCESS,
  LOAD_PENDING_FAILURE,
  LOAD_PENDING_PENDING,
  LOAD_PENDING_SUCCESS,
  ADD_PENDING_FAILURE,
  ADD_PENDING_PENDING,
  ADD_PENDING_SUCCESS,
  DELETE_PENDING_FAILURE,
  DELETE_PENDING_PENDING,
  DELETE_PENDING_SUCCESS,
  EDIT_PENDING_FAILURE,
  EDIT_PENDING_PENDING,
  EDIT_PENDING_SUCCESS
} from "../constants";

const initialState = {
  all: [],
  err: {},
  pending: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PENDINGS_PENDING:
    case LOAD_PENDING_PENDING:
    case ADD_PENDING_PENDING:
    case DELETE_PENDING_PENDING:
    case EDIT_PENDING_PENDING:
      return state;

    case LOAD_PENDINGS_SUCCESS:
      return { ...state, all: action.payload };
    case LOAD_PENDING_SUCCESS:
      return { ...state, pending: action.payload };
    case ADD_PENDING_SUCCESS:
      return { ...state, all: [...state.all, action.payload[0]] };
    case DELETE_PENDING_SUCCESS:
      return {
        ...state,
        all: state.all.filter(pending => pending.id !== action.payload[0].id)
      };
    // case EDIT_PENDING_SUCCESS:
    //   return {
    //     ...state,
    //     all: state.all.reduce((acc, patchedPending) => {
    //       if (pending.id === action.payload[0].id) {
    //         acc.push(action.payload[0]);
    //       } else {
    //         acc.push(patchedPending);
    //       }
    //       return acc;
    //     }, [])
    //   };

    case LOAD_PENDINGS_FAILURE:
    case LOAD_PENDING_FAILURE:
    case ADD_PENDING_FAILURE:
    case DELETE_PENDING_FAILURE:
    case EDIT_PENDING_FAILURE:
      return { ...state, err: action.payload };

    default:
      return state;
  }
};
