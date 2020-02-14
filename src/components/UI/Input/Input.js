import React from 'react';
import PropTypes from 'prop-types';

import classes from './Input.module.css';

const Input = ({ onInputChange, valid, touched, errors, ...props }) => {
  let inputElement = null;
  const classesArray = [classes.InputElement];

  if (touched) {
    if (valid) {
      classesArray.push(classes.Valid);
    } else {
      classesArray.push(classes.Invalid);
    }
  }

  const inputClasses = classesArray.join(' ');

  switch (props.type) {
    case 'text':
      inputElement = (
        <input
          {...props}
          className={inputClasses}
          onChange={e => onInputChange(e.target.name, e.target.value)}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          {...props}
          className={inputClasses}
          onChange={e => onInputChange(e.target.name, e.target.value)}
        ></textarea>
      );
      break;
    case 'select':
      inputElement = (
        <select
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          className={inputClasses}
          onChange={e => onInputChange(e.target.name, e.target.value)}
        >
          {props.options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          {...props}
          className={inputClasses}
          onChange={e => onInputChange(e.target.name, e.target.value)}
        />
      );
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {errors.map((error, index) => (
        <span key={index} className={classes.ErrorMessage}>
          {error}
        </span>
      ))}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired
};

export default Input;
