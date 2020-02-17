import axios from 'axios';

import * as actionTypes from './actionTypes';

export const auth = (email, password, isSignup) => async dispatch => {
  dispatch({
    type: actionTypes.AUTH_START
  });

  const authData = {
    email,
    password,
    returnSecureToken: true
  };

  let url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDHEwMx1nDXLJvwCDstJVd6qGRN-TBh2ys';

  if (isSignup) {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDHEwMx1nDXLJvwCDstJVd6qGRN-TBh2ys';
  }

  try {
    const result = await axios.post(url, authData);
    const expirationDate = new Date(
      new Date().getTime() + result.data.expiresIn * 1000
    );
    localStorage.setItem('token', result.data.idToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('userId', result.data.localId);

    dispatch({
      type: actionTypes.AUTH_SUCCESS,
      token: result.data.idToken,
      userId: result.data.localId
    });

    setTimeout(
      () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expirationDate');
        dispatch({
          type: actionTypes.AUTH_LOGOUT
        });
      },
      result.data.expiresIn * 1000 //convert millisecond to second
    );
  } catch (error) {
    dispatch({
      type: actionTypes.AUTH_FAILED,
      error: error.response.data.error
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');

  dispatch({
    type: actionTypes.AUTH_LOGOUT
  });
};

export const authCheck = () => dispatch => {
  console.log('auth check');
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  if (!token) {
    logout();
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));

    if (expirationDate > new Date()) {
      console.log('Auth Check');

      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        token,
        userId
      });

      const expiresIn = expirationDate.getTime() - new Date().getTime();
      setTimeout(
        () => {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('expirationDate');
          dispatch({
            type: actionTypes.AUTH_LOGOUT
          });
        },
        expiresIn //convert millisecond to second
      );
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('expirationDate');
      dispatch({
        type: actionTypes.AUTH_LOGOUT
      });
    }
  }
};
