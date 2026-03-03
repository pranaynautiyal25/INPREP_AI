
import React, { useState, useRef } from 'react';
import './Dsa.css';
import { FaMicrophone, FaSyncAlt, FaArrowLeft, FaPlay, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dsa = () => {
    const navigate = useNavigate();



    const [text, setText] = useState("");
    const [listening, setListening] = useState(false);
    const [start, setStart] = useState(false)
    const recognitionRef = useRef(null);

    const handleMicClick = () => {
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
        setStart(true);
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
                        Write a function to find the longest increasing
                        subsequence in an array.ghvssassSasA
                        <br></br>SASADQWdssxsxsascsdadxasdxsadsa


                    </p>
                </div>

                <div className="dsa-code">
                    <textarea placeholder='Type Your Code Here'></textarea>
                </div>

            </div>

            {/* BOTTOM 10% */}
            <div className="dsa-bottom">

                <div className="audio-text">
                    {text || "Your speech will appear here..."}
                </div>

                <div className="dsa-button">
                    <button className="button">Submit and Evaluate</button>
                </div>

            </div>

        </div>
    )
}

export default Dsa
