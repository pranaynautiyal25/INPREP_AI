import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



const MockDev = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const info = location.state.payload;

    return (
        <div style={{ color: 'white' }}>
            <p>Exam Category: {info.category}</p>
            <br></br>
            <p>Your Answer: {info.yourAnswer}</p>
            <br></br>
            <p>Correct Answer : {info.correctAnswer}</p>
            <br></br>
            <p>Answer Score: {info.answerScore}</p>
            <br></br>
            <p>Explaination Score: {info.explainationScore}</p>
            <br></br>
            <p>Improvement Scope: {info.improvementScope}</p>

        </div>
    )
}

export default MockDev
