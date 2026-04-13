import React from 'react'
import './dev.css'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dev = () => {
    const navigate = useNavigate();

    return (
        <div className="dev-page">

            {/* Blobs */}
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            <div className="dev-inner">

                {/* ── Top Bar ── */}
                <div className="dev-topbar">
                    <button className="dev-back-btn" onClick={() => navigate('/dashboard')}>
                        <FaArrowLeft />
                        <span>Dashboard</span>
                    </button>
                    <div className="dev-topbar-title">
                        <span className="dev-tag">DEV</span>
                        <h1 className="dev-heading">Web Development Mock Interview</h1>
                    </div>
                    <div className="dev-topbar-right"></div>
                </div>

                {/* ── Hero Quote ── */}
                <div className="dev-quote-card">
                    <span className="dev-quote-mark">"</span>
                    <div className="dev-quote-body">
                        <p className="dev-quote-text">
                            Programming isn't about what you know; it's about what you can figure out.
                        </p>
                        <span className="dev-quote-author">— Chris Pine</span>
                    </div>
                </div>

                {/* ── Category Picker ── */}
                <div className="dev-section-label">
                    <span className="dev-section-icon">🎯</span>
                    <span>Choose your interview category</span>
                </div>

                <div className="dev-grid">

                    <button className="dev-cat-btn dev-cat-btn--frontend" onClick={() => navigate('/dev/frontend')}>
                        <div className="dev-cat-content">
                            <span className="dev-cat-emoji">🎨</span>
                            <div className="dev-cat-text">
                                <span className="dev-cat-label">Design & UI</span>
                                <span className="dev-cat-name">Frontend</span>
                            </div>
                        </div>
                        <span className="dev-cat-arrow">→</span>
                    </button>

                    <button className="dev-cat-btn dev-cat-btn--backend" onClick={() => navigate('/dev/backend')}>
                        <div className="dev-cat-content">
                            <span className="dev-cat-emoji">⚙️</span>
                            <div className="dev-cat-text">
                                <span className="dev-cat-label">APIs & Servers</span>
                                <span className="dev-cat-name">Backend</span>
                            </div>
                        </div>
                        <span className="dev-cat-arrow">→</span>
                    </button>

                    <button className="dev-cat-btn dev-cat-btn--fullstack" onClick={() => navigate('/dev/fullstack')}>
                        <div className="dev-cat-content">
                            <span className="dev-cat-emoji">🔗</span>
                            <div className="dev-cat-text">
                                <span className="dev-cat-label">End-to-End</span>
                                <span className="dev-cat-name">Fullstack</span>
                            </div>
                        </div>
                        <span className="dev-cat-arrow">→</span>
                    </button>

                    <button className="dev-cat-btn dev-cat-btn--database" onClick={() => navigate('/dev/database')}>
                        <div className="dev-cat-content">
                            <span className="dev-cat-emoji">🗄️</span>
                            <div className="dev-cat-text">
                                <span className="dev-cat-label">Queries & Schema</span>
                                <span className="dev-cat-name">Database</span>
                            </div>
                        </div>
                        <span className="dev-cat-arrow">→</span>
                    </button>

                </div>

            </div>
        </div>
    )
}

export default Dev