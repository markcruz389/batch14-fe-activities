import React from "react";
import PropTypes from "prop-types";

const TextareaInput = ({ name, label, placeholder, value, onChange }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <textarea
      type='text'
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    ></textarea>
  </div>
);

TextareaInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextareaInput;
