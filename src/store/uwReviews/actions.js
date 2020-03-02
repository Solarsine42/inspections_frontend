import axios from "axios";
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
  EDIT_UWREVIEW_SUCCESS
} from "../constants";

export const getUWReviews = () => {
  return dispatch => {
    dispatch({
      type: LOAD_UWREVIEWS_PENDING
    });
    axios
      .get("http://localhost:8080/uwreviews")
      .then(res => {
        dispatch({
          type: LOAD_UWREVIEWS_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: LOAD_UWREVIEWS_FAILURE,
          payload: err
        });
      });
  };
};

export const getOneUWReview = id => {
  return dispatch => {
    dispatch({
      type: LOAD_UWREVIEW_PENDING
    });
    axios
      .get(`http://localhost:8080/uwreviews/${id}`)
      .then(res => {
        dispatch({
          type: LOAD_UWREVIEW_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: LOAD_UWREVIEW_FAILURE,
          payload: err
        });
      });
  };
};

export const addUWReview = newUWReview => {
  return dispatch => {
    dispatch({
      type: ADD_UWREVIEW_PENDING
    });
    axios
      .post("http://localhost:8080/uwreviews", newUWReview)
      .then(res => {
        dispatch({
          type: ADD_UWREVIEW_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: ADD_UWREVIEW_FAILURE,
          payload: err
        });
      });
  };
};

export const deleteUWReview = id => {
  return dispatch => {
    dispatch({
      type: DELETE_UWREVIEW_PENDING
    });
    axios
      .delete(`http://localhost:8080/uwreviews/${id}`)
      .then(res => {
        dispatch({
          type: DELETE_UWREVIEW_SUCCESS,
          payload: id
        });
      })
      .catch(err => {
        dispatch({
          type: DELETE_UWREVIEW_FAILURE,
          payload: err
        });
      });
  };
};

export const editUWReview = patchedUWReview => {
  return dispatch => {
    dispatch({
      type: EDIT_UWREVIEW_PENDING
    });
    axios
      .patch(`http://localhost:8080/uwreviews/`, patchedUWReview)
      .then(res => {
        dispatch({
          type: EDIT_UWREVIEW_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: EDIT_UWREVIEW_FAILURE,
          payload: err
        });
      });
  };
};
