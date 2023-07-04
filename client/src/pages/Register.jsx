import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from '../api/axios.js';
import AuthContext from "../context/AuthProvider.jsx";
import './form.css';

function Register(props) {

  const REGISTER_URL = 'http://localhost:3001/register';

  const errRef = useRef();
  const userRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [artistChecked, setArtistChecked] = useState();
  const [err, setErr] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [genre, setGenre] = useState('');

  useEffect(() => {
    setErr('');
  }, [email, pass, name, genre]);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setArtistChecked(e.target.checked);
    document.getElementById('genre').style.display = 'inline';
    if (!e.target.checked) document.getElementById('genre').style.display = 'none';
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(true);

    try {
      const response = await axios.post(REGISTER_URL, {
        email: email,
        password: pass,
        username: name,
        artist: artistChecked,
        genre: genre,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(JSON.stringify(response?.data));

      setEmail('');
      setPass('');
      setName('');
      setGenre('');
      setArtistChecked(false);
      document.getElementById('artist-checkbox').checked = false;

    } catch (err) {

      if(!err?.response){
        setErr('No server response.');
      } else if(err?.response === 400){
        setErr('Invalid input.');
      } else if(err?.response === 401){
        setErr('unauthorized.');
      } else {
        setErr('Registration failed.');
      }
      errRef.current.focus();
    }
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);

    setTimeout(() => {
      e.target.submit();
    }, 5000);

  }

  return (

    <div className="form-container">
      {showAlert && (<div className="alert">Registration successful, redirecting to login page</div>)}
      <p ref={errRef} className={err ? "errmessage" : "offscreen"} aria-live='assertive'>{err}</p>

      <form className="registration-form" onSubmit={handleSubmit}>
        <p className="formHeader">Soundio</p>

        <input className="input" value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Full Name" id="name" name="name" ref = {userRef}autoComplete="given-name" required/>

        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" id="email" name="email" autoComplete="given-name" required/>

        <input className="input" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password" autoComplete="off" required/>

        <FormControlLabel control={<Checkbox />} id="artist-checkbox" label="Register as an artist?" className="button" onChange={handleChange}/>

        <input className="input" style={{display: 'none'}} value={genre} onChange={(e) => setGenre(e.target.value)} type="genre" placeholder="Genre" id="genre" name="Genre" required/>

        <button className="button">
          Register
        </button>
        <button className="button" onClick={() => props.onFormSwitch("login")}>
          Return to login
        </button>
      </form>


    </div>);
}

export default Register;
