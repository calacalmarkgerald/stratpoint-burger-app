import React from 'react';
import PropTypes from 'prop-types';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
  let ingredients = Object.keys(props.ingredients).flatMap(ingredientKey => {
    return [...Array(props.ingredients[ingredientKey])].map((_, i) => (
      <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
    ));
  });
  //.flat();
  // .reduce((prev, curr) => {
  //   return prev.concat(curr);
  // }, []);

  if (ingredients.length === 0) {
    ingredients = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={'bread-top'} />
      {ingredients}
      <BurgerIngredient type={'bread-bottom'} />
    </div>
  );
};

Burger.propTypes = {
  ingredients: PropTypes.object.isRequired
};

export default Burger;
