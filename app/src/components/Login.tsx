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
      <form onSubmit={handleSubmit}>
        <label htmlFor="email"> email </label>
        <input
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
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="*********"
          id="password"
          name="password"
          autoComplete="off"
        />
        <button type="submit">Log In</button>
      </form>
      <button onClick={() => props.onFormSwitch("register")}>
        Regitser here
      </button>
    </div>
  );
}

export default Login;
