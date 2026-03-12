import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext';
import './Dashboard.css'
import { FaSignOutAlt } from 'react-icons/fa';
import DsaHistory from '../components/DsaHistory';
import axios from '../config/axios.js'

const Dashboard = () => {

    const navigate = useNavigate();
    const { user, logout } = useAuth();


    const [dsa, setDsa] = useState([]);
    const [traverse, setTraverse] = useState(0);

    useEffect(() => {
        const fetchDsa = async () => {
            const email = user.UserEmail;
            const res = await axios.post('/api/auth/historyDsa', { email });
            const payload = Array.isArray(res.data?.payload) ? res.data.payload : [];

            const uniquePayload = payload.filter((item, index, arr) => {
                if (!item?._id) return true;
                return arr.findIndex((x) => x?._id === item._id) === index;
            });

            setDsa(uniquePayload);
        };

        fetchDsa();
    }, []);


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

    const visible = (Array.isArray(dsa) ? dsa : [])
        .filter((item) => item && typeof item === 'object')
        .slice(traverse, traverse + 4);

    return (
        <div className="container">

            <div className='top'>
                <div style={{ width: "100%", justifyItems: "center" }}>
                    <h1 style={{ fontSize: "50px" }}>
                        Welcome Back
                        <span style={{ color: "#3b82f6" }}> {user.UserName}</span>
                    </h1>
                </div>


            </div>

            <div className="middle">
                <div className='middle1'>

                    <div className='dsa-previous'>
                        <h3>  <b>DSA Mock History</b></h3>

                        {dsa.length === 0 ? (
                            <p>No previous DSA mock records yet.</p>
                        ) : (
                            <div className="dsa-slider">

                                <button className='dir-button' onClick={prevDsa}>⬅</button>

                                <div className="dsa-cards">
                                    {visible.map((item, index) => (
                                        <DsaHistory
                                            key={`${item?._id || 'no-id'}-${traverse + index}`}
                                            id={item?._id}
                                            testNo={traverse + index + 1}
                                            date={item?.createdAt}
                                            payload={item}
                                        />
                                    ))}
                                </div>

                                <button className='dir-button' onClick={nextDsa}>➡</button>

                            </div>
                        )}

                    </div>






                    <div className='dev-previous'>
                        <h3><b>Development Mock History</b></h3>
                        <p>No previous Dev mock records yet.</p>
                    </div>

                </div>


                <div className='middle2'>


                    <div>
                        <button
                            className="button"
                            onClick={() => navigate('/dsa-mock')}
                        >
                            Start New DSA Mock
                        </button>
                    </div>
                    <div style={{ marginTop: "8%" }}>
                        <button
                            className="button"
                            onClick={() => navigate('/dev')}
                        >
                            Start New Dev Mock
                        </button>

                    </div>

                    <div style={{
                        paddingLeft: "30%", paddingRight: "5%",
                        backgroundColor: 'black', display: 'flex', marginTop: '16px',
                        borderRadius: '40px', height: '50px', padding: '10px', width: '27vh'
                    }}>
                        <button
                            className="buttonLogout"
                            onClick={() => { logout(); navigate('/login'); }}
                        >
                            <FaSignOutAlt style={{ height: "100%", width: "100%" }} />
                        </button>

                    </div>


                </div>
            </div>

            {/* <div className='bottom'>

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

            </div> */}

        </div>
    )
}

export default Dashboard
