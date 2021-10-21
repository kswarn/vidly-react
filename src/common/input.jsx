import React from "react";

const Input = ({ name, label, value, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label} </label>
      <input
        autoFocus={true}
        value={value}
        onChange={onChange}
        type="text"
        id={name}
        className="form-control"
      ></input>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
