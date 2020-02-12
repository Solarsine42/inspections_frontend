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
  EDIT_ARCHIVE_SUCCESS
} from "../constants";

const initialState = {
  all: [],
  err: {},
  archive: {}
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
      return { ...state, all: [...state.all, action.payload[0]] };
    case DELETE_ARCHIVE_SUCCESS:
      return {
        ...state,
        all: state.all.filter(archive => archive.id !== action.payload[0].id)
      };
    case EDIT_ARCHIVE_SUCCESS:
      return {
        ...state,
        all: state.all.reduce((acc, patchedArchive) => {
          if (archive.id === action.payload[0].id) {
            acc.push(action.payload[0]);
          } else {
            acc.push(patchedArchive);
          }
          return acc;
        }, [])
      };
  }
};
