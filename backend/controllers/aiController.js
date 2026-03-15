const { groqQuestion, groqEval, MODEL_NAME } = require('../config/ai');

// Helper to clean AI response (still needed if Groq returns markdown fences)
function extractJSON(text) {
    // Try to find JSON block in markdown
    const jsonMatch = text.match(/```(?:json)?\n([\s\S]*?)\n```/);
    if (jsonMatch) return jsonMatch[1];

    // If no markdown, try to find a JSON object directly
    const objectMatch = text.match(/\{[\s\S]*\}/);
    if (objectMatch) return objectMatch[0];

    // Otherwise return the whole text (might be plain JSON)
    return text;
}

// Generate a DSA question
const generateQuestion = async (req, res) => {
    try {
        const messages = [
            {
                role: 'system',
                content: `You are an expert DSA question generator. Create medium-level coding problems. Return valid JSON.`
            },
            {
                role: 'user',
                content: `You are a senior software engineer preparing a coding interview question for a candidate.

Generate ONE medium-difficulty Data Structures and Algorithms problem similar in quality and style to a LeetCode Medium question.

The problem must belong to ONE of these topics:
- Arrays
- Strings
- Linked Lists
- Trees / Binary Trees
- Graphs
- Dynamic Programming
- Stacks / Queues

Requirements for the problem:
1. The problem statement must be clear, detailed, and self-contained.
2. It must describe the input, expected output, and the task the user must implement.
3. Include the expected function signature (language-agnostic or C++ style if needed).
4. Include at least one clear example with input and output.
5. Mention important edge cases the user should consider.
6. The problem should require algorithmic thinking (not trivial implementation).
7. The problem should be solvable in approximately 20–40 minutes in an interview.
8. Avoid well-known problems like Two Sum, Reverse Linked List, etc.

Return ONLY a valid JSON object with EXACTLY the following fields and nothing else:

{
  "question": "Full problem statement including description, function signature, explanation, and at least one example with input and output.",
  "constraint": "All input constraints, limits, edge cases, and expected time and space complexity."
}

Formatting Rules:
- The output MUST be valid JSON.
- Do NOT include markdown, comments, or explanations outside the JSON.
- Escape quotation marks properly.
- Keep the question concise but detailed enough for implementation.
- Ensure the problem is unique and interview-relevant.`
            }
        ];

        const completion = await groqQuestion.chat.completions.create({
            model: MODEL_NAME,
            messages: messages,
            temperature: 0.7,
            max_tokens: 3000,
        });

        const responseText = completion.choices[0].message.content;
        console.log('Raw response from model:', responseText); // <-- ADD THIS

        const cleaned = extractJSON(responseText);
        const parsed = JSON.parse(cleaned);
        res.json(parsed);
    } catch (error) {
        console.error('Groq Question Gen Error:', error);
        res.status(500).json({ error: 'Failed to generate question' });
    }
};

