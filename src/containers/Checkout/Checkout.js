import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/';

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.push('/');
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  render() {
    return (
      <div>
        {this.props.purchased ? <Redirect to='/' /> : null}
        {this.props.ingredients ? (
          <CheckoutSummary
            ingredients={this.props.ingredients}
            onCheckoutCancelled={this.checkoutCancelledHandler}
            onCheckoutContinued={this.checkoutContinuedHandler}
          />
        ) : (
          <Redirect to='/' />
        )}

        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  purchased: state.order.purchased
});

export default connect(mapStateToProps)(Checkout);
