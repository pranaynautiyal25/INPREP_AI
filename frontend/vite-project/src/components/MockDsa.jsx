import React from 'react'
import './MockDsa.css'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const MockDsa = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const info = location.state.payload;

    return (

        <div className='dsa-main'>
            <div className='dsa-top'style={{marginBottom:'8px',borderColor:"white",backgroundColor:'black'}}>
                <div className='dsa-header'>
                    <h1><span style={{ color: '#37fd00' }}>MOCK INSIGHTS</span> : DSA</h1>
                </div>
                <button className="back-button" onClick={() => navigate('/dashboard')}>
                    <FaArrowLeft />
                </button>
            </div>

            <div className='mock-middle'>

                <p><b>
                    <span style={{ color: '#0400fd' }}>Question: </span>
                    {info.question}
                </b></p>

                <p><b>

                    <span style={{ color: '#0400fd' }}>Constraint:</span>
                    {info.constraint}

                </b></p>


            </div>
            <div className='mock-bottom'>
                <div className='eval'>
                    <h3 style={{ color: '#fdf900' }}> YOUR APPROACH</h3>
                    <p>
                        {info.yourApproach}
                    </p>

                    <h3 style={{ color: '#fdf900' }}> BETTER APPROACH</h3>
                    <p>
                        {info.betterApproach}
                    </p>
                </div>
                <div className='eval'>
                    <h3 style={{ color: '#fdf900' }}>CODE-SCORE : {info.codeScore} |EXPLAINATION & COMMUNICATION-SCORE: {info.explainationScore}</h3>
                    <p>on a scale of 10</p>

                    <h3 style={{ color: '#fdf900' }}>CODE-REVIEW : </h3>
                    {info.codeReview}
                    <h3 style={{ color: '#fdf900' }}>EXPLAINATION & COMMUNICATION-REVIEW : </h3>
                    {info.explainationReview
                        || 'Pending'}
                    <h3 style={{ color: '#fdf900' }}>IMPROVEMENT-SCOPE : </h3>
                    {info.improvementScope}
                </div>
            </div>
        </div>
    )
}

export default MockDsa