// Evaluate user submission
const evaluateSubmission = async (req, res) => {
    try {
        const { question, constraint, code, explanation } = req.body;

        const messages = [
            {
                role: 'system',
                content: `You are a senior code reviewer with 7+ years experience. Evaluate code and explanations. Return JSON.`
            },
            {
                role: 'user',
                content: `You are a senior software engineer and technical interviewer with 10+ years of experience conducting coding interviews at top tech companies.

Your task is to evaluate a candidate’s solution to a Data Structures and Algorithms problem based on:
1. The problem statement
2. The constraints
3. The candidate’s code
4. The candidate’s spoken explanation (transcribed to text)

Be objective and analytical. Focus on correctness, algorithm choice, efficiency, edge cases, and clarity of explanation.

-----------------------
PROBLEM
-----------------------
Question:
${question}

Constraints:
${constraint}

-----------------------
CANDIDATE SUBMISSION
-----------------------
Code:
${code}

Explanation (speech transcript):
${explanation}

-----------------------
EVALUATION INSTRUCTIONS
-----------------------

Analyze the solution carefully and evaluate:

1. Algorithm & Approach
2. Correctness
3. Edge Cases
4. Time & Space Complexity
5. Code Quality
6. Communication / Explanation

-----------------------
OUTPUT FORMAT
-----------------------

Return ONLY a valid JSON object with the EXACT structure below:

{
  "yourApproach": "2-3 sentence summary of the candidate's approach. Mention the algorithm or data structures used.",
  "betterApproach": "2-3 sentences describing a better or more optimal approach if applicable. If the candidate’s approach is already optimal, explain why and briefly mention alternatives.",
  "codeScore": 0.0,
  "explanationScore": 0.0,
  "codeReview": "- Point 1\\n- Point 2\\n- Point 3\\n- Point 4",
  "explanationReview": "- Point 1\\n- Point 2\\n- Point 3\\n- Point 4",
  "improvementScope": "A short paragraph summarizing the top 2-3 areas the candidate should improve in future interviews."
}

-----------------------
SCORING RULES
-----------------------

codeScore (0-10):
10  = Correct, optimal solution, excellent code quality.
8-9 = Correct and efficient with minor improvements possible.
6-7 = Works but has noticeable issues (edge cases, style, or efficiency).
4-5 = Partially correct or inefficient.
0-3 = Incorrect or fundamentally flawed.

explanationScore (0-10):
10  = Extremely clear explanation with algorithm reasoning, complexity, and edge cases discussed.
8-9 = Good explanation with minor missing details.
6-7 = Understandable but incomplete.
4-5 = Poor structure or unclear reasoning.
0-3 = Very unclear or mostly incorrect explanation.

-----------------------
IMPORTANT RULES
-----------------------

- Output MUST be valid JSON.
- codeReview and explanationReview MUST be single strings (NOT arrays).
- Use bullet points separated by "\\n".
- Do NOT include markdown formatting.
- Do NOT include any text outside the JSON object.
- Scores must be decimals between 0 and 10 (e.g., 7.5).`
            }
        ];

        const completion = await groqEval.chat.completions.create({
            model: MODEL_NAME,
            messages: messages,
            temperature: 0.3, // lower temperature for more consistent evaluation
            max_tokens: 3000,
        });

        const responseText = completion.choices[0].message.content;
        const cleaned = extractJSON(responseText);
        const parsed = JSON.parse(cleaned);

        res.json(parsed);
    } catch (error) {
        console.error('Groq Evaluation Error:', error);
        res.status(500).json({ error: 'Evaluation failed' });
    }
};


const generateFrontendQuestion = async (req, res) => {
    try {
        const messages = [
            {
                role: 'system',
                content: `You are an expert frontend developer and interviewer. Generate high-quality frontend interview questions covering HTML, CSS, JavaScript, React, and MERN stack concepts. Return valid JSON.`
            },
            {
                role: 'user',
                content: `Generate 4 frontend interview questions of varying difficulty for a MERN stack frontend position. The questions should cover:
- 2 theory questions (concepts, best practices, etc.)
- 1 intermediate implementation question (e.g., write a function to perform a task, manipulate data, etc.)
- 1 larger coding question (e.g., build a small React component, implement a feature, handle state, etc.)

Ensure questions are clear, self-contained, and appropriate for a frontend interview. They should test understanding of HTML, CSS, JavaScript (ES6+), React (hooks, state, props), and possibly other frontend aspects.

Return ONLY a valid JSON object with EXACTLY four keys: "question1", "question2", "question3", "question4". Each value should be the full question text.

Formatting Rules:
- Output MUST be valid JSON.
- Do NOT include markdown, comments, or explanations outside the JSON.
- Escape quotation marks properly.
- Keep each question concise but detailed enough for the candidate to understand what is asked.
- Ensure questions are original and interview-relevant.`
            }
        ];

        const completion = await groqQuestion.chat.completions.create({
            model: MODEL_NAME,
            messages: messages,
            temperature: 0.7,
            max_tokens: 2000,
        });

        const responseText = completion.choices[0].message.content;
        const cleaned = extractJSON(responseText);
        const parsed = JSON.parse(cleaned);
        res.json(parsed);
    } catch (error) {
        console.error('Groq Frontend Question Gen Error:', error);
        res.status(500).json({ error: 'Failed to generate frontend questions' });
    }
};


