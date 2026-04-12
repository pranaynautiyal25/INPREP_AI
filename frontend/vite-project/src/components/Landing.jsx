import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'

const Landing = () => {
    const navigate = useNavigate()

    return (
        <div className="landing-page">

            {/* Decorative blobs */}
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            {/* Hero Section */}
            <div className="landing-hero">

                <div className="landing-brand">
                    <div className="brand-icon">🎯</div>
                    <h1 className="brand-title">INPREP<span>AI</span></h1>
                </div>

                <div className="landing-header">
                    <p>Your AI-powered mock interview partner</p>
                </div>

                <div className="landing-divider"></div>

                {/* Action Cards */}
                <div className="landing-card">

                    <button className="landing-btn btn-signup" onClick={() => navigate('/signup')}>
                        <div className="btn-content">
                            <span className="btn-emoji">🚀</span>
                            <div className="btn-text">
                                <span className="btn-label">New here?</span>
                                <span className="btn-action">Sign Up</span>
                            </div>
                        </div>
                        <span className="btn-arrow">→</span>
                    </button>

                    <button className="landing-btn btn-login" onClick={() => navigate('/login')}>
                        <div className="btn-content">
                            <span className="btn-emoji">👋</span>
                            <div className="btn-text">
                                <span className="btn-label">Are you back?</span>
                                <span className="btn-action">Login</span>
                            </div>
                        </div>
                        <span className="btn-arrow">→</span>
                    </button>

                    <button className="landing-btn btn-about" onClick={() => navigate('/about')}>
                        <div className="btn-content">
                            <span className="btn-emoji">💡</span>
                            <div className="btn-text">
                                <span className="btn-label">Are you curious?</span>
                                <span className="btn-action">About Us</span>
                            </div>
                        </div>
                        <span className="btn-arrow">→</span>
                    </button>

                </div>

            </div>
        </div>
    )
}

export default Landing