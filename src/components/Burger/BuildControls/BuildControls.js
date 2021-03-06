import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const BuildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price: {props.price.toFixed(2)}</p>
      {controls.map(control => (
        <BuildControl
          key={control.type}
          label={control.label}
          type={control.type}
          added={() => props.ingredientAdded(control.type)}
          removed={() => props.ingredientRemoved(control.type)}
          disabled={props.disabledInfo[control.type]}
        />
      ))}
      {props.isAuth ? (
        <button
          className={classes.OrderButton}
          disabled={!props.purchasable}
          onClick={props.ordered}
        >
          ORDER NOW
        </button>
      ) : (
        <button
          className={classes.OrderButton}
          disabled={!props.purchasable}
          onClick={props.signUpToPurchase}
        >
          SIGN IN TO ORDER
        </button>
      )}
    </div>
  );
};

export default BuildControls;
