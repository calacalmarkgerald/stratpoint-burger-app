import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
  state = {
    authForm: {
      email: {
        name: 'email',
        type: 'email',
        placeholder: 'Your email',
        value: '',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 50
        },
        valid: false,
        errors: [],
        touched: false
      },
      password: {
        name: 'password',
        type: 'password',
        placeholder: 'Your password',
        value: '',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 50
        },
        valid: false,
        errors: [],
        touched: false
      }
    },
    isFormValid: false,
    isSignup: false,
    error: null
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
          prevState.authForm[target].validation
        );

        return {
          authForm: {
            ...prevState.authForm,
            [target]: {
              ...prevState.authForm[target],
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
          isFormValid: !Object.keys(prevState.authForm)
            .map(key => prevState.authForm[key].valid)
            .some(val => val === false)
        }));
      }
    );
  };

  switchAuthMode = () => {
    this.setState(prevState => ({
      isSignup: !prevState.isSignup
    }));
  };

  authHandler = e => {
    e.preventDefault();

    const formData = Object.keys(this.state.authForm).reduce((data, key) => {
      data[key] = this.state.authForm[key].value;
      return data;
    }, {});

    console.log(formData);
    //Auth Submit logic here
    this.props.auth(formData.email, formData.password, this.state.isSignup);
  };

  render() {
    let form = <Spinner />;
    if (!this.props.loading) {
      form = (
        <form onSubmit={this.authHandler}>
          {Object.keys(this.state.authForm).map(key => (
            <Input
              key={key}
              onInputChange={this.inputChangeHandler}
              {...this.state.authForm[key]}
            />
          ))}

          <Button type='Success' disabled={!this.state.isFormValid}>
            SUBMIT
          </Button>
        </form>
      );
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      const params = new URLSearchParams(this.props.location.search);
      let redirectUrl = '/';

      if (params.get('redirect')) {
        redirectUrl = params.get('redirect');
      }
      authRedirect = <Redirect to={redirectUrl} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        {form}
        <Button type='Danger' clicked={this.switchAuthMode}>
          SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps, { auth: actions.auth })(Auth);
