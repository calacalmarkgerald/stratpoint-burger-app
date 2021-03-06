import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.css';

const Button = props => {
  return (
    <button
      onClick={props.clicked}
      className={[classes.Button, classes[props.type]].join(' ')}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {};

export default Button;
