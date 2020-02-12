import axios from "axios";
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

export const getPendings = () => {
  return dispatch => {
    dispatch({
      type: LOAD_PENDINGS_PENDING
    });
    axios
      .get("http://localhost8080/pending")
      .then(res => {
        dispatch({
          type: LOAD_PENDINGS_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: LOAD_PENDINGS_FAILURE,
          payload: err
        });
      });
  };
};

export const getOnePending = id => {
  return dispatch => {
    dispatch({
      type: LOAD_PENDING_PENDING
    });
    axios
      .get(`http://localhost8080/pending/${id}`)
      .then(res => {
        dispatch({
          type: LOAD_PENDING_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: LOAD_PENDING_FAILURE,
          payload: err
        });
      });
  };
};

export const addPending = newPending => {
  return dispatch => {
    dispatch({
      type: ADD_PENDING_PENDING
    });
    axios
      .post("http://localhost8080/pending", newPending)
      .then(res => {
        dispatch({
          type: ADD_PENDING_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: ADD_PENDING_FAILURE,
          payload: err
        });
      });
  };
};

export const deletePending = id => {
  return dispatch => {
    dispatch({
      type: DELETE_PENDING_PENDING
    });
    axios
      .delete(`http://localhost8080/pending/${id}`)
      .then(res => {
        dispatch({
          type: DELETE_PENDING_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: DELETE_PENDING_FAILURE,
          payload: err
        });
      });
  };
};

export const editPending = (id, patchedPending) => {
  return dispatch => {
    dispatch({
      type: EDIT_PENDING_PENDING
    });
    axios
      .patch(`http://loacalhost8080/pending/${id}`, patchedPending)
      .then(res => {
        dispatch({
          type: EDIT_PENDING_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: EDIT_PENDING_FAILURE,
          payload: err
        });
      });
  };
};
