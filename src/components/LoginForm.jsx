import React, { useRef, useEffect } from "react";

const LoginForm = () => {
  const usernameRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hey");
  };

  useEffect(() => {
    usernameRef.current.focus();
  });
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            // autoFocus={true}
            ref={usernameRef}
            type="text"
            id="username"
            className="form-control"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type="text" className="form-control"></input>
        </div>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
