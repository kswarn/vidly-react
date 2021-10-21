import React, { useState } from "react";
import Input from "../common/input";

const LoginForm = () => {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hey");
  };

  const handleInputChange = ({ target: input }) => {
    const accountCopy = { ...account };
    accountCopy[input.id] = input.value;
    setAccount(accountCopy);
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
        />
        <Input
          name="password"
          value={account.password}
          label="Password"
          onChange={handleInputChange}
        />

        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
