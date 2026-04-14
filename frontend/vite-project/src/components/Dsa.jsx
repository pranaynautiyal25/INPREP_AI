import React, { useState, useRef } from 'react';
import './Dsa.css';
import { FaMicrophone, FaSyncAlt, FaArrowLeft, FaPlay, FaSpinner, FaStop } from 'react-icons/fa';
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

    const [isStarting, setIsStarting] = useState(false);       // lock for Start button
    const [isEvaluating, setIsEvaluating] = useState(false);   // lock for Evaluate button

    const recognitionRef = useRef(null);

    const handleMicClick = () => {
        if (start === false) {
            window.alert('Start the test first');
            return;
        }
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition not supported in this browser");
            return;
        }

        if (!listening) {
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
            recognitionRef.current.stop();
            setListening(false);
        }
    };

    const handleStart = async () => {
        if (isStarting) return;   // block if already in progress
        setIsStarting(true);
        try {
            const res = await axios.post('/api/ai/generate-question');
            setQuestion(res.data.question);
            setConstraint(res.data.constraint);
            setStart(true);
        } catch (error) {
            alert('Failed to generate question. Please try again.');
        } finally {
            setIsStarting(false);  // always release lock
        }
    }

    const handleEvaluation = async () => {
        if (isEvaluating) return;  // block if already in progress
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
        setIsEvaluating(true);

        try {
            const evalRes = await axios.post('/api/ai/evaluate', {
                question: questionText,
                constraint: constraintText,
                code: codeText,
                explanation: spokenApproach,
            });

            const evaluation = evalRes.data;

            const payload = {
                email: user.UserEmail,
                question: questionText,
                constraint: constraintText,
                yourApproach: evaluation.yourApproach,
                betterApproach: evaluation.betterApproach,
                codeScore: evaluation.codeScore,
                explainationScore: evaluation.explanationScore,
                codeReview: evaluation.codeReview,
                explainationReview: evaluation.explanationReview,
                improvementScope: evaluation.improvementScope,
            };

            await axios.post('/api/dsa/saveDsa', payload);
            alert('Saved successfully');
            navigate('/dashboard');
        } catch (error) {
            alert(error?.response?.data?.message || 'Evaluation failed');
        } finally {
            setIsEvaluating(false);  // always release lock
        }
    }

    const handleBack = () => {
        if (start === true) {
            window.alert('DSA Exam Ongoing');
            return;
        }
        navigate('/dashboard');
    }

    return (
        <div className="dsa-page">

            {/* Blobs */}
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            <div className="dsa-inner">

                {/* ── Top Bar ── */}
                <div className="dsa-topbar">

                    <div className="dsa-topbar-left">
                        <button className="dsa-back-btn" onClick={handleBack}>
                            <FaArrowLeft />
                            <span>Dashboard</span>
                        </button>
                        <div className="dsa-title-wrap">
                            <span className="dsa-tag">DSA</span>
                            <h1 className="dsa-title">DSA-PREP</h1>
                        </div>
                    </div>

                    <div className="dsa-topbar-center">
                        {listening && (
                            <div className="listening-badge">
                                <span className="listening-dot"></span>
                                Listening...
                            </div>
                        )}
                    </div>

                    <div className="dsa-topbar-right">

                        {/* Start / Generating button */}
                        <button
                            className={`dsa-ctrl-btn dsa-ctrl-btn--start ${start ? 'active' : ''}`}
                            onClick={handleStart}
                            disabled={isStarting || start}
                            title={isStarting ? "Generating..." : start ? "Test Running" : "Start Test"}
                        >
                            {isStarting
                                ? <FaSpinner className="spin-icon" />
                                : start
                                    ? <FaSpinner className="spin-icon" />
                                    : <FaPlay />
                            }
                            <span>{isStarting ? "Loading..." : start ? "Running" : "Start"}</span>
                        </button>

                        {/* Mic button */}
                        <button
                            className={`dsa-ctrl-btn dsa-ctrl-btn--mic ${listening ? 'mic-active' : ''}`}
                            onClick={handleMicClick}
                            title={listening ? "Stop Mic" : "Start Mic"}
                        >
                            {listening ? <FaStop /> : <FaMicrophone />}
                            <span>{listening ? "Stop" : "Mic"}</span>
                        </button>

                        {/* Reset speech */}
                        <button
                            className="dsa-ctrl-btn dsa-ctrl-btn--reset"
                            onClick={() => setText("")}
                            title="Clear Speech"
                        >
                            <FaSyncAlt />
                            <span>Clear</span>
                        </button>

                    </div>
                </div>

                {/* ── Middle: Question + Code Editor ── */}
                <div className="dsa-workspace">

                    {/* Question Panel */}
                    <div className="dsa-panel dsa-panel--question">
                        <div className="dsa-panel-header">
                            <span className="dsa-panel-icon">❓</span>
                            <span className="dsa-panel-label">Question</span>
                            {start && <span className="dsa-live-badge">LIVE</span>}
                        </div>
                        <p className="dsa-panel-body">
                            {question || "Question will appear here once you start the test..."}
                        </p>

                        <div className="dsa-panel-divider"></div>

                        <div className="dsa-panel-header">
                            <span className="dsa-panel-icon">⚠️</span>
                            <span className="dsa-panel-label">Constraint</span>
                        </div>
                        <p className="dsa-panel-body">
                            {constraint || "Constraint will appear here..."}
                        </p>
                    </div>

                    {/* Code Editor Panel */}
                    <div className="dsa-panel dsa-panel--code">
                        <div className="dsa-panel-header">
                            <span className="dsa-panel-icon">💻</span>
                            <span className="dsa-panel-label">Code Editor</span>
                        </div>
                        <div className="dsa-editor-wrap">
                            <div className="dsa-editor-dots">
                                <span></span><span></span><span></span>
                            </div>
                            <textarea
                                className="dsa-textarea"
                                placeholder="// Type your code here..."
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                spellCheck={false}
                            />
                        </div>
                    </div>

                </div>

                {/* ── Bottom: Speech + Submit ── */}
                <div className="dsa-bottom">

                    <div className="dsa-speech-panel">
                        <div className="dsa-panel-header">
                            <span className="dsa-panel-icon">🎙️</span>
                            <span className="dsa-panel-label">Your Spoken Explanation</span>
                        </div>
                        <div className={`dsa-speech-text ${text ? '' : 'placeholder'}`}>
                            {text || "Your speech will appear here as you speak..."}
                        </div>
                    </div>

                    <button
                        className="dsa-submit-btn"
                        onClick={handleEvaluation}
                        disabled={isEvaluating}
                    >
                        <span>{isEvaluating ? "Evaluating..." : "Submit & Evaluate"}</span>
                        <span className="dsa-submit-arrow">{isEvaluating ? <FaSpinner className="spin-icon" /> : "→"}</span>
                    </button>

                </div>

            </div>
        </div>
    )
}

export default Dsa;