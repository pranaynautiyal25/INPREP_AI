import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="container">

            <div className='top'>
                <h1>Welcome Back 👋</h1>
            </div>

            <div className='middle'>
                <h2>Look at your previous records</h2>

                <div className='dsa-previous'>
                    <h3>DSA Mock History</h3>
                    <p>No previous DSA mock records yet.</p>
                </div>

                <div className='dev-previous'>
                    <h3>Development Mock History</h3>
                    <p>No previous Dev mock records yet.</p>
                </div>
            </div>

            <div className='bottom'>
                <h2>Start a new mock interview</h2>

                <div className="button-group">
                    <button onClick={() => navigate('/dsa-mock')}>
                        Start DSA Mock
                    </button>

                    <button onClick={() => navigate('/dev-mock')}>
                        Start Dev Mock
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Dashboard