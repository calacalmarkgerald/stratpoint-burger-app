import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';

export const purchaseBurger = (order, token) => async dispatch => {
  try {
    dispatch({
      type: actionTypes.PURCHASE_BURGER_START
    });

    const response = await axios.post('/orders.json?auth=' + token, order);
    dispatch({
      type: actionTypes.PURCHASE_BURGER_SUCCESS,
      order,
      id: response.data.name
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PURCHASE_BURGER_FAILED,
      error
    });
  }
};

export const purchaseInit = () => dispatch => {
  dispatch({
    type: actionTypes.PURCHASE_INIT
  });
};

export const fetchOrders = (token, userId) => async dispatch => {
  try {
    const queryParams =
      '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    dispatch({
      type: actionTypes.FETCH_ORDERS_START
    });
    const result = await axios.get('/orders.json' + queryParams);
    dispatch({
      type: actionTypes.FETCH_ORDERS_SUCCESS,
      orders: result.data
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_ORDERS_FAILED
    });
  }
};
