import axios from "axios";
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

export const getArchives = () => {
  return dispatch => {
    dispatch({
      type: LOAD_ARCHIVES_PENDING
    });
    axios
      .get("http://localhost:8080/archived")
      .then(res => {
        dispatch({
          type: LOAD_ARCHIVES_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: LOAD_ARCHIVES_FAILURE,
          payload: err
        });
      });
  };
};

export const getOneArchive = id => {
  return dispatch => {
    dispatch({
      type: LOAD_ARCHIVE_PENDING
    });
    axios
      .get(`http://localhost:8080/archived/${id}`)
      .then(res => {
        dispatch({
          type: LOAD_ARCHIVE_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: LOAD_ARCHIVE_FAILURE,
          payload: err
        });
      });
  };
};

export const addArchive = newArchive => {
  return dispatch => {
    dispatch({
      type: ADD_ARCHIVE_PENDING
    });
    axios
      .post("http://localhost:8080/archived", newArchive)
      .then(res => {
        dispatch({
          type: ADD_ARCHIVE_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: ADD_ARCHIVE_FAILURE,
          payload: err
        });
      });
  };
};

export const deleteArchive = id => {
  return dispatch => {
    dispatch({
      type: DELETE_ARCHIVE_PENDING
    });
    axios
      .delete(`http://localhost:8080/archived/${id}`)
      .then(res => {
        dispatch({
          type: DELETE_ARCHIVE_SUCCESS,
          payload: id
        });
      })
      .catch(err => {
        dispatch({
          type: DELETE_ARCHIVE_FAILURE,
          payload: err
        });
      });
  };
};

export const editArchive = patchedArchive => {
  return dispatch => {
    dispatch({
      type: EDIT_ARCHIVE_PENDING
    });
    axios
      .patch(`http://localhost:8080/archived/`, patchedArchive)
      .then(res => {
        dispatch({
          type: EDIT_ARCHIVE_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: EDIT_ARCHIVE_FAILURE,
          payload: err
        });
      });
  };
};
