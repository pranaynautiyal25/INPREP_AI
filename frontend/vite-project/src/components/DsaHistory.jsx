import React from 'react'
import { Link } from 'react-router-dom'
import './DsaHistory.css'

const DsaHistory = ({ id, testNo, date, payload }) => {
    function formatDate(isoDate) {
        const d = new Date(isoDate);
        return Number.isNaN(d.getTime()) ? 'N/A' : d.toLocaleString();
    }

    return (
        <div className="hist-card hist-card--dsa">
            <div className="hist-card-accent"></div>

            <div className="hist-card-top">
                <span className="hist-card-emoji">🧠</span>
                <div className="hist-card-title">
                    <span className="hist-card-label">DSA Mock</span>
                    <span className="hist-card-number">#{testNo}</span>
                </div>
            </div>

            <div className="hist-card-middle">
                <div className="hist-card-date">
                    <span className="hist-date-icon">📅</span>
                    <span>{formatDate(date)}</span>
                </div>
            </div>

            <div className="hist-card-bottom">
                <Link
                    className="hist-card-link"
                    to={`/mock-dsa/${id}`}
                    state={{ payload }}
                >
                    View Details
                    <span className="hist-link-arrow">→</span>
                </Link>
            </div>
        </div>
    )
}

export default DsaHistory