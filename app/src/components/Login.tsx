import React, { useState } from "react";

function Login(props: any) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email"> Email </label>
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
          id="email"
          name="email"
          autoComplete="given-name"
        />
        <label htmlFor="password"> Password </label>
        <input
          className="input"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="*********"
          id="password"
          name="password"
          autoComplete="off"
        />
        <button className="button" type="submit">
          Log In
        </button>
      </form>
      <button className="button" onClick={() => props.onFormSwitch("register")}>
        Register here
      </button>
    </div>
  );
}

export default Login;
