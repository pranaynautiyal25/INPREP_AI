import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="container">

            <div className='top'>
                <h1>Welcome Back <span style={{color:"#3b82f6"}}>Pranay</span></h1>
            </div>

            <div className='middle'>
    

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
                

                <div className="button-group">
                    <button className="button" onClick={() => navigate('/dsa-mock')}>
                        Start New DSA Mock
                    </button>

                    <button  className="button" onClick={() => navigate('/dev-mock')}>
                        Start New Dev Mock
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Dashboard