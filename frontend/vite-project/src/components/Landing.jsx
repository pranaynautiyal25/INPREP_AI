import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'

const Landing = () => {
    const navigate = useNavigate()

    return (
        <div className="landing-main">
            <div className="landing-card">

                <h1>Welcome to <span style={{margin:"2%" ,color:"#0062ff"}}>INPREP-AI</span></h1>
                <p className="tagline">
                    <span style={{margin:"2%" ,color:"#00a2ff"}}>Your AI-powered mock interview partner</span>
                </p>

                <div className="landing-section">
                    <button className="button" onClick={() => navigate('/signup')}>
                        New here? <span style={{margin:"2%" ,color:"#00ff0d"}}>Sign Up</span>
                    </button>
                </div>

                <div className="landing-section">
                    
                    <button className="button" onClick={() => navigate('/login')}>
                        Are u Back <span style={{margin:"2%" ,color:"#00ff0d"}}>Login</span>
                    </button>
                </div>

                <div className="landing-section">
                    
                    <button className="button" onClick={() => navigate('/about')}>
                        Are u Curious <span style={{margin:"2%" ,color:"#00ff0d"}}>About-Us</span>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Landing