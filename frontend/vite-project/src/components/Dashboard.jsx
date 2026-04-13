import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext';
import './Dashboard.css'
import { FaSignOutAlt } from 'react-icons/fa';
import DsaHistory from '../components/DsaHistory';
import axios from '../config/axios.js'
import DevHistory from '../components/DevHistory.jsx'

const Dashboard = () => {

    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const [dsa, setDsa] = useState([]);
    const [dev, setDev] = useState([]);

    const [traverse1, setTraverse1] = useState(0);
    const [traverse2, setTraverse2] = useState(0);

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

    useEffect(() => {
        const fetchDev = async () => {
            const email = user.UserEmail;
            const res = await axios.post('/api/auth/historyDev', { email });
            const payload = Array.isArray(res.data?.payload) ? res.data.payload : [];
            const uniquePayload = payload.filter((item, index, arr) => {
                if (!item?._id) return true;
                return arr.findIndex((x) => x?._id === item._id) === index;
            });
            setDev(uniquePayload);
        };
        fetchDev();
    }, []);

    const nextDsa = () => { if (traverse1 + 4 < dsa.length) setTraverse1(traverse1 + 4); }
    const prevDsa = () => { if (traverse1 - 4 >= 0) setTraverse1(traverse1 - 4); }
    const nextDev = () => { if (traverse2 + 4 < dev.length) setTraverse2(traverse2 + 4); }
    const prevDev = () => { if (traverse2 - 4 >= 0) setTraverse2(traverse2 - 4); }

    const visibleDsa = (Array.isArray(dsa) ? dsa : [])
        .filter((item) => item && typeof item === 'object')
        .slice(traverse1, traverse1 + 4);

    const visibleDev = (Array.isArray(dev) ? dev : [])
        .filter((item) => item && typeof item === 'object')
        .slice(traverse2, traverse2 + 4);

    return (
        <div className="dashboard-page">

            {/* Blobs */}
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            <div className="dashboard-inner">

                {/* ── Top Bar ── */}
                <div className="dash-topbar">
                    <div className="dash-welcome">
                        <span className="dash-welcome-icon">🎯</span>
                        <div className="dash-welcome-text">
                            <span className="dash-greeting">Welcome Back</span>
                            <span className="dash-username">{user.UserName}</span>
                        </div>
                    </div>

                    <button
                        className="logout-btn"
                        onClick={() => { logout(); navigate('/login'); }}
                        title="Logout"
                    >
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                </div>

                {/* ── Main Grid ── */}
                <div className="dash-grid">

                    {/* ── Left: History Panels ── */}
                    <div className="dash-history">

                        {/* DSA History */}
                        <div className="history-panel">
                            <div className="panel-header">
                                <span className="panel-icon">🧠</span>
                                <h3 className="panel-title">DSA Mock History</h3>
                                <span className="panel-badge">{dsa.length} sessions</span>
                            </div>

                            {dsa.length === 0 ? (
                                <div className="empty-state">
                                    <span className="empty-icon">📭</span>
                                    <p>No previous DSA mock records yet.</p>
                                </div>
                            ) : (
                                <div className="slider-wrapper">
                                    <button
                                        className="dir-btn"
                                        onClick={prevDsa}
                                        disabled={traverse1 === 0}
                                    >⬅</button>

                                    <div className="cards-row">
                                        {visibleDsa.map((item, index) => (
                                            <DsaHistory
                                                key={`${item?._id || 'no-id'}-${traverse1 + index}`}
                                                id={item?._id}
                                                testNo={traverse1 + index + 1}
                                                date={item?.createdAt}
                                                payload={item}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        className="dir-btn"
                                        onClick={nextDsa}
                                        disabled={traverse1 + 4 >= dsa.length}
                                    >➡</button>
                                </div>
                            )}
                        </div>

                        {/* Dev History */}
                        <div className="history-panel">
                            <div className="panel-header">
                                <span className="panel-icon">💻</span>
                                <h3 className="panel-title">Development Mock History</h3>
                                <span className="panel-badge">{dev.length} sessions</span>
                            </div>

                            {dev.length === 0 ? (
                                <div className="empty-state">
                                    <span className="empty-icon">📭</span>
                                    <p>No previous Dev mock records yet.</p>
                                </div>
                            ) : (
                                <div className="slider-wrapper">
                                    <button
                                        className="dir-btn"
                                        onClick={prevDev}
                                        disabled={traverse2 === 0}
                                    >⬅</button>

                                    <div className="cards-row">
                                        {visibleDev.map((item, index) => (
                                            <DevHistory
                                                key={`${item._id}`}
                                                id={item._id}
                                                testNo={traverse2 + index + 1}
                                                date={item?.createdAt}
                                                payload={item}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        className="dir-btn"
                                        onClick={nextDev}
                                        disabled={traverse2 + 4 >= dev.length}
                                    >➡</button>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* ── Right: Action Panel ── */}
                    <div className="dash-actions">
                        <h3 className="actions-title">Start a Mock</h3>

                        <button className="action-btn btn-dsa" onClick={() => navigate('/dsa-mock')}>
                            <div className="action-btn-content">
                                <span className="action-emoji">🧠</span>
                                <div className="action-text">
                                    <span className="action-label">Practice algorithms</span>
                                    <span className="action-name">DSA Mock</span>
                                </div>
                            </div>
                            <span className="action-arrow">→</span>
                        </button>

                        <button className="action-btn btn-dev" onClick={() => navigate('/dev')}>
                            <div className="action-btn-content">
                                <span className="action-emoji">💻</span>
                                <div className="action-text">
                                    <span className="action-label">System & dev questions</span>
                                    <span className="action-name">Dev Mock</span>
                                </div>
                            </div>
                            <span className="action-arrow">→</span>
                        </button>

                        <div className="actions-footer">
                            <p>INPREP<span>AI</span></p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard