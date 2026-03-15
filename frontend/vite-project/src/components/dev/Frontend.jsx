import React, { useState, useRef } from 'react';
import { FaMicrophone, FaSyncAlt, FaArrowLeft, FaPlay, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios'
import { useAuth } from '../../Context/AuthContext';

const Frontend = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [start, setStart] = useState(false);


  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [question4, setQuestion4] = useState('');
  //const [question5, setQuestion5] = useState('');


  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [answer4, setAnswer4] = useState('');
  // const [answer5, setAnswer5] = useState('');

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

  const handleStart = async () => {
    if (start === true) {
      return;
    }


    //ai connection
    try {
      const res = await axios.post('/api/ai/generate-frontend');
      setQuestion1(res.data.question1);
      setQuestion2(res.data.question2);
      setQuestion3(res.data.question3);
      setQuestion4(res.data.question4);
      setStart(true);
    }
    catch (error) {
      alert('failed to generate question');
    }
  }

  const handleEvaluation = async () => {

    const finalAns1 = answer1.trim();
    const finalAns2 = answer2.trim();
    const finalAns3 = answer3.trim();
    const finalAns4 = answer4.trim();

    const spokenApproach = text.trim();

    if (finalAns1 == '' || finalAns2 == '' || finalAns3 == '' || finalAns4 == '' || spokenApproach == '') {
      alert('Complete Your Test First');
      return;
    }

    setStart(false);
    setListening(false);

    //ai connection

    try {
      const questions = [question1, question2, question3, question4];
      const answers = [finalAns1, finalAns2, finalAns3, finalAns4];

      const res = await axios.post('/api/ai/evaluate-frontend', { questions, answers, spokenApproach });
      const yourAnswer = res.data.yourAnswers;
      const correctAnswer = res.data.correctAnswers;
      const answerScore = res.data.answerScores;
      const explainationScore = res.data.explanationScore;
      const improvementScope = res.data.improvementScope;

      const payload = {
        email: user.UserEmail,
        category: "frontend",
        question: questions,
        yourAnswer: yourAnswer,
        correctAnswer: correctAnswer,
        answerScore: answerScore,
        explainationScore: explainationScore,
        improvementScope: improvementScope
      }

      await axios.post('/api/frontend/saveFrontend', payload);
      alert('exam saved successfully', res);
    }
    catch (error) {
      alert('failed to save exam');
    }


    navigate('/dashboard');
  }

  const handleBack = () => {
    if (start == true) {
      window.alert('Frontend Exam Ongoing');
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
          <h1><span style={{ color: '#00c2fd', marginLeft: '20px', fontSize: '4vh' }}><b>FRONTEND-PREP</b></span></h1>
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

          


        </div>

        <div className="dsa-code">
          <textarea
            placeholder="WRITE YOUR ANSWERS HERE, FORMAT->(QUESTION 1 : ANSWER/CODE)"
            value={answer1}
            onChange={(e) => setAnswer1(e.target.value)}
          ></textarea>

          <textarea
            placeholder="WRITE YOUR ANSWERS HERE, FORMAT->(QUESTION 2 : ANSWER/CODE)"
            value={answer2}
            onChange={(e) => setAnswer2(e.target.value)}
          ></textarea>

          <textarea
            placeholder="WRITE YOUR ANSWERS HERE, FORMAT->(QUESTION 3 : ANSWER/CODE)"
            value={answer3}
            onChange={(e) => setAnswer3(e.target.value)}
          ></textarea>

          <textarea
            placeholder="WRITE YOUR ANSWERS HERE, FORMAT->(QUESTION 4 : ANSWER/CODE)"
            value={answer4}
            onChange={(e) => setAnswer4(e.target.value)}
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

export default Frontend;