// Updated evaluateFrontend – no explanation used
const evaluateFrontend = async (req, res) => {
    try {
        const { questions, answers, explaination } = req.body; // explaination is overall user communication
        const questionMarks = [1, 1, 3, 5]; // fixed as per your spec

        // Accumulators
        let yourAnswers = [];
        let correctAnswers = [];
        let answerScores = [];

        // Process each question individually
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const answer = answers[i];
            const maxMarks = questionMarks[i];

            const messages = [
                {
                    role: 'system',
                    content: `You are a senior frontend developer and interviewer with 7+ years experience. Evaluate a candidate's answer to a frontend interview question. Return JSON.`
                },
                {
                    role: 'user',
                    content: `You are a senior frontend engineer conducting a technical interview.

Your task is to evaluate a candidate’s answer to a frontend question. The answer may include code, explanation, or both.

Be objective and analytical. Focus on correctness, completeness, clarity, and relevance to the question.

-----------------------
QUESTION
-----------------------
${question}

-----------------------
CANDIDATE'S ANSWER
-----------------------
${answer}

-----------------------
EVALUATION INSTRUCTIONS
-----------------------

Provide a concise evaluation with:
1. A summary of the candidate's answer (what they wrote/said) in no more than 5 lines.
2. The expected or correct answer (key points, correct code, etc.) in no more than 5 lines.
3. A score out of ${maxMarks} based on the quality of the answer.

-----------------------
OUTPUT FORMAT
-----------------------

Return ONLY a valid JSON object with the EXACT structure below:

{
  "yourAnswer": "Brief summary of candidate's answer (max 5 lines)",
  "correctAnswer": "Concise correct answer (max 5 lines)",
  "answerScore": 0.0
}

-----------------------
SCORING GUIDELINES
-----------------------

- Score should be a decimal between 0 and ${maxMarks}.
- ${maxMarks} = perfect answer, fully correct and well-explained.
- Half marks for partially correct or missing details.
- 0 for completely wrong or irrelevant.

-----------------------
IMPORTANT RULES
-----------------------

- Output MUST be valid JSON.
- yourAnswer and correctAnswer MUST be single strings (not arrays).
- Keep each summary concise (max 5 lines).
- Do NOT include markdown formatting.
- Do NOT include any text outside the JSON object.`
                }
            ];

            const completion = await groqEval.chat.completions.create({
                model: MODEL_NAME,
                messages: messages,
                temperature: 0.3,
                max_tokens: 1000,
            });

            const responseText = completion.choices[0].message.content;
            const cleaned = extractJSON(responseText);
            const parsed = JSON.parse(cleaned);

            yourAnswers.push(parsed.yourAnswer);
            correctAnswers.push(parsed.correctAnswer);
            answerScores.push(parsed.answerScore);
        }

        // ---- NEW: Final overall evaluation using all answers and the user's explanation ----
        // Build a summary of all questions and scores to feed into the final prompt
        const answersSummary = yourAnswers.map((ans, i) =>
            `Q${i + 1}:\nYour answer: ${ans}\nCorrect answer: ${correctAnswers[i]}\nScore: ${answerScores[i]}/${questionMarks[i]}`
        ).join('\n\n');

        const finalMessages = [
            {
                role: 'system',
                content: `You are a senior technical interviewer. Based on a candidate's performance across multiple frontend questions and their overall explanation, provide a final evaluation.`
            },
            {
                role: 'user',
                content: `The candidate answered several frontend questions and also provided an overall explanation of their approach and communication.

Below are the details for each question:

${answersSummary}

Overall explanation provided by the candidate:
${explaination}

Based on this data, provide a final evaluation in the following JSON format:

{
  "explanationScore": 0.0,  // decimal 0-10, overall quality of explanations and communication across all answers
  "improvementScope": "A paragraph up to 10 lines summarizing the candidate's key weaknesses and specific areas for improvement in both technical knowledge and communication."
}

Rules:
- explanationScore should reflect clarity, coherence, depth, and communication effectiveness across all answers and the overall explanation.
- improvementScope should be constructive, specific, and actionable (max 10 lines).
- Return ONLY valid JSON.`
            }
        ];

        const finalCompletion = await groqEval.chat.completions.create({
            model: MODEL_NAME,
            messages: finalMessages,
            temperature: 0.3,
            max_tokens: 1500,
            response_format: { type: "json_object" } // ensure JSON output
        });

        const finalResponseText = finalCompletion.choices[0].message.content;
        const finalParsed = JSON.parse(extractJSON(finalResponseText));

        // Return the compiled results along with the final evaluation
        res.json({
            yourAnswers,
            correctAnswers,
            answerScores,
            explanationScore: finalParsed.explanationScore,
            improvementScope: finalParsed.improvementScope
        });

    } catch (error) {
        console.error('Groq Frontend Evaluation Error:', error);
        res.status(500).json({ error: 'Frontend evaluation failed' });
    }
};



