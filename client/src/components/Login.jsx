import React, { useState } from "react";
function Login(props) {

	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(email + pass)
		try {
			const response = await fetch('/login', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify({email, pass}),
			})

			if(response.ok){
				const data = await response.json();
				console.log('logged in successfully: ', data);
			}else{
				console.log('Login failed');
			}
		} catch (error) {
			console.error('Error: ' + error);
		}
	};

	return (<div className="form-container">
		<form className="login-form" onSubmit={handleSubmit}>
			<label htmlFor="email"> Email </label>
			<input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" id="email" name="email" autoComplete="given-name"/>
			<label htmlFor="password"> Password </label>
			<input className="input" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password" autoComplete="off"/>
			<button className="button" type="submit">
				Log In
			</button>
		</form>
		<button className="button" onClick={() => props.onFormSwitch("register")}>
			Register here
		</button>
	</div>);
}

export default Login;
