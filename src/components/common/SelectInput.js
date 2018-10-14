import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = ({
  name, label, onChange, defaultOption, value, error, options,
}) => (
  <div className="form-group">
    <label htmlFor={name}>
      {label}
    </label>
    <div className="field">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
      >
        {defaultOption !== '' && (
        <option value={0}>{defaultOption}</option>)}
        {options
          .map(option => (
            <option key={option.priority.value} value={option.priority.value}>
              {option.priority.text}
            </option>
          ))
          }
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  </div>
);

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.number,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
};

SelectInput.defaultProps = {
  defaultOption: '',
  value: 0,
  error: '',
  options: '',
};

export default SelectInput;