const generateBackendQuestion = async (req, res) => {
    try {
        const messages = [
            {
                role: 'system',
                content: `You are an expert backend developer and interviewer. Generate high-quality backend interview questions covering Node.js, Express, databases (MongoDB, SQL), REST APIs, authentication, and MERN stack backend concepts. Return valid JSON.`
            },
            {
                role: 'user',
                content: `Generate 4 backend interview questions of varying difficulty for a MERN stack backend position. The questions should cover:
- 2 theory questions (concepts, best practices, architecture, etc.)
- 1 intermediate implementation question (e.g., write a function to perform a database query, implement authentication middleware, handle file uploads, etc.)
- 1 larger coding question (e.g., build a complete REST API endpoint with error handling, database integration, and validation)

Ensure questions are clear, self-contained, and appropriate for a backend interview. They should test understanding of Node.js (ES6+), Express, MongoDB (Mongoose), RESTful design, authentication (JWT, OAuth), and possibly other backend aspects like security, performance, and testing.

Return ONLY a valid JSON object with EXACTLY four keys: "question1", "question2", "question3", "question4". Each value should be the full question text.

Formatting Rules:
- Output MUST be valid JSON.
- Do NOT include markdown, comments, or explanations outside the JSON.
- Escape quotation marks properly.
- Keep each question concise but detailed enough for the candidate to understand what is asked.
- Ensure questions are original and interview-relevant.`
            }
        ];

        const completion = await groqQuestion.chat.completions.create({
            model: MODEL_NAME,
            messages: messages,
            temperature: 0.7,
            max_tokens: 2000,
        });

        const responseText = completion.choices[0].message.content;
        const cleaned = extractJSON(responseText);
        const parsed = JSON.parse(cleaned);
        res.json(parsed);
    } catch (error) {
        console.error('Groq Backend Question Gen Error:', error);
        res.status(500).json({ error: 'Failed to generate backend questions' });
    }
};

