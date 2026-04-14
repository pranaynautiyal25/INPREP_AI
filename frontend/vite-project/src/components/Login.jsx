import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { getEmailError, getPasswordError } from '../config/validator';
import './Login.css';
import { useAuth } from '../Context/AuthContext';
import axios from '../config/axios'

const Login = () => {
    const navigate = useNavigate();
    const { login, user } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [error, setError] = useState('');

    // If already authenticated, redirect to dashboard
    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailErr = getEmailError(email);
        const passwordErr = getPasswordError(password);

        setEmailError(emailErr);
        setPasswordError(passwordErr);

        if (emailErr || passwordErr) {
            alert(emailErr + " " + passwordErr);
            return;
        }

        try {
            setError('');
            await axios.post('/api/auth/login', { email, password });
            const userName = email.split('@')[0];
            login({ UserEmail: email, UserName: userName });
            navigate('/dashboard');
        }
        catch (e) {
            setError(e?.response?.data?.message || 'Login failed');
        }
    }

    return (
        <div className="login-page">

            {/* Decorative blobs */}
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            <div className="login-card">

                {/* Brand Header */}
                <div className="login-brand">
                    <div className="brand-icon">🎯</div>
                    <h1 className="brand-title"><span>INPREP AI</span></h1>
                </div>

                <div className="login-header">
                    <p>Welcome Back User, Glad To See You Again...</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>

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

                    {error && <p className="error-banner">{error}</p>}

                    <button className="login-btn" type="submit">
                        <span>Log In</span>
                        <span className="btn-arrow">→</span>
                    </button>

                </form>

                <div className="login-footer-links">
                    <p>New to INPREP-AI? <Link to="/signup">Sign Up</Link></p>
                    <p><Link to="/">← Back to Home</Link></p>
                </div>

            </div>
        </div>
    )
}

export default Login;