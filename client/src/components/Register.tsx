import React, { useState } from "react";

function Register(props: any) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="form-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <label htmlFor="name"> Full Name </label>
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="name"
          placeholder="Full Name"
          id="name"
          name="name"
          autoComplete="given-name"
        />
        <label htmlFor="email"> email </label>
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
      </form>
      <button
        className="button"
        type="submit"
        onClick={() => props.onFormSwitch("login")}
      >
        Register
      </button>
    </div>
  );
}

export default Register;