const evaluateBackend = async (req, res) => {
    try {
        const { questions, answers, explaination } = req.body; // overall user communication
        const questionMarks = [1, 1, 3, 5]; // fixed as per spec

        let yourAnswers = [];
        let correctAnswers = [];
        let answerScores = [];

        // Process each question individually
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const answer = answers[i];
            const maxMarks = questionMarks[i];

            const messages = [
                {
                    role: 'system',
                    content: `You are a senior backend developer and interviewer with 7+ years experience. Evaluate a candidate's answer to a backend interview question. Return JSON.`
                },
                {
                    role: 'user',
                    content: `You are a senior backend engineer conducting a technical interview.

Your task is to evaluate a candidate’s answer to a backend question. The answer may include code, explanation, or both.

Be objective and analytical. Focus on correctness, completeness, clarity, and relevance to the question.

-----------------------
QUESTION
-----------------------
${question}

-----------------------
CANDIDATE'S ANSWER
-----------------------
${answer}

-----------------------
EVALUATION INSTRUCTIONS
-----------------------

Provide a concise evaluation with:
1. A summary of the candidate's answer (what they wrote/said) in no more than 5 lines.
2. The expected or correct answer (key points, correct code, etc.) in no more than 5 lines.
3. A score out of ${maxMarks} based on the quality of the answer.

-----------------------
OUTPUT FORMAT
-----------------------

Return ONLY a valid JSON object with the EXACT structure below:

{
  "yourAnswer": "Brief summary of candidate's answer (max 5 lines)",
  "correctAnswer": "Concise correct answer (max 5 lines)",
  "answerScore": 0.0
}

-----------------------
SCORING GUIDELINES
-----------------------

- Score should be a decimal between 0 and ${maxMarks}.
- ${maxMarks} = perfect answer, fully correct and well-explained.
- Half marks for partially correct or missing details.
- 0 for completely wrong or irrelevant.

-----------------------
IMPORTANT RULES
-----------------------

- Output MUST be valid JSON.
- yourAnswer and correctAnswer MUST be single strings (not arrays).
- Keep each summary concise (max 5 lines).
- Do NOT include markdown formatting.
- Do NOT include any text outside the JSON object.`
                }
            ];

            const completion = await groqEval.chat.completions.create({
                model: MODEL_NAME,
                messages: messages,
                temperature: 0.3,
                max_tokens: 1000,
            });

            const responseText = completion.choices[0].message.content;
            const cleaned = extractJSON(responseText);
            const parsed = JSON.parse(cleaned);

            yourAnswers.push(parsed.yourAnswer);
            correctAnswers.push(parsed.correctAnswer);
            answerScores.push(parsed.answerScore);
        }

        // Build summary for final evaluation
        const answersSummary = yourAnswers.map((ans, i) =>
            `Q${i + 1}:\nYour answer: ${ans}\nCorrect answer: ${correctAnswers[i]}\nScore: ${answerScores[i]}/${questionMarks[i]}`
        ).join('\n\n');

        const finalMessages = [
            {
                role: 'system',
                content: `You are a senior technical interviewer. Based on a candidate's performance across multiple backend questions and their overall explanation, provide a final evaluation.`
            },
            {
                role: 'user',
                content: `The candidate answered several backend questions and also provided an overall explanation of their approach and communication.

Below are the details for each question:

${answersSummary}

Overall explanation provided by the candidate:
${explaination}

Based on this data, provide a final evaluation in the following JSON format:

{
  "explanationScore": 0.0,  // decimal 0-10, overall quality of explanations and communication across all answers
  "improvementScope": "A paragraph up to 10 lines summarizing the candidate's key weaknesses and specific areas for improvement in both technical knowledge and communication."
}

Rules:
- explanationScore should reflect clarity, coherence, depth, and communication effectiveness across all answers and the overall explanation.
- improvementScope should be constructive, specific, and actionable (max 10 lines).
- Return ONLY valid JSON.`
            }
        ];

        const finalCompletion = await groqEval.chat.completions.create({
            model: MODEL_NAME,
            messages: finalMessages,
            temperature: 0.3,
            max_tokens: 1500,
            response_format: { type: "json_object" }
        });

        const finalResponseText = finalCompletion.choices[0].message.content;
        const finalParsed = JSON.parse(extractJSON(finalResponseText));

        res.json({
            yourAnswers,
            correctAnswers,
            answerScores,
            explanationScore: finalParsed.explanationScore,
            improvementScope: finalParsed.improvementScope
        });

    } catch (error) {
        console.error('Groq Backend Evaluation Error:', error);
        res.status(500).json({ error: 'Backend evaluation failed' });
    }
};


const generateFullstackQuestion = async (req, res) => {
    try {
        const messages = [
            {
                role: 'system',
                content: `You are an expert fullstack developer and interviewer. Generate high-quality fullstack interview questions covering frontend (HTML, CSS, JavaScript, React) and backend (Node.js, Express, MongoDB, REST APIs, authentication) concepts, as well as integration between them. Return valid JSON.`
            },
            {
                role: 'user',
                content: `Generate 4 fullstack interview questions of varying difficulty for a MERN stack developer position. The questions should cover:
- 2 theory questions (concepts, best practices, architecture, etc.) – one frontend-focused, one backend-focused, or a mix.
- 1 intermediate implementation question (e.g., write a function to handle API calls, implement authentication middleware, create a React component with state, etc.)
- 1 larger coding question (e.g., build a small fullstack feature: a React component that fetches data from an API and displays it, with error handling and loading state; or implement a complete CRUD operation with frontend and backend integration)

Ensure questions are clear, self-contained, and appropriate for a fullstack interview. They should test understanding of:
- Frontend: React (hooks, state, props), JavaScript (ES6+), HTML/CSS, component lifecycle, state management.
- Backend: Node.js, Express, MongoDB (Mongoose), RESTful API design, authentication (JWT), error handling, middleware.
- Fullstack: Integration between frontend and backend, data flow, CORS, environment variables, deployment considerations.

Return ONLY a valid JSON object with EXACTLY four keys: "question1", "question2", "question3", "question4". Each value should be the full question text.

Formatting Rules:
- Output MUST be valid JSON.
- Do NOT include markdown, comments, or explanations outside the JSON.
- Escape quotation marks properly.
- Keep each question concise but detailed enough for the candidate to understand what is asked.
- Ensure questions are original and interview-relevant.`
            }
        ];

        const completion = await groqQuestion.chat.completions.create({
            model: MODEL_NAME,
            messages: messages,
            temperature: 0.7,
            max_tokens: 2000,
        });

        const responseText = completion.choices[0].message.content;
        const cleaned = extractJSON(responseText);
        const parsed = JSON.parse(cleaned);
        res.json(parsed);
    } catch (error) {
        console.error('Groq Fullstack Question Gen Error:', error);
        res.status(500).json({ error: 'Failed to generate fullstack questions' });
    }
};


