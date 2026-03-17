import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



const MockDev = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const info = location.state.payload;

    return (
        <div style={{ color: 'white' }}>
            {/* <p>Exam Category: {info.category}</p>
            <br></br>
            <p>Your Answer: {info.yourAnswer}</p>
            <br></br>
            <p>Correct Answer : {info.correctAnswer}</p>
            <br></br>
            <p>Answer Score: {info.answerScore}</p>
            <br></br>
            <p>Explaination Score: {info.explainationScore}</p>
            <br></br>
            <p>Improvement Scope: {info.improvementScope}</p> */}

            <div className='devHist-top'>
                <div>
                    <h1><b><span>{info.category}</span> HISTORY</b></h1>
                </div>
                <div>
                    <button>Back</button>
                </div>
            </div>

            <div className='devHist-middle'>
                <div>
                    {info.question}
                </div>
                <div className='devHist-left'>
                    {info.yourAnswer}
                </div>
                <div className='devHist-right'>
                    {info.correctAnswer}
                </div>
            </div>

            <div className='devHist-bottom'>
                <div>
                    <div>
                        {info.answerScore}
                    </div>
                    <div>
                        {info.explainationScore}
                    </div>
                </div>
                <div>
                    <div>
                         {info.improvementScope}
                    </div>
                </div>

            </div>


        </div>
    )
}

export default MockDev
