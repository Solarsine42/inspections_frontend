import {
  LOAD_ARCHIVES_FAILURE,
  LOAD_ARCHIVES_PENDING,
  LOAD_ARCHIVES_SUCCESS,
  LOAD_ARCHIVE_FAILURE,
  LOAD_ARCHIVE_PENDING,
  LOAD_ARCHIVE_SUCCESS,
  ADD_ARCHIVE_FAILURE,
  ADD_ARCHIVE_PENDING,
  ADD_ARCHIVE_SUCCESS,
  DELETE_ARCHIVE_FAILURE,
  DELETE_ARCHIVE_PENDING,
  DELETE_ARCHIVE_SUCCESS,
  EDIT_ARCHIVE_FAILURE,
  EDIT_ARCHIVE_PENDING,
  EDIT_ARCHIVE_SUCCESS,
  SEARCH_FROM_NAV
} from "../constants";

const initialState = {
  all: [],
  err: {},
  archive: {},
  searchArchivesFromNav: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ARCHIVES_PENDING:
    case LOAD_ARCHIVE_PENDING:
    case ADD_ARCHIVE_PENDING:
    case DELETE_ARCHIVE_PENDING:
    case EDIT_ARCHIVE_PENDING:
      return state;

    case LOAD_ARCHIVES_SUCCESS:
      return { ...state, all: action.payload };
    case LOAD_ARCHIVE_SUCCESS:
      return { ...state, archive: action.payload };
    case ADD_ARCHIVE_SUCCESS:
      return { ...state, all: [...state.all, action.payload] };
    case DELETE_ARCHIVE_SUCCESS:
      return {
        ...state,
        all: state.all.filter(archive => archive.id !== action.payload)
      };
    case EDIT_ARCHIVE_SUCCESS:
      return {
        ...state,
        all: state.all.reduce((acc, patchedArchive) => {
          if (patchedArchive.id === action.payload.id) {
            acc.push(action.payload);
          } else {
            acc.push(patchedArchive);
          }
          return acc;
        }, [])
      };

    case LOAD_ARCHIVES_FAILURE:
    case LOAD_ARCHIVE_FAILURE:
    case ADD_ARCHIVE_FAILURE:
    case DELETE_ARCHIVE_FAILURE:
    case EDIT_ARCHIVE_FAILURE:
      return { ...state, err: action.payload };

    case SEARCH_FROM_NAV:
      return { ...state, searchArchivesFromNav: action.payload };

    default:
      return state;
  }
};
