import React, { useState } from 'react'
import { validateEmail, validatePassword, getEmailError, getPasswordError, getConfirmPasswordError } from '../config/validator';
import './Signin.css';

const Signin = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');
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

        if (emailErr || passwordErr || confirmPasswordErr) {
            return;
        }

        // Success case
        console.log("Form submitted successfully");

        setemail('');
        setpassword('');
        setconfirmpassword('');
    }

    return (
        <div className="main">
            <div className="form">
                <div className="header">
                    <h1>Create an account</h1>
                </div>

                <form onSubmit={handleSubmit}>



                    {emailError && <p className='error'>{emailError}</p>}

                    <div className="input">
                        <label>Email: </label>
                        <input type="email" placeholder='Enter your email' value={email} onChange={(e) => { setemail(e.target.value); setEmailError('') }} />
                    </div>


                    {passwordError && <p className='error'>{passwordError}</p>}

                    <div className="input">
                        <label>Password: </label>
                        <input type="password" placeholder='Enter your password' value={password} onChange={(e) => { setpassword(e.target.value); setPasswordError('') }} />
                    </div>

                    {confirmPasswordError && <p className='error'>{confirmPasswordError}</p>}
                    <div className="input">
                        <label>Confirm Password: </label>
                        <input type="password" placeholder='Confirm Password' value={confirmpassword} onChange={(e) => { setconfirmpassword(e.target.value); setConfirmPasswordError('') }} />
                    </div>
                    <div className="button">
                        <button type="submit">Sign-in</button>
                    </div>
                </form>
                <div>
                    <p>Already have an account? <a href="/login">Log-in</a></p>
                    <p>Home Page <a href="/">Click Here</a></p>
                </div>
            </div>

        </div>
    )
}

export default Signin