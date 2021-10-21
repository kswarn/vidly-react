import React, { useState } from "react";
import Input from "../common/input";

const LoginForm = () => {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (account.username.trim() === "")
      errors.username = "Username is required";

    if (account.password.trim() === "")
      errors.password = "Password is required";
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});

    if (errors) return;

    // call the server
    console.log("submitted");
  };

  const validateProperty = ({ id, value }) => {
    if (id === "username") {
      if (value.trim() === "") return "Username is required.";
      // ...
    }

    if (id === "password") {
      if (value.trim() === "") return "Password is required.";
      // ...
    }
  };

  const handleInputChange = ({ target: input }) => {
    const errorsClone = { ...errors };

    const errorMessage = validateProperty(input);

    if (errorMessage) errorsClone[input.id] = errorMessage;
    else delete errorsClone[input.id];

    const accountCopy = { ...account };
    accountCopy[input.id] = input.value;

    setAccount(accountCopy);

    setErrors(errorsClone);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          value={account.username}
          label="Username"
          onChange={handleInputChange}
          error={errors.username}
        />
        <Input
          name="password"
          value={account.password}
          label="Password"
          onChange={handleInputChange}
          error={errors.password}
        />

        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
