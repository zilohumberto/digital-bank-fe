import React from 'react';

const Input = ({ value, onChange, placeholder, type }) => (
  <input
    className="input"
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export default Input;

/*

.input {
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 0 10px;
}
*/