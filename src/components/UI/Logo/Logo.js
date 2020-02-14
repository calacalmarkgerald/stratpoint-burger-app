import React from 'react';
import PropTypes from 'prop-types';

import logo from '../../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const Logo = props => {
  return (
    <div className={classes.Logo} style={{ maxHeight: props.height }}>
      <img src={logo} alt='Burger Logo' />
    </div>
  );
};

Logo.propTypes = {};

export default Logo;
