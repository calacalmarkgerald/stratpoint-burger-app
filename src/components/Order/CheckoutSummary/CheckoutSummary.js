import React from 'react';
import PropTypes from 'prop-types';

import classes from './CheckoutSummary.module.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <div>We hope it tastes well!</div>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button type='Danger' clicked={props.onCheckoutCancelled}>
        CANCEL
      </Button>
      <Button type='Success' clicked={props.onCheckoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

CheckoutSummary.propTypes = {};

export default CheckoutSummary;
