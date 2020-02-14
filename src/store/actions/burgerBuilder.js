import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ingredientName => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingredientName
  };
};

export const removeIngredient = ingredientName => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredientName
  };
};

export const setIngredients = () => async dispatch => {
  try {
    const response = await axios.get(
      'https://stratpoint-burger-api.firebaseio.com/ingredients.json'
    );

    dispatch({
      type: actionTypes.SET_INGREDIENTS,
      ingredients: response.data
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_INGREDIENTS_FAILED
    });
  }
};
