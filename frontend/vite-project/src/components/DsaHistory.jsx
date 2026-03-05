import React from 'react'
import { Link } from 'react-router-dom'
import './DsaHistory.css'

const DsaHistory = ({ id, testNo, date }) => {
    return (
        <div className='dsa-card'>

            <div className='top'>
                DSA Mock {testNo}
            </div>

            <div className='middle'>
                Date: {date}
                <br />

                <Link to={`/dsa-history/${id}`}>
                    Performance Details
                </Link>
            </div>

        </div>
    )
}

export default DsaHistory