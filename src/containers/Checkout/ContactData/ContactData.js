import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../../store/actions/';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        name: 'name',
        type: 'text',
        placeholder: 'Your Name',
        value: '',
        validation: {
          required: true,
          minLength: 2,
          maxLength: 50
        },
        valid: false,
        errors: [],
        touched: false
      },
      email: {
        name: 'email',
        type: 'text',
        placeholder: 'Your Email',
        value: '',
        validation: {
          required: true,
          minLength: 2,
          maxLength: 50
        },
        valid: false,
        errors: [],
        touched: false
      },
      street: {
        name: 'street',
        type: 'text',
        placeholder: 'Street',
        value: '',
        validation: {
          required: true,
          minLength: 2,
          maxLength: 50
        },
        valid: false,
        errors: [],
        touched: false
      },
      zipCode: {
        name: 'zipCode',
        type: 'text',
        placeholder: 'ZIP',
        value: '',
        validation: {
          required: true,
          minLength: 2,
          maxLength: 10
        },
        valid: false,
        errors: [],
        touched: false
      },
      country: {
        name: 'country',
        type: 'text',
        placeholder: 'Country',
        value: '',
        validation: {
          required: true,
          minLength: 2,
          maxLength: 50
        },
        valid: false,
        errors: [],
        touched: false
      },
      deliveryMethod: {
        name: 'deliveryMethod',
        type: 'select',
        placeholder: 'Delivery Method',
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' }
        ],
        value: 'fastest',
        valid: true,
        errors: [],
        touched: false
      }
    },
    isFormValid: false
  };

  checkValidity(field, value, rules) {
    let isValid = true;
    const errors = [];
    if (rules) {
      if (rules.required) {
        const requiredPassed = value.trim() !== '';

        if (!requiredPassed) {
          errors.push(`The ${field} field is required.`);
        }

        isValid = requiredPassed && isValid;
      }

      if (rules.minLength) {
        const minLengthPassed = value.length >= rules.minLength;

        if (!minLengthPassed) {
          errors.push(`The ${field} must be greater than ${rules.minLength}.`);
        }

        isValid = minLengthPassed && isValid;
      }

      if (rules.maxLength) {
        const maxLengthPassed = value.length <= rules.maxLength;

        if (!maxLengthPassed) {
          errors.push(
            `The ${field} must not exceed ${rules.maxLength} characters.`
          );
        }

        isValid = maxLengthPassed && isValid;
      }
    }

    //return [isValid, ['message here', 'message again']]
    return [isValid, errors];
  }

  inputChangeHandler = (target, value) => {
    this.setState(
      prevState => {
        const [valid, errors] = this.checkValidity(
          target,
          value,
          prevState.orderForm[target].validation
        );

        return {
          orderForm: {
            ...prevState.orderForm,
            [target]: {
              ...prevState.orderForm[target],
              value: value,
              touched: true,
              valid: valid,
              errors: errors
            }
          }
        };
      },
      () => {
        this.setState(prevState => ({
          isFormValid: !Object.keys(prevState.orderForm)
            .map(key => prevState.orderForm[key].valid)
            .some(val => val === false)
        }));
      }
    );
  };

  orderHandler = e => {
    e.preventDefault();

    const formData = Object.keys(this.state.orderForm).reduce((data, key) => {
      data[key] = this.state.orderForm[key].value;
      return data;
    }, {});

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };

    this.props.onPurchaseBurger(order, this.props.token);
  };

  render() {
    let form = <Spinner />;
    if (!this.props.loading) {
      form = (
        <form onSubmit={this.orderHandler}>
          {Object.keys(this.state.orderForm).map(key => (
            <Input
              key={key}
              onInputChange={this.inputChangeHandler}
              {...this.state.orderForm[key]}
            />
          ))}

          <Button type='Success' disabled={!this.state.isFormValid}>
            ORDER
          </Button>
        </form>
      );
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

export default connect(mapStateToProps, {
  onPurchaseBurger: actions.purchaseBurger
})(withErrorHandler(ContactData, axios));
