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
  EDIT_PENDING_SUCCESS,
  SEARCH_FROM_NAV
} from "../constants";

const initialState = {
  all: [],
  err: {},
  pending: {},
  searchPendingFromNav: ""
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
      return { ...state, all: [...state.all, action.payload] };
    case DELETE_PENDING_SUCCESS:
      return {
        ...state,
        all: state.all.filter(pending => pending.id !== action.payload)
      };
    case EDIT_PENDING_SUCCESS:
      return {
        ...state,
        all: state.all.reduce((acc, patchedPending) => {
          if (patchedPending.id === action.payload.id) {
            acc.push(action.payload);
          } else {
            acc.push(patchedPending);
          }
          return acc;
        }, [])
      };

    case LOAD_PENDINGS_FAILURE:
    case LOAD_PENDING_FAILURE:
    case ADD_PENDING_FAILURE:
    case DELETE_PENDING_FAILURE:
    case EDIT_PENDING_FAILURE:
      return { ...state, err: action.payload };

    case SEARCH_FROM_NAV:
      return { ...state, searchPendingFromNav: action.payload };

    default:
      return state;
  }
};
