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

        if (emailErr || passwordErr || confirmPasswordErr){ 
            alert(emailErr+ " "+passwordErr+" "+confirmPasswordErr);
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
        <div className="login-main">

    <div className="signup-header">
        <b>
            <p style={{ color: "#1e00ff" }}>

                New To INPREP-AI ? Join INPREP-AI and start practicing AI-powered mock interviews...
            </p>
        </b>
    </div>

    <div>
        <div className="form">

            <form onSubmit={handleSubmit}>

                <div className="login-input">
                    <b>
                        <p style={{ fontSize: "13px", paddingRight: "40px" }}>Email :</p>
                    </b>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError('');
                        }}
                    />
                </div>
                

                <div className="login-input">
                    <b>
                        <p style={{ fontSize: "13px", paddingRight: "15px" }}>Password :</p>
                    </b>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError('');
                        }}
                    />
                </div>
                

                <div className="login-input">
                    <b>
                        <p style={{ fontSize: "13px", paddingRight: "18px" }}>Confirm It:</p>
                    </b>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmpassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setConfirmPasswordError('');
                        }}
                    />
                </div>


                <div className="loginButton">
                    <button type="submit">Sign Up</button>
                </div>

                {error && <p className="error">{error}</p>}

            </form>

        </div>

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

export default Signup;
