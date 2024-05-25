// src/components/Button.js
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, title }) => (
  <button style={styles.button} onClick={onClick}>
    {title}
  </button>
);

const styles = {
  button: {
    padding: '10px 20px',
    fontSize: '1em',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007BFF',
    color: 'white',
  },
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Button;
