import React, { useState, useRef } from 'react';
import { FaMicrophone, FaSyncAlt, FaArrowLeft, FaPlay, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios'
import { useAuth } from '../../Context/AuthContext';

const Database = () => {
    const navigate = useNavigate();

    const [text, setText] = useState("");
    const [listening, setListening] = useState(false);
    const [start, setStart] = useState(false);


    const [question1, setQuestion1] = useState('');
    const [question2, setQuestion2] = useState('');
    const [question3, setQuestion3] = useState('');
    const [question4, setQuestion4] = useState('');
    const [question5, setQuestion5] = useState('');

    const [answer, setAnswer] = useState('');
    const [speech, setSpeech] = useState('');
    const [ansEval, setAnsEval] = useState({});
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

    }

    const handleEvaluation = () => {

    }

    const handleBack = () => {
        if (start == true) {
            window.alert('Database Exam Ongoing');
            return;
        }

        navigate('/dev');
    }

    return (
        <div className='dsa-main'>


            <div className="dsa-top" style={{ marginBottom: '8px', borderColor: "white", backgroundColor: 'black' }}>
                <div className="dsa-header">
                    <button className="back-button" onClick={handleBack}>
                        <FaArrowLeft />
                    </button>
                    <h1><span style={{ color: '#00c2fd', marginLeft: '20px', fontSize: '4vh' }}><b>FULLSTACK-PREP</b></span></h1>
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


            <div className="dsa-middle">

                <div className="dsa-question">
                    <h3><span style={{ color: '#3742e1' }}><b>Question 1</b></span></h3>
                    <p>
                        {question1 || "Question will appear here"}
                    </p>
                    <h3><span style={{ color: '#3742e1' }}><b>Question 2</b></span></h3>
                    <p>
                        {question2 || "question will appear here"}
                    </p>

                    <h3><span style={{ color: '#3742e1' }}><b>Question 3</b></span></h3>
                    <p>
                        {question3 || "question will appear here"}
                    </p>

                    <h3><span style={{ color: '#3742e1' }}><b>Question 4</b></span></h3>
                    <p>
                        {question4 || "question will appear here"}
                    </p>

                    <h3><span style={{ color: '#3742e1' }}><b>Question 5</b></span></h3>
                    <p>
                        {question5 || "question will appear here"}
                    </p>


                </div>

                <div className="dsa-code">
                    <textarea
                        placeholder="WRITE YOUR ANSWERS HERE, FORMAT->(QUESTION 1 : ANSWER/CODE)"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>

                </div>

            </div>


            <div className="dsa-bottom">

                <div className="audio-text">
                    {text || "Your speech will appear here..."}
                </div>

                <div className="dsa-button">
                    <button className="" onClick={handleEvaluation}>Submit and Evaluate</button>
                </div>

            </div>
        </div>
    )
}

export default Database;
