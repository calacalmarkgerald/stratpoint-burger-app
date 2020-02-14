import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/';

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    purchasing: false
  };

  componentDidMount() {
    this.props.onSetIngredients();
    this.props.purchaseInit();
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(ingredient => ingredients[ingredient])
      .reduce((acc, cur) => acc + cur, 0);

    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = { ...this.props.ings };
    for (const key in disabledInfo) {
      if (disabledInfo.hasOwnProperty(key)) {
        disabledInfo[key] = disabledInfo[key] < 1;
      }
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            price={this.props.totalPrice}
            ingredientAdded={this.props.onIngredientsAdded}
            ingredientRemoved={this.props.onIngredientsRemoved}
            disabledInfo={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          totalPrice={this.props.totalPrice}
          purchaseContinued={this.purchaseContinueHandler}
          purchaseCancelled={this.purchaseCancelHandler}
        />
      );
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error
});

export default connect(mapStateToProps, {
  onSetIngredients: actions.setIngredients,
  onIngredientsAdded: actions.addIngredient,
  onIngredientsRemoved: actions.removeIngredient,
  purchaseInit: actions.purchaseInit
})(withErrorHandler(BurgerBuilder, axios));
