import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext';
import './Dashboard.css'
import { FaSignOutAlt } from 'react-icons/fa';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    return (
        <div className="container">

            <div className='top'>
                <div style={{ width: "60%", justifyItems: "right" }}>
                    <h1>Welcome Back <span style={{ color: "#3b82f6" }}>{user.UserName}</span></h1>
                </div>
                <div style={{ paddingLeft: "30%", paddingRight: "5%" }}>
                    <button className="buttonLogout" onClick={() => { logout(); navigate('/login'); }}>
                        <FaSignOutAlt style={{ height: "100%", width: "100%" }}></FaSignOutAlt>
                    </button>
                </div>
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

                    <button className="button" onClick={() => navigate('/dev-mock')}>
                        Start New Dev Mock
                    </button>


                </div>
            </div>

        </div>
    )
}

export default Dashboard