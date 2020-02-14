import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(
    (ingredient, index) => (
      <li key={ingredient + index}>
        <span style={{ textTransform: 'capitalize' }}>{ingredient}</span>:{' '}
        {props.ingredients[ingredient]}
      </li>
    )
  );
  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button type='Danger' clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button type='Success' clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Fragment>
  );
};

OrderSummary.propTypes = {};

export default OrderSummary;
