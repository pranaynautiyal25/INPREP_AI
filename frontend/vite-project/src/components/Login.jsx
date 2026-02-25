import React, { useState } from 'react'
import { getEmailError, getPasswordError } from '../config/validator';
import './Login.css';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailErr = getEmailError(email);
        const passwordErr = getPasswordError(password);

        setEmailError(emailErr);
        setPasswordError(passwordErr);

        if (emailErr || passwordErr) {
            return;
        }

        console.log("Login successful");

        setEmail('');
        setPassword('');
        setEmailError('');
        setPasswordError('');
    }

    return (
        <div className="main">
            <div className="form">

                <div className="header">
                   <h1> Login</h1>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="input">
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError('');
                            }}
                        />
                        {emailError && <p className="error">{emailError}</p>}
                    </div>

                    <div className="input">
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordError('');
                            }}
                        />
                        {passwordError && <p className="error">{passwordError}</p>}
                    </div>

                    <div className="button">
                        <button type="submit">Sign In</button>
                    </div>

                </form>

                <div>
                    <p>New to INPREP-AI? <a href="/signin">sigin</a></p>
                    <p>Home Page <a href="/">Click Here</a></p>
                </div>

            </div>
        </div>
    )
}

export default Login;