import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'

const Landing = () => {
    const navigate = useNavigate()

    return (
        <div className="landing-main">
            <div className="landing-card">

                <h1>Welcome to INPREP-AI 🚀</h1>
                <p className="tagline">
                    Your AI-powered mock interview partner
                </p>

                <div className="landing-section">
                    <p><strong>New here?</strong></p>
                    <button onClick={() => navigate('/signin')}>
                        Sign Up
                    </button>
                </div>

                <div className="landing-section">
                    <p><strong>Already have an account?</strong></p>
                    <button onClick={() => navigate('/login')}>
                        Login
                    </button>
                </div>

                <div className="landing-section">
                    <p><strong>Want to know more?</strong></p>
                    <button onClick={() => navigate('/about')}>
                        Learn More
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Landing