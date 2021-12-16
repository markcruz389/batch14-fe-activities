import React from "react";
import PropTypes from "prop-types";

const TextInput = ({ name, label, placeholder, value, onChange }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input
      type='text'
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextInput;
