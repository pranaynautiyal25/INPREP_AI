import React from 'react'
import { Link } from 'react-router-dom'
import './DsaHistory.css'

const DevHistory = ({ id, testNo, date, payload }) => {
  function formatDate(isoDate) {
    const d = new Date(isoDate);
    return Number.isNaN(d.getTime()) ? 'N/A' : d.toLocaleString();
  }
  return (
    <div className='dsa-card'>

      <div className='cardtop'>
        {testNo} :{payload.category}
      </div>

      <div className='cardmiddle'>
        Date: {formatDate(date)}
        <br />

        <Link to={`/mock-dev/${id}`}
          state={{ payload }}>
          Performance Details
        </Link>
      </div>

    </div>
  )
}

export default DevHistory
