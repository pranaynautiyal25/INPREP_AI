import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './MockDev.css'
import { FaArrowLeft } from 'react-icons/fa';

const MockDev = () => {
    const navigate = useNavigate()
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
                        <span className="report-tag report-tag--dev">DEV</span>
                        <h1 className="report-heading">{info.category} History</h1>
                    </div>
                    <div className="report-topbar-right"></div>
                </div>

                {/* ── Score Banner ── */}
                <div className="score-banner">
                    <div className="score-item">
                        <span className="score-icon">📝</span>
                        <div className="score-detail">
                            <span className="score-label">Answer Score</span>
                            <div>
                                <span className="score-value">{info.answerScore[0]}<span className="score-max">/1</span></span>
                                <span className="score-value">{info.answerScore[1]}<span className="score-max">/1</span></span>
                            </div>
                            <div>
                                <span className="score-value">{info.answerScore[2]}<span className="score-max">/3</span></span>
                                <span className="score-value">{info.answerScore[3]}<span className="score-max">/5</span></span>
                            </div>
                        </div>
                    </div>
                    <div className="score-divider"></div>
                    <div className="score-item">
                        <span className="score-icon">🗣️</span>
                        <div className="score-detail">
                            <span className="score-label">Explanation Score</span>
                            <span className="score-value">{info.explainationScore}<span className="score-max">/10</span></span>
                        </div>
                    </div>
                </div>

                {/* ── Question ── */}
                <div className="report-card report-card--full">
                    <div className="report-card-header">
                        <span className="rch-icon">❓</span>
                        <span className="rch-title">Question</span>
                    </div>
                    <p className="report-card-body">{info.question}</p>
                </div>

                {/* ── Answers ── */}
                <div className="report-grid-two">
                    <div className="report-card report-card--indigo">
                        <div className="report-card-header">
                            <span className="rch-icon">🧑‍💻</span>
                            <span className="rch-title">Your Answer</span>
                        </div>
                        <p className="report-card-body">{info.yourAnswer}</p>
                    </div>

                    <div className="report-card report-card--cyan">
                        <div className="report-card-header">
                            <span className="rch-icon">✅</span>
                            <span className="rch-title">Correct Answer</span>
                        </div>
                        <p className="report-card-body">{info.correctAnswer}</p>
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

export default MockDev