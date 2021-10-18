import React, { useState } from "react";

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
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            autoFocus={true}
            value={account.username}
            onChange={handleInputChange}
            type="text"
            id="username"
            className="form-control"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            value={account.password}
            onChange={handleInputChange}
            type="text"
            className="form-control"
          ></input>
        </div>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
