
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


    const handleStart = async () => {
        //ai connection
        try {
            const res = await axios.post('/api/ai/generate-question');
            setQuestion(res.data.question);
            setConstraint(res.data.constraint);
            setStart(true);
        } catch (error) {
            alert('Failed to generate question. Please try again.');
        }
    }

    const handleEvaluation = async () => {
        if (!start) {
            alert('Start the test first');
            return;
        }

        setListening('false');
        setStart('false');

        const spokenApproach = text.trim();
        const questionText = question.trim();
        const codeText = code.trim();
        const constraintText = constraint.trim();

        if (!questionText || !constraintText || !spokenApproach || !codeText) {
            return alert('Incomplete process');
        }

        setSpeech(spokenApproach);

        try {
            // 1. Get AI evaluation
            const evalRes = await axios.post('/api/ai/evaluate', {
                question: questionText,
                constraint: constraintText,
                code: codeText,
                explanation: spokenApproach,
            });

            console.log(evalRes);

            const evaluation = evalRes.data; // contains all fields

            // 2. Save to database
            const payload = {
                email: user.UserEmail,
                question: questionText,
                constraint: constraintText,
                yourApproach: evaluation.yourApproach,
                betterApproach: evaluation.betterApproach,
                codeScore: evaluation.codeScore,
                explainationScore: evaluation.explanationScore, // note field name matching your schema
                codeReview: evaluation.codeReview,
                explainationReview: evaluation.explanationReview, // make sure it's spelled correctly
                improvementScope: evaluation.improvementScope,
            };

            await axios.post('/api/dsa/saveDsa', payload);
            alert('Saved successfully');
            navigate('/dashboard');
        } catch (error) {
            alert(error?.response?.data?.message || 'Evaluation failed');
        }




    }


    const handleBack = () => {
        if (start === true) {
            window.alert('Dsa Exam Ongoing');
            return;
        }

        navigate('/dashboard');
    }
    return (
        <div className='dsa-main'>

            {/* TOP 10% */}
            <div className="dsa-top" style={{ marginBottom: '8px', borderColor: "white", backgroundColor: 'black' }}>
                <div className="dsa-header">
                    <button className="back-button" onClick={handleBack}>
                        <FaArrowLeft />
                    </button>
                    <h1><span style={{ color: '#00c2fd', marginLeft: '20px', fontSize: '4vh' }}><b>DSA-PREP</b></span></h1>
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
                    <h3><span style={{ color: '#3742e1' }}><b>Question</b></span></h3>
                    <p>
                        {question || "Question will appear here"}


                    </p>
                    <h3><span style={{ color: '#3742e1' }}><b>Constraint</b></span></h3>
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
                    <button className="" onClick={handleEvaluation}>Submit and Evaluate</button>
                </div>

            </div>
        </div>
    )
}

export default Dsa