const evaluateFullstack = async (req, res) => {
    try {
        const { questions, answers, explaination } = req.body;
        const questionMarks = [1, 1, 3, 5];

        let yourAnswers = [];
        let correctAnswers = [];
        let answerScores = [];

        // Process each question individually
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const answer = answers[i];
            const maxMarks = questionMarks[i];

            const messages = [
                {
                    role: 'system',
                    content: `You are a senior fullstack developer and interviewer with 7+ years experience. Evaluate a candidate's answer to a fullstack interview question. Return JSON.`
                },
                {
                    role: 'user',
                    content: `You are a senior fullstack engineer conducting a technical interview.

Your task is to evaluate a candidate’s answer to a fullstack question. The answer may include code, explanation, or both.

Be objective and analytical. Focus on correctness, completeness, clarity, and relevance to the question.

-----------------------
QUESTION
-----------------------
${question}

-----------------------
CANDIDATE'S ANSWER
-----------------------
${answer}

-----------------------
EVALUATION INSTRUCTIONS
-----------------------

Provide a concise evaluation with:
1. A summary of the candidate's answer (what they wrote/said) in no more than 5 lines.
2. The expected or correct answer (key points, correct code, etc.) in no more than 5 lines.
3. A score out of ${maxMarks} based on the quality of the answer.

-----------------------
OUTPUT FORMAT
-----------------------

Return ONLY a valid JSON object with the EXACT structure below:

{
  "yourAnswer": "Brief summary of candidate's answer (max 5 lines)",
  "correctAnswer": "Concise correct answer (max 5 lines)",
  "answerScore": 0.0
}

-----------------------
SCORING GUIDELINES
-----------------------

- Score should be a decimal between 0 and ${maxMarks}.
- ${maxMarks} = perfect answer, fully correct and well-explained.
- Half marks for partially correct or missing details.
- 0 for completely wrong or irrelevant.

-----------------------
IMPORTANT RULES
-----------------------

- Output MUST be valid JSON.
- yourAnswer and correctAnswer MUST be single strings (not arrays).
- Keep each summary concise (max 5 lines).
- Do NOT include markdown formatting.
- Do NOT include any text outside the JSON object.`
                }
            ];

            const completion = await groqEval.chat.completions.create({
                model: MODEL_NAME,
                messages: messages,
                temperature: 0.3,
                max_tokens: 1000,
            });

            const responseText = completion.choices[0].message.content;
            const cleaned = extractJSON(responseText);
            const parsed = JSON.parse(cleaned);

            yourAnswers.push(parsed.yourAnswer);
            correctAnswers.push(parsed.correctAnswer);
            answerScores.push(parsed.answerScore);
        }

        // Build summary for final evaluation
        const answersSummary = yourAnswers.map((ans, i) =>
            `Q${i + 1}:\nYour answer: ${ans}\nCorrect answer: ${correctAnswers[i]}\nScore: ${answerScores[i]}/${questionMarks[i]}`
        ).join('\n\n');

        const finalMessages = [
            {
                role: 'system',
                content: `You are a senior technical interviewer. Based on a candidate's performance across multiple fullstack questions and their overall explanation, provide a final evaluation.`
            },
            {
                role: 'user',
                content: `The candidate answered several fullstack questions and also provided an overall explanation of their approach and communication.

Below are the details for each question:

${answersSummary}

Overall explanation provided by the candidate:
${explaination}

Based on this data, provide a final evaluation in the following JSON format:

{
  "explanationScore": 0.0,  // decimal 0-10, overall quality of explanations and communication across all answers
  "improvementScope": "A paragraph up to 10 lines summarizing the candidate's key weaknesses and specific areas for improvement in both technical knowledge and communication."
}

Rules:
- explanationScore should reflect clarity, coherence, depth, and communication effectiveness across all answers and the overall explanation.
- improvementScope should be constructive, specific, and actionable (max 10 lines).
- Return ONLY valid JSON.`
            }
        ];

        const finalCompletion = await groqEval.chat.completions.create({
            model: MODEL_NAME,
            messages: finalMessages,
            temperature: 0.3,
            max_tokens: 1500,
            response_format: { type: "json_object" }
        });

        const finalResponseText = finalCompletion.choices[0].message.content;
        const finalParsed = JSON.parse(extractJSON(finalResponseText));

        res.json({
            yourAnswers,
            correctAnswers,
            answerScores,
            explanationScore: finalParsed.explanationScore,
            improvementScope: finalParsed.improvementScope
        });

    } catch (error) {
        console.error('Groq Fullstack Evaluation Error:', error);
        res.status(500).json({ error: 'Fullstack evaluation failed' });
    }
};


