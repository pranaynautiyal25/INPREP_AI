import React from 'react'
import { Link } from 'react-router-dom'
import './DsaHistory.css'

const DsaHistory = ({ id, testNo, date, payload }) => {
    function formatDate(isoDate) {
        const d = new Date(isoDate);
        return Number.isNaN(d.getTime()) ? 'N/A' : d.toLocaleString();
    }
    return (
        <div className='dsa-card'>

            <div className='cardtop'>
                DSA Mock {testNo}
            </div>

            <div className='cardmiddle'>
                Date: {formatDate(date)}
                <br />

                <Link to={`/mock-dsa/${id}`}
                    state={{ payload }}>
                    Performance Details
                </Link>
            </div>

        </div>
    )
}

export default DsaHistory
