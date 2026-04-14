import React, { useState, useRef } from 'react';
import './FullStack.css';
import { FaMicrophone, FaSyncAlt, FaArrowLeft, FaPlay, FaSpinner, FaStop } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import { useAuth } from '../../Context/AuthContext';

const FullStack = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [start, setStart] = useState(false);

  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [question4, setQuestion4] = useState('');

  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [answer4, setAnswer4] = useState('');

  const [speech, setSpeech] = useState('');
  const [ansEval, setAnsEval] = useState({});
  const [comEval, setComEval] = useState({});

  const [isStarting, setIsStarting] = useState(false);      // lock for Start button
  const [isEvaluating, setIsEvaluating] = useState(false);  // lock for Evaluate button

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
    if (isStarting || start) return;  // block if already loading or already started
    setIsStarting(true);
    try {
      const res = await axios.post('/api/ai/generate-fullstack');
      setQuestion1(res.data.question1);
      setQuestion2(res.data.question2);
      setQuestion3(res.data.question3);
      setQuestion4(res.data.question4);
      setStart(true);
    } catch (error) {
      alert('Failed to generate question. Please try again.');
    } finally {
      setIsStarting(false);  // always release lock
    }
  };

  const handleEvaluation = async () => {
    if (isEvaluating) return;  // block if already in progress

    const finalAns1 = answer1.trim();
    const finalAns2 = answer2.trim();
    const finalAns3 = answer3.trim();
    const finalAns4 = answer4.trim();
    const spokenApproach = text.trim();

    if (!finalAns1 || !finalAns2 || !finalAns3 || !finalAns4 || !spokenApproach) {
      alert('Complete Your Test First');
      return;
    }

    setStart(false);
    setListening(false);
    setIsEvaluating(true);

    try {
      const questions = [question1, question2, question3, question4];
      const answers = [finalAns1, finalAns2, finalAns3, finalAns4];

      const res = await axios.post('/api/ai/evaluate-fullstack', { questions, answers, spokenApproach });
      const yourAnswer = res.data.yourAnswers;
      const correctAnswer = res.data.correctAnswers;
      const answerScore = res.data.answerScores;
      const explainationScore = res.data.explanationScore;
      const improvementScope = res.data.improvementScope;

      const payload = {
        email: user.UserEmail,
        category: "Full-Stack",
        question: questions,
        yourAnswer,
        correctAnswer,
        answerScore,
        explainationScore,
        improvementScope,
      };

      await axios.post('/api/fullstack/saveFullstack', payload);
      alert('Exam saved successfully');
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to save exam');
    } finally {
      setIsEvaluating(false);  // always release lock
    }
  };

  const handleBack = () => {
    if (start === true) {
      window.alert('FullStack Exam Ongoing');
      return;
    }
    navigate('/dev');
  };

  const questions = [
    { num: 1, text: question1 },
    { num: 2, text: question2 },
    { num: 3, text: question3 },
    { num: 4, text: question4 },
  ];

  const answers = [
    { num: 1, value: answer1, setter: setAnswer1 },
    { num: 2, value: answer2, setter: setAnswer2 },
    { num: 3, value: answer3, setter: setAnswer3 },
    { num: 4, value: answer4, setter: setAnswer4 },
  ];

  return (
    <div className="fe-page">

      {/* Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      <div className="fe-inner">

        {/* ── Top Bar ── */}
        <div className="fe-topbar">

          <div className="fe-topbar-left">
            <button className="fe-back-btn" onClick={handleBack}>
              <FaArrowLeft />
              <span>Back</span>
            </button>
            <div className="fe-title-wrap">
              <span className="fe-tag">FS</span>
              <h1 className="fe-title">FULLSTACK-PREP</h1>
            </div>
          </div>

          <div className="fe-topbar-center">
            {listening && (
              <div className="listening-badge">
                <span className="listening-dot"></span>
                Listening...
              </div>
            )}
          </div>

          <div className="fe-topbar-right">

            <button
              className={`fe-ctrl-btn fe-ctrl-btn--start ${start ? 'active' : ''}`}
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

            <button
              className={`fe-ctrl-btn fe-ctrl-btn--mic ${listening ? 'mic-active' : ''}`}
              onClick={handleMicClick}
              title={listening ? "Stop Mic" : "Start Mic"}
            >
              {listening ? <FaStop /> : <FaMicrophone />}
              <span>{listening ? "Stop" : "Mic"}</span>
            </button>

            <button
              className="fe-ctrl-btn fe-ctrl-btn--reset"
              onClick={() => setText("")}
              title="Clear Speech"
            >
              <FaSyncAlt />
              <span>Clear</span>
            </button>

          </div>
        </div>

        {/* ── Middle: Questions + Answers ── */}
        <div className="fe-workspace">

          <div className="fe-panel fe-panel--questions">
            <div className="fe-panel-header">
              <span className="fe-panel-icon">❓</span>
              <span className="fe-panel-label">Questions</span>
              {start && <span className="fe-live-badge">LIVE</span>}
            </div>
            <div className="fe-questions-list">
              {questions.map(({ num, text }) => (
                <div className="fe-question-item" key={num}>
                  <div className="fe-question-num">Q{num}</div>
                  <p className="fe-question-text">
                    {text || `Question ${num} will appear here once you start the test...`}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="fe-panel fe-panel--answers">
            <div className="fe-panel-header">
              <span className="fe-panel-icon">✍️</span>
              <span className="fe-panel-label">Your Answers</span>
            </div>
            <div className="fe-answers-wrap">
              {answers.map(({ num, value, setter }) => (
                <div className="fe-answer-block" key={num}>
                  <div className="fe-answer-label">Answer {num}</div>
                  <textarea
                    className="fe-textarea"
                    placeholder={`Write your answer for Question ${num} here...`}
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    spellCheck={false}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom: Speech + Submit ── */}
        <div className="fe-bottom">

          <div className="fe-speech-panel">
            <div className="fe-panel-header">
              <span className="fe-panel-icon">🎙️</span>
              <span className="fe-panel-label">Your Spoken Explanation</span>
            </div>
            <div className={`fe-speech-text ${text ? '' : 'placeholder'}`}>
              {text || "Your speech will appear here as you speak..."}
            </div>
          </div>

          <button
            className="fe-submit-btn"
            onClick={handleEvaluation}
            disabled={isEvaluating}
          >
            <span>{isEvaluating ? "Evaluating..." : "Submit & Evaluate"}</span>
            <span className="fe-submit-arrow">
              {isEvaluating ? <FaSpinner className="spin-icon" /> : "→"}
            </span>
          </button>

        </div>

      </div>
    </div>
  );
};

export default FullStack;