const generateDatabaseQuestion = async (req, res) => {
    try {
        const messages = [
            {
                role: 'system',
                content: `You are an expert database developer and interviewer. Generate high-quality database interview questions focusing on SQL, relational database design, normalization, indexing, transactions, and query optimization. Return valid JSON.`
            },
            {
                role: 'user',
                content: `Generate 4 database interview questions of varying difficulty for a backend/database developer position. The questions should cover:
- 2 theory questions (concepts: normalization, ACID, indexing, joins, etc.)
- 1 intermediate SQL query question (e.g., write a query to retrieve data from multiple tables with filtering, grouping, etc.)
- 1 larger coding question (e.g., design a database schema for a given scenario, write a complex SQL query involving subqueries, window functions, or optimization)

Ensure questions are clear, self-contained, and appropriate for a database interview. They should test understanding of:
- SQL syntax and advanced features (joins, aggregations, subqueries, CTEs, window functions)
- Database design principles (normalization, relationships, constraints)
- Performance considerations (indexing, query optimization)
- Transactions and concurrency (ACID, isolation levels)

Return ONLY a valid JSON object with EXACTLY four keys: "question1", "question2", "question3", "question4". Each value should be the full question text.

Formatting Rules:
- Output MUST be valid JSON.
- Do NOT include markdown, comments, or explanations outside the JSON.
- Escape quotation marks properly.
- Keep each question concise but detailed enough for the candidate to understand what is asked.
- Ensure questions are original and interview-relevant.`
            }
        ];

        const completion = await groqQuestion.chat.completions.create({
            model: MODEL_NAME,
            messages: messages,
            temperature: 0.7,
            max_tokens: 2000,
        });

        const responseText = completion.choices[0].message.content;
        const cleaned = extractJSON(responseText);
        const parsed = JSON.parse(cleaned);
        res.json(parsed);
    } catch (error) {
        console.error('Groq Database Question Gen Error:', error);
        res.status(500).json({ error: 'Failed to generate database questions' });
    }
};



