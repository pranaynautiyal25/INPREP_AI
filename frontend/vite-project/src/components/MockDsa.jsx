import React from 'react'
import './MockDsa.css'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const MockDsa = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const info = location.state.payload;

    return (
        <div className="report-page">

            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            <div className="report-inner">

                {/* ── Top Bar ── */}
                <div className="report-topbar">
                    <button className="report-back-btn" onClick={() => navigate('/dashboard')}>
                        <FaArrowLeft />
                        <span>Dashboard</span>
                    </button>
                    <div className="report-topbar-title">
                        <span className="report-tag report-tag--dsa">DSA</span>
                        <h1 className="report-heading">Mock Insights</h1>
                    </div>
                    <div className="report-topbar-right"></div>
                </div>

                {/* ── Score Banner ── */}
                <div className="score-banner">
                    <div className="score-item">
                        <span className="score-icon">💻</span>
                        <div className="score-detail">
                            <span className="score-label">Code Score</span>
                            <span className="score-value">{info.codeScore}<span className="score-max">/10</span></span>
                        </div>
                    </div>
                    <div className="score-divider"></div>
                    <div className="score-item">
                        <span className="score-icon">🗣️</span>
                        <div className="score-detail">
                            <span className="score-label">Explanation & Communication</span>
                            <span className="score-value">{info.explainationScore}<span className="score-max">/10</span></span>
                        </div>
                    </div>
                </div>

                {/* ── Question Block ── */}
                <div className="report-grid-top">
                    <div className="report-card report-card--full">
                        <div className="report-card-header">
                            <span className="rch-icon">❓</span>
                            <span className="rch-title">Question</span>
                        </div>
                        <p className="report-card-body">{info.question}</p>
                    </div>

                    <div className="report-card report-card--full">
                        <div className="report-card-header">
                            <span className="rch-icon">⚠️</span>
                            <span className="rch-title">Constraint</span>
                        </div>
                        <p className="report-card-body">{info.constraint}</p>
                    </div>
                </div>

                {/* ── Approaches ── */}
                <div className="report-grid-two">
                    <div className="report-card report-card--indigo">
                        <div className="report-card-header">
                            <span className="rch-icon">🧑‍💻</span>
                            <span className="rch-title">Your Approach</span>
                        </div>
                        <p className="report-card-body">{info.yourApproach}</p>
                    </div>

                    <div className="report-card report-card--cyan">
                        <div className="report-card-header">
                            <span className="rch-icon">⚡</span>
                            <span className="rch-title">Better Approach</span>
                        </div>
                        <p className="report-card-body">{info.betterApproach}</p>
                    </div>
                </div>

                {/* ── Reviews ── */}
                <div className="report-grid-two">
                    <div className="report-card">
                        <div className="report-card-header">
                            <span className="rch-icon">🔍</span>
                            <span className="rch-title">Code Review</span>
                        </div>
                        <p className="report-card-body">{info.codeReview}</p>
                    </div>

                    <div className="report-card">
                        <div className="report-card-header">
                            <span className="rch-icon">💬</span>
                            <span className="rch-title">Explanation & Communication Review</span>
                        </div>
                        <p className="report-card-body">{info.explainationReview || 'Pending'}</p>
                    </div>
                </div>

                {/* ── Improvement ── */}
                <div className="report-card report-card--green report-card--full">
                    <div className="report-card-header">
                        <span className="rch-icon">📈</span>
                        <span className="rch-title">Improvement Scope</span>
                    </div>
                    <p className="report-card-body">{info.improvementScope}</p>
                </div>

            </div>
        </div>
    )
}

export default MockDsa