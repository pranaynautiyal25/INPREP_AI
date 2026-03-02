import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { getEmailError, getPasswordError } from '../config/validator';
import './Login.css';
import { useAuth } from '../Context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login, user } = useAuth();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailErr = getEmailError(email);
        const passwordErr = getPasswordError(password);

        setEmailError(emailErr);
        setPasswordError(passwordErr);

        if (emailErr || passwordErr) return;


        //backend connection for login

        login({ email });
        navigate('/dashboard');

    }

    return (
        <div className="login-main">
            <div className="form">

                <div className="header">
                    <h1 style={{ color: "#3bf644" }}>Login</h1>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="input">
                        <label>Email</label>
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
                        <label>Password</label>
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

                    <div className="loginButton">
                        <button type="submit">Log In</button>
                    </div>

                </form>

                <div className="extra-links">
                    <p>
                        New to INPREP-AI? <Link to="/signin">Sign Up</Link>
                    </p>
                    <p>
                        <Link to="/">Back to Home</Link>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Login;