import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'


const Landing = () => {
    const navigate = useNavigate()

    return (
        <div className="landing-main">
            <div className="landing-card">
                <h1>Welcome to INPREP-AI</h1>

                <div className="landing-section">
                    <b>New to our app?</b>
                    <br />
                    <button onClick={() => navigate('/signin')}><b>Sign Up</b></button>
                </div>

                <div className="landing-section">
                    <b>Already a user?</b>
                    <br />
                    <button onClick={() => navigate('/login')}><b>Login</b></button>
                </div>

                <div className="landing-section">
                    <b>Want to know about our app?</b>
                    <br />
                    <button onClick={() => navigate('/about')}><b>Learn More</b></button>
                </div>

            </div>
        </div>
    )
}

export default Landing