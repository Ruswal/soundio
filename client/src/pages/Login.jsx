import { Switch } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import axios from '../api/axios.js';
import AuthContext from "../context/AuthProvider.jsx";
import './style/form.css';

const LOGIN_URL = 'http://localhost:3001/login';

function Login(props) {

	const authContext = useContext(AuthContext);
	const userRef = useRef();
	const errRef = useRef();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [message, setMessage] = useState("");
	const [err, setErr] = useState('');
	

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErr('');
	}, [email, pass]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		try {
			const response = await axios.post(LOGIN_URL, JSON.stringify({email, pass}), {
				headers: {
					'Content-Type': 'application/json',
					withCredentials: true,
				}
			});
			if (!response.data.status) {
				setErr('Login Failed, Missing email or password');

			}else{
				const accessToken = response?.data?.token;
				localStorage.setItem('userID', response.data.ID);
				// setAuth({email, pass, accessToken});
				authContext.onLogin(accessToken, response.data.result);
				setEmail('');
				setPass('');
				// sessionStorage.setItem('userID', response.data.result[0].ID);
			}
			errRef.current.focus();



		} catch (err) {
			console.log(err);
			if(!err.response){
				setErr('No server response.');
			}else if(err.response?.status === 400){
				setErr('Missing email or password');
			}else if(err.response?.status === 401){
				setErr('unauthorized');
			}else{
				setErr('Login Failed');
			}
			errRef.current.focus();
		}


	};

	useEffect(() => {
		if(authContext.isLoggedIn) navigate('/');
	}, [authContext.isLoggedIn, navigate]);

// returns the login form.
	return (
		<div className="form-container">
			<p ref={errRef} className={err ? "errmessage" : "offscreen"} aria-live='assertive'>{err}</p>
			<form method="post" className="login-form" onSubmit={handleSubmit}>
				<p className="formHeader">Soundio</p>
				<input className="input" value={email} onChange={(e) => setEmail(e.target.value.trim())} type="email" placeholder="Enter E-mail" id="email" ref={userRef} name="email" autoComplete="given-name" required/>

				<input className="input" value={pass} onChange={(e) => setPass(e.target.value.trim())} type="password" placeholder="Enter password" id="password" name="password" autoComplete="off" required/>

				<div className = "button-container">
					<button className="button" type="submit">
							Login
					</button>

					<Link to='/register' className='button'> Sign-up </Link>

				</div>
			</form>
		</div>
	);
}

export default Login;