const evaluateDatabase = async (req, res) => {
    try {
        const { questions, answers, explaination } = req.body; // overall user communication
        const questionMarks = [1, 1, 3, 5]; // fixed as per spec

        let yourAnswers = [];
        let correctAnswers = [];
        let answerScores = [];

        // Process each question individually
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const answer = answers[i];
            const maxMarks = questionMarks[i];

            const messages = [
                {
                    role: 'system',
                    content: `You are a senior database developer and interviewer with 7+ years experience. Evaluate a candidate's answer to a database interview question. Return JSON.`
                },
                {
                    role: 'user',
                    content: `You are a senior database engineer conducting a technical interview.

Your task is to evaluate a candidate’s answer to a database question. The answer may include SQL queries, schema design, explanations, or both.

Be objective and analytical. Focus on correctness, completeness, clarity, and relevance to the question.

-----------------------
QUESTION
-----------------------
${question}

-----------------------
CANDIDATE'S ANSWER
-----------------------
${answer}

-----------------------
EVALUATION INSTRUCTIONS
-----------------------

Provide a concise evaluation with:
1. A summary of the candidate's answer (what they wrote/said) in no more than 5 lines.
2. The expected or correct answer (key points, correct SQL, etc.) in no more than 5 lines.
3. A score out of ${maxMarks} based on the quality of the answer.

-----------------------
OUTPUT FORMAT
-----------------------

Return ONLY a valid JSON object with the EXACT structure below:

{
  "yourAnswer": "Brief summary of candidate's answer (max 5 lines)",
  "correctAnswer": "Concise correct answer (max 5 lines)",
  "answerScore": 0.0
}

-----------------------
SCORING GUIDELINES
-----------------------

- Score should be a decimal between 0 and ${maxMarks}.
- ${maxMarks} = perfect answer, fully correct and well-explained.
- Half marks for partially correct or missing details.
- 0 for completely wrong or irrelevant.

-----------------------
IMPORTANT RULES
-----------------------

- Output MUST be valid JSON.
- yourAnswer and correctAnswer MUST be single strings (not arrays).
- Keep each summary concise (max 5 lines).
- Do NOT include markdown formatting.
- Do NOT include any text outside the JSON object.`
                }
            ];

            const completion = await groqEval.chat.completions.create({
                model: MODEL_NAME,
                messages: messages,
                temperature: 0.3,
                max_tokens: 1000,
            });

            const responseText = completion.choices[0].message.content;
            const cleaned = extractJSON(responseText);
            const parsed = JSON.parse(cleaned);

            yourAnswers.push(parsed.yourAnswer);
            correctAnswers.push(parsed.correctAnswer);
            answerScores.push(parsed.answerScore);
        }

        // Build summary for final evaluation
        const answersSummary = yourAnswers.map((ans, i) =>
            `Q${i + 1}:\nYour answer: ${ans}\nCorrect answer: ${correctAnswers[i]}\nScore: ${answerScores[i]}/${questionMarks[i]}`
        ).join('\n\n');

        const finalMessages = [
            {
                role: 'system',
                content: `You are a senior technical interviewer. Based on a candidate's performance across multiple database questions and their overall explanation, provide a final evaluation.`
            },
            {
                role: 'user',
                content: `The candidate answered several database questions and also provided an overall explanation of their approach and communication.

Below are the details for each question:

${answersSummary}

Overall explanation provided by the candidate:
${explaination}

Based on this data, provide a final evaluation in the following JSON format:

{
  "explanationScore": 0.0,  // decimal 0-10, overall quality of explanations and communication across all answers
  "improvementScope": "A paragraph up to 10 lines summarizing the candidate's key weaknesses and specific areas for improvement in both technical knowledge and communication."
}

Rules:
- explanationScore should reflect clarity, coherence, depth, and communication effectiveness across all answers and the overall explanation.
- improvementScope should be constructive, specific, and actionable (max 10 lines).
- Return ONLY valid JSON.`
            }
        ];

        const finalCompletion = await groqEval.chat.completions.create({
            model: MODEL_NAME,
            messages: finalMessages,
            temperature: 0.3,
            max_tokens: 1500,
            response_format: { type: "json_object" }
        });

        const finalResponseText = finalCompletion.choices[0].message.content;
        const finalParsed = JSON.parse(extractJSON(finalResponseText));

        res.json({
            yourAnswers,
            correctAnswers,
            answerScores,
            explanationScore: finalParsed.explanationScore,
            improvementScope: finalParsed.improvementScope
        });

    } catch (error) {
        console.error('Groq Database Evaluation Error:', error);
        res.status(500).json({ error: 'Database evaluation failed' });
    }
};

module.exports = {
    generateQuestion,
    evaluateSubmission,
    generateFrontendQuestion,
    evaluateFrontend,
    generateBackendQuestion,
    evaluateBackend,
    generateFullstackQuestion,
    evaluateFullstack,
    generateDatabaseQuestion,
    evaluateDatabase
};