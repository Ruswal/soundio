import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Link,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import axios from "../api/axios.js";
import { REGISTER_URL } from "../assets/constants.js";
import AuthContext from "../context/AuthProvider.jsx";
import "./style/form.css";

function Register(props) {
  const REGISTER_URL = "http://localhost:3001/register";

  const errRef = useRef();
  const userRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [artistChecked, setArtistChecked] = useState();
  const [err, setErr] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [genre, setGenre] = useState("");

  useEffect(() => {
    setErr("");
  }, [email, pass, name, genre]);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const validateForm = () => {
    let isValid = true;
    if (name.trim() === "") {
      setErr("Please enter your name.");
      isValid = false;
    } else if (email.trim() === "") {
      setErr("Please enter your email address.");
      isValid = false;
    } else if (!isValidEmail(email.trim())) {
      setErr("Please enter a valid email address.");
      isValid = false;
    } else if (pass.trim() === "") {
      setErr("Please enter a password.");
      isValid = false;
    } else if (!isValidPass(pass.trim())) {
      setErr(
        "Please enter a valid password address. Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
      );
      isValid = false;
    }
    return isValid;
  };

  const isValidEmail = (email) => {
    // Email validation logic
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPass = (email) => {
    // Password validation logic
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(pass);
  };
  const handleChange = (e) => {
    setArtistChecked(e.target.checked);
    if (e.target.checked) document.getElementById("genre").disabled = false;
    else document.getElementById("genre").disabled = true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      errRef.current.focus();
      return;
    }

    setShowAlert(true);

    try {
      const response = await axios.post(
        REGISTER_URL,
        {
          email: email,
          password: pass,
          username: name,
          artist: artistChecked,
          genre: genre,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(JSON.stringify(response?.data));

      setEmail("");
      setPass("");
      setName("");
      setGenre("");
      setArtistChecked(false);
      document.getElementById("artist-checkbox").checked = false;
    } catch (err) {
      if (!err?.response) {
        setErr("No server response.");
      } else if (err?.response === 400) {
        setErr("Invalid input.");
      } else if (err?.response === 401) {
        setErr("unauthorized.");
      } else {
        setErr("Registration failed.");
      }
      errRef.current.focus();
    }
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);

    setTimeout(() => {
      e.target.submit();
    }, 5000);
  };

  return (
    <div className="form-container">
      {showAlert && (
        <div className="alert">Registration successful, return to login</div>
      )}
      <p
        ref={errRef}
        className={err ? "errmessage" : "offscreen"}
        aria-live="assertive"
      >
        {err}
      </p>

      <form className="registration-form" onSubmit={handleSubmit}>
        <p className="formHeader">Soundio</p>

        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="name"
          placeholder="Full Name"
          id="name"
          name="name"
          ref={userRef}
          autoComplete="given-name"
          required
        />

        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter E-mail"
          id="email"
          name="email"
          autoComplete="given-name"
          required
        />

        <input
          className="input"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="Enter Password"
          id="password"
          name="password"
          autoComplete="off"
          required
        />

        <div className="input button">
          <input
            type="checkbox"
            id="artist-checkbox"
            label="Register as an artist?"
            className="button"
            onChange={handleChange}
          />
          <label for="artist-checkbox">Register as an artist?</label>
        </div>

        <input
          className="input"
          disabled={true}
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          type="genre"
          placeholder="Genre"
          id="genre"
          name="Genre"
          required
        />

        <button className="button">Register</button>
        <Link to="/login" className="button">
          Return to login
        </Link>
      </form>
    </div>
  );
}

export default Register;
