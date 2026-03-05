import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext';
import './Dashboard.css'
import { FaSignOutAlt } from 'react-icons/fa';
import DsaHistory from '../components/DsaHistory';

const Dashboard = () => {

    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const [dsa] = useState([
        { id: 1, testNo: 1, date: "10 Mar" },
        { id: 2, testNo: 2, date: "11 Mar" },
        { id: 3, testNo: 3, date: "12 Mar" },
        { id: 4, testNo: 4, date: "13 Mar" },
        { id: 5, testNo: 5, date: "14 Mar" },
        { id: 6, testNo: 6, date: "15 Mar" },
        { id: 7, testNo: 7, date: "16 Mar" },
        { id: 8, testNo: 8, date: "17 Mar" }
    ]);

    const [traverse, setTraverse] = useState(0);

    const nextDsa = () => {
        if (traverse + 4 < dsa.length) {
            setTraverse(traverse + 4);
        }
    }

    const prevDsa = () => {
        if (traverse - 4 >= 0) {
            setTraverse(traverse - 4);
        }
    }

    const visible = dsa.slice(traverse, traverse + 4);

    return (
        <div className="container">

            <div className='top'>
                <div style={{ width: "60%", justifyItems: "right" }}>
                    <h1>
                        Welcome Back 
                        <span style={{ color: "#3b82f6" }}> {user.UserName}</span>
                    </h1>
                </div>

                <div style={{ paddingLeft: "30%", paddingRight: "5%" }}>
                    <button
                        className="buttonLogout"
                        onClick={() => { logout(); navigate('/login'); }}
                    >
                        <FaSignOutAlt style={{ height: "100%", width: "100%" }} />
                    </button>
                </div>
            </div>

            <div className='middle'>

                <div className='dsa-previous'>
                    <h3>DSA Mock History</h3>

                    {dsa.length === 0 ? (
                        <p>No previous DSA mock records yet.</p>
                    ) : (
                        <div className="dsa-slider">

                            <button className ='dir-button' onClick={prevDsa}>⬅</button>

                            <div className="dsa-cards">
                                {visible.map((item) => (
                                    <DsaHistory
                                        key={item.id}
                                        id={item.id}
                                        testNo={item.testNo}
                                        date={item.date}
                                    />
                                ))}
                            </div>

                            <button className ='dir-button' onClick={nextDsa}>➡</button>

                        </div>
                    )}

                </div>

                <div className='dev-previous'>
                    <h3>Development Mock History</h3>
                    <p>No previous Dev mock records yet.</p>
                </div>

            </div>

            <div className='bottom'>

                <div className="button-group">

                    <button
                        className="button"
                        onClick={() => navigate('/dsa-mock')}
                    >
                        Start New DSA Mock
                    </button>

                    <button
                        className="button"
                        onClick={() => navigate('/dev-mock')}
                    >
                        Start New Dev Mock
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Dashboard