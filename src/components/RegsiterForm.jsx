import React, { Component } from "react";
import Form from "../common/Form";
import Input from "../common/input";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = () => {
    // call the server
    console.log("submitted");
  };
  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="email"
            name="username"
            value={data.username}
            label="Username"
            onChange={this.handleInputChange}
            error={errors.username}
          />
          <Input
            type="password"
            name="password"
            value={data.password}
            label="Password"
            onChange={this.handleInputChange}
            error={errors.password}
          />
          <Input
            type="text"
            name="name"
            value={data.name}
            label="Name"
            onChange={this.handleInputChange}
            error={errors.name}
          />

          <button disabled={this.validate()} className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
