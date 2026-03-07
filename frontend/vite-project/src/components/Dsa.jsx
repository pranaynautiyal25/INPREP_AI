
import React, { useState, useRef } from 'react';
import './Dsa.css';
import { FaMicrophone, FaSyncAlt, FaArrowLeft, FaPlay, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { useAuth } from '../Context/AuthContext';

const Dsa = () => {

    const { user } = useAuth();
    const navigate = useNavigate();



    const [text, setText] = useState("");
    const [listening, setListening] = useState(false);
    const [start, setStart] = useState(false);


    const [question, setQuestion] = useState('');
    const [constraint, setConstraint] = useState('');
    const [code, setCode] = useState('');
    const [speech, setSpeech] = useState('');
    const [codeEval, setCodeEval] = useState({});
    const [comEval, setComEval] = useState({});


    const recognitionRef = useRef(null);

    const handleMicClick = () => {
        if (start === false) {
            window.alert('start the test first');
            return;
        }
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition not supported in this browser");
            return;
        }

        if (!listening) {
            // START LISTENING
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = "en-US";

            recognition.onresult = (event) => {
                let transcript = "";
                for (let i = 0; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                setText(transcript);
            };

            recognition.start();
            recognitionRef.current = recognition;
            setListening(true);

        } else {
            // STOP LISTENING
            recognitionRef.current.stop();
            setListening(false);
        }
    };


    const handleStart = () => {
        //ai connection
        const generatedQuestion = 'gasgd sjhbWEQWWGHGEV WWSJHSWA HJJHS k wqsjb jqws jhiswwkh sbwkjshqwkjhsqk hbkjhsqasb';
        const generatedConstraint = 'ddqihdbhqhikhj dkjdas '
        setQuestion(generatedQuestion);
        setConstraint(generatedConstraint);
        setStart(true);
    }

    const handleEvaluation = async () => {
        if (start === false) {
            window.alert('start the test first');
            return;
        }

        const spokenApproach = text.trim();
        const questionText = question.trim();
        const codeText = code.trim();
        const constraintText = constraint.trim();

        setSpeech(spokenApproach);

        if (!questionText || !constraintText || !spokenApproach || !codeText) {
            return window.alert('incomplete process');
        }

        //ai integration here 

        const emailId = user.UserEmail;

        try {
            const payload = {
                email: emailId,
                question: questionText,
                constraint: constraintText,
                yourApproach: spokenApproach,
                betterApproach: 'Pending AI evaluation',
                codeScore: 0,
                explainationScore: 'Pending',
                codeReview: 'Pending',
                improvementScope: 'Pending'
            };

            await axios.post('/api/dsa/saveDsa', payload);
            window.alert('Saved successfully');
            navigate('/dashboard');
        } catch (error) {
            window.alert(error?.response?.data?.message || 'Failed to save exam');
        }




    }

    return (
        <div className='dsa-main'>

            {/* TOP 10% */}
            <div className="dsa-top">
                <div className="dsa-header">
                    <button className="back-button" onClick={() => navigate('/dashboard')}>
                        <FaArrowLeft />
                    </button>
                    <h1><span style={{ color: '#37fd00' }}>DSA-PREP</span></h1>
                </div>

                <span style={{ color: '#3b82f6' }}>{listening ? "Listening..." : ""}</span>

                <div className="dsa-audio">
                    <button className="mic-button" onClick={handleMicClick}>
                        <FaMicrophone />
                    </button>
                    <button className='mic-button' onClick={() => setText("")}>
                        <FaSyncAlt />
                    </button>
                    <button className="mic-button" onClick={handleStart}>
                        {start ? <FaSpinner className="spin-icon" /> : <FaPlay />}
                    </button>
                </div>
            </div>

            {/* MIDDLE 80% */}
            <div className="dsa-middle">

                <div className="dsa-question">
                    <h3><span style={{ color: '#3742e1' }}>Question</span></h3>
                    <p>
                        {question || "Question will appear here"}


                    </p>
                    <h3><span style={{ color: '#3742e1' }}>Constraint</span></h3>
                    <p>
                        {constraint || "constraint will appear here"}
                    </p>
                </div>

                <div className="dsa-code">
                    <textarea
                        placeholder="Type Your Code Here"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    ></textarea>

                </div>

            </div>

            {/* BOTTOM 10% */}
            <div className="dsa-bottom">

                <div className="audio-text">
                    {text || "Your speech will appear here..."}
                </div>

                <div className="dsa-button">
                    <button className="button" onClick={handleEvaluation}>Submit and Evaluate</button>
                </div>

            </div>

            <div style={{ color: "white" }}>
                Testing <br></br>
                Question : {question} <br></br>
                Constraint: {constraint} <br></br>
                Code: {code} <br></br>
                Speech: {speech}<br></br>
            </div>
        </div>
    )
}

export default Dsa
