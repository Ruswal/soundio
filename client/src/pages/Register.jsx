import React, { useContext, useEffect, useRef, useState } from "react";
import axios from '../api/axios.js';
import AuthContext from "../context/AuthProvider.jsx";
import './form.css';
import { FormControlLabel } from '@mui/material';
import { FormGroup } from '@mui/material';
import { Checkbox } from '@mui/material';

function Register(props) {

  const REGISTER_URL = 'http://localhost:3001/register';
  
  const errRef = useRef();
  const userRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [art, setArtist] = useState(false);
  const [err, setErr] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setErr('');
  }, [email, pass, name]);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowAlert(true);



    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify({name, email, pass}), {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(JSON.stringify(response?.data));

      setEmail('');
      setPass('');
      setName('');
      setArtist(false);
     

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
      {showAlert && (<div className="alert">Registration succesful, redirecting to login page</div>)}
      <p ref={errRef} className={err ? "errmessage" : "offscreen"} aria-live='assertive'>{err}</p>
      <form className="registration-form" onSubmit={handleSubmit}>
        <p className="formHeader">Soundio</p>

        <input className="input" value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Full Name" id="name" name="name" ref = {userRef}autoComplete="given-name" required/>

        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" id="email" name="email" autoComplete="given-name" required/>

        <input className="input" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password" autoComplete="off" required/>
        
        <FormControlLabel control={<Checkbox />} label="Register as an artist?" className="button" value={art} onChange={(e) => setArtist(e.target.value)}/>

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

