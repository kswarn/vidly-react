import React, { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ id, value }) => {
    const propertyObj = {
      [id]: value,
    };

    const propertySchema = { [id]: this.schema[id] };

    const { error } = Joi.validate(propertyObj, propertySchema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit(e);
  };

  handleInputChange = ({ target: input }) => {
    const errorsClone = { ...this.state.errors };

    const errorMessage = this.validateProperty(input);

    if (errorMessage) errorsClone[input.id] = errorMessage;
    else delete errorsClone[input.id];

    const dataCopy = { ...this.state.data };
    dataCopy[input.id] = input.value;

    this.setState({ data: dataCopy });

    this.setState({ errors: errorsClone });
  };
}

export default Form;
