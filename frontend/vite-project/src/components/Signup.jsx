import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getEmailError, getPasswordError, getConfirmPasswordError } from '../config/validator';
import './Signup.css';
import axios from '../config/axios.js'

const Signup = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailErr = getEmailError(email);
        const passwordErr = getPasswordError(password);
        const confirmPasswordErr = getConfirmPasswordError(password, confirmpassword);

        setEmailError(emailErr);
        setPasswordError(passwordErr);
        setConfirmPasswordError(confirmPasswordErr);

        if (emailErr || passwordErr || confirmPasswordErr) {
            alert(emailErr + " " + passwordErr + " " + confirmPasswordErr);
            return;
        }

        const req = {
            email: email,
            password: password
        }
        try {
            await axios.post('/api/auth/signup', req);
            navigate('/login');
        }
        catch (e) {
            setError(e?.response?.data?.message || 'Signup failed');
        }
        console.log("Form submitted successfully");
    }

    return (
        <div className="signup-page">

            {/* Decorative blobs */}
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            <div className="signup-card">

                {/* Brand Header */}
                <div className="signup-brand">
                    <div className="brand-icon">🎯</div>
                    <h1 className="brand-title">INPREP<span>AI</span></h1>
                </div>

                <div className="signup-header">
                    <p>New here? Join INPREP-AI and start practicing AI-powered mock interviews...</p>
                </div>

                <form className="signup-form" onSubmit={handleSubmit}>

                    <div className="field-group">
                        <label className="field-label">Email</label>
                        <div className="input-wrapper">
                            <span className="input-icon">✉️</span>
                            <input
                                className="field-input"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError('');
                                }}
                            />
                        </div>
                        {emailError && <span className="field-error">{emailError}</span>}
                    </div>

                    <div className="field-group">
                        <label className="field-label">Password</label>
                        <div className="input-wrapper">
                            <span className="input-icon">🔒</span>
                            <input
                                className="field-input"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError('');
                                }}
                            />
                        </div>
                        {passwordError && <span className="field-error">{passwordError}</span>}
                    </div>

                    <div className="field-group">
                        <label className="field-label">Confirm It</label>
                        <div className="input-wrapper">
                            <span className="input-icon">🔑</span>
                            <input
                                className="field-input"
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmpassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setConfirmPasswordError('');
                                }}
                            />
                        </div>
                        {confirmPasswordError && <span className="field-error">{confirmPasswordError}</span>}
                    </div>

                    {error && <p className="error-banner">{error}</p>}

                    <button className="signup-btn" type="submit">
                        <span>Sign Up</span>
                        <span className="btn-arrow">→</span>
                    </button>

                </form>

                <div className="signup-footer-links">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                    <p><Link to="/">← Back to Home</Link></p>
                </div>

            </div>
        </div>
    )
}

export default Signup;