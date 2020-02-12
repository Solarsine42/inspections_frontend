import axios from "axios";
import {
  LOAD_ADDRESSES_SUCCESS,
  LOAD_ADDRESSES_FAILURE,
  LOAD_ADDRESSES_PENDING,
  LOAD_ADDRESS_SUCCESS,
  LOAD_ADDRESS_FAILURE,
  LOAD_ADDRESS_PENDING
} from "../constants";

export const getAddresses = () => {
  return dispatch => {
    dispatch({
      type: LOAD_ADDRESSES_PENDING
    });
    axios
      .get("http://localhost:8080/addresses")
      .then(res => {
        dispatch({
          type: LOAD_ADDRESSES_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: LOAD_ADDRESSES_FAILURE,
          payload: err
        });
      });
  };
};

export const getOneAddress = id => {
  return dispatch => {
    dispatch({
      type: LOAD_ADDRESS_PENDING
    });
    axios
      .get(`http://localhost:8080/addresses/${id}`)
      .then(res => {
        dispatch({
          type: LOAD_ADDRESS_SUCCESS,
          payload: res.data
        });
      })
      .catch(err =>
        dispatch({
          type: LOAD_ADDRESS_FAILURE,
          payload: err
        })
      );
  };
};
