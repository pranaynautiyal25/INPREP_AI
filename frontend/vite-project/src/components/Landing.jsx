import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'

const Landing = () => {
    const navigate = useNavigate()

    return (
        <div className="landing-main">
            <div className='landing-header'>
                <h1><span style={{ color: "#0004ff", fontSize: '40px' }}>INPREP-AI</span></h1>
                <p style={{ paddingTop: "20px"}}>
                    <span style={{color: "#5100ff", fontSize: '20px' }}><b>Your AI-powered mock interview partner</b></span>
                </p>

            </div>
            <div className="landing-card">
                <div className="landing-section">
                    <button className="button" onClick={() => navigate('/signup')}>
                        New here? :<span style={{ margin: "2%", color: "#00ff00" }}> Sign Up</span>
                    </button>
                </div>

                <div className="landing-section">

                    <button className="button" onClick={() => navigate('/login')}>
                        Are u Back : <span style={{ margin: "2%", color: "#00ff00" }}>Login</span>
                    </button>
                </div>

                <div className="landing-section">

                    <button className="button" onClick={() => navigate('/about')}>
                        Are u Curious : <span style={{ margin: "2%", color: "#00ff00" }}>About-Us</span>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Landing