import React, { useContext, useEffect, useRef, useState } from "react";
import axios from '../api/axios.js';
import AuthContext from "../context/AuthProvider.jsx";

const LOGIN_URL = '/login';

function Login(props) {

	const {setAuth} = useContext(AuthContext);
	const userRef = useRef();
	const errRef = useRef();

	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setMessage('');
	}, [email, pass]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:3001/login', JSON.stringify({email, pass}), {
				headers: {
					'Content-Type': 'application/json',
					withCredentials: true,
				}
			});

			console.log(JSON.stringify(response?.data));

			const accessToken = response?.data?.accessToken;
			const roles = response?.data?.roles;
			setAuth({email, pass, roles, accessToken});

			setEmail('');
			setPass('');
		} catch (err) {
			if(!err?.response){
				setMessage('No server response.');
			}else if(err.response?.status === 400){
				setMessage('Missing email or password');
			}else if(err.response?.status === 401){
				setMessage('unauthorized');
			}else{
				setMessage('Login Failed');
			}
			errRef.current.focus();
		}
	};

	return (<div className="form-container">
		<p ref={errRef} className={message ? "errmessage" : "offscreen"} aria-live='assertive'>{message}</p>
		<form method="post" className="login-form" onSubmit={handleSubmit}>
			
			<label htmlFor="email"> Email </label>
			<input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" id="email" ref={userRef} name="email" autoComplete="given-name" required/>

			<label htmlFor="password"> Password </label>
			<input className="input" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password" autoComplete="off" required/>

			<button className="button">
				Log In
			</button>
		</form>
		<button className="button" onClick={() => props.onFormSwitch("register")}>
			Register here
		</button>
	</div>);
}

export default Login;
