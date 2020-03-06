import {
  LOAD_UWREVIEWS_FAILURE,
  LOAD_UWREVIEWS_PENDING,
  LOAD_UWREVIEWS_SUCCESS,
  LOAD_UWREVIEW_FAILURE,
  LOAD_UWREVIEW_PENDING,
  LOAD_UWREVIEW_SUCCESS,
  ADD_UWREVIEW_FAILURE,
  ADD_UWREVIEW_PENDING,
  ADD_UWREVIEW_SUCCESS,
  DELETE_UWREVIEW_FAILURE,
  DELETE_UWREVIEW_PENDING,
  DELETE_UWREVIEW_SUCCESS,
  EDIT_UWREVIEW_FAILURE,
  EDIT_UWREVIEW_PENDING,
  EDIT_UWREVIEW_SUCCESS,
  SEARCH_FROM_NAV
} from "../constants";

const initialState = {
  all: [],
  err: {},
  uwReview: {},
  searchUWReviewsFromNav: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_UWREVIEWS_PENDING:
    case LOAD_UWREVIEW_PENDING:
    case ADD_UWREVIEW_PENDING:
    case DELETE_UWREVIEW_PENDING:
    case EDIT_UWREVIEW_PENDING:
      return state;

    case LOAD_UWREVIEWS_SUCCESS:
      return { ...state, all: action.payload };
    case LOAD_UWREVIEW_SUCCESS:
      return { ...state, uwReview: action.payload };
    case ADD_UWREVIEW_SUCCESS:
      return { ...state, all: [...state.all, action.payload] };
    case DELETE_UWREVIEW_SUCCESS:
      return {
        ...state,
        all: state.all.filter(uwreview => uwreview.id !== action.payload)
      };
    case EDIT_UWREVIEW_SUCCESS:
      return {
        ...state,
        all: state.all.reduce((acc, patchedUWReview) => {
          if (patchedUWReview.id === action.payload.id) {
            acc.push(action.payload);
          } else {
            acc.push(patchedUWReview);
          }
          return acc;
        }, [])
      };

    case LOAD_UWREVIEWS_FAILURE:
    case LOAD_UWREVIEW_FAILURE:
    case ADD_UWREVIEW_FAILURE:
    case DELETE_UWREVIEW_FAILURE:
    case EDIT_UWREVIEW_FAILURE:
      return { ...state, err: action.payload };

    case SEARCH_FROM_NAV:
      return { ...state, searchUWReviewsFromNav: action.payload };

    default:
      return state;
  }
};
