import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getEmailError, getPasswordError, getConfirmPasswordError } from '../config/validator';
import './Signin.css';

const Signin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailErr = getEmailError(email);
        const passwordErr = getPasswordError(password);
        const confirmPasswordErr = getConfirmPasswordError(password, confirmpassword);

        setEmailError(emailErr);
        setPasswordError(passwordErr);
        setConfirmPasswordError(confirmPasswordErr);

        if (emailErr || passwordErr || confirmPasswordErr) return;

        console.log("Form submitted successfully");

        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
    }

    return (
        <div className="signin-main">
            <div className="form">

                <div className="header">
                    <h1 style={{color:"#3bf644"}}>Create an Account</h1>
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

                    <div className="input">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmpassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setConfirmPasswordError('');
                            }}
                        />
                        {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
                    </div>

                    <div className="signinButton">
                        <button className="button" type="submit">Sign Up</button>
                    </div>

                </form>

                <div className="extra-links">
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                    <p>
                        <Link to="/">Back to Home</Link>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Signin;