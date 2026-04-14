const { groqQuestion, groqEval, MODEL_NAME } = require('../config/ai');

// Helper to clean AI response (still needed if Groq returns markdown fences)
const extractJSON = (text) => {
    // Strip markdown code fences if present
    let cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();

    // Remove any actual newlines/tabs inside JSON string values
    cleaned = cleaned.replace(/"(?:[^"\\]|\\.)*"/g, (match) => {
        return match
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t');
    });

    return cleaned;
};

// Generate a DSA question
const generateQuestion = async (req, res) => {
    try {
        const topics = [
            "Arrays",
            "Strings",
            "Linked Lists",
            "Binary Trees",
            "Graphs",
            "Dynamic Programming",
            "Stacks / Queues"
        ];

        const selectedTopic = topics[Math.floor(Math.random() * topics.length)];

        const messages = [
            {
                role: 'system',
                content: `You are an expert DSA coding interview question generator. Your output must always be valid JSON and nothing else. Never wrap output in markdown or code blocks.`
            },
            {
                role: 'user',
                content: `Generate ONE medium-difficulty DSA coding problem strictly on the topic: "${selectedTopic}".

Rules:
- The problem MUST be about "${selectedTopic}" only. Do NOT switch to another topic.
- Style it like a LeetCode Medium problem — clear, concise, and interview-ready.
- Avoid famous problems (e.g., Two Sum, Reverse Linked List, LCA of BST).
- The problem must require real algorithmic thinking, not trivial logic.
- Solvable in 20–40 minutes in an interview setting.

Problem Structure (keep it SHORT and PRECISE):
1. 2–4 line problem statement — what to do, not background stories.
2. Function signature (language-agnostic).
3. One example: Input → Output (with brief explanation).
4. Edge cases (1–2 lines only).

STRICT JSON RULES:
- Return ONLY a raw JSON object. No markdown, no code fences, no backticks.
- All string values must be on a SINGLE LINE. Use \\n for line breaks inside strings, never actual newlines.
- Escape all special characters properly inside strings.

Return ONLY this JSON:
{
  "question": "Concise problem statement + function signature + one example with input, output, and short explanation.",
  "constraint": "Input size limits, value ranges, edge cases, expected time and space complexity."
}`
            }
        ];

        const completion = await groqQuestion.chat.completions.create({
            model: MODEL_NAME,
            messages: messages,
            temperature: 0.7,
            max_tokens: 3000,
        });

        const responseText = completion.choices[0].message.content;
        //console.log('Raw response from model:', responseText);

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
                content: `You are a senior software engineer and technical interviewer evaluating a candidate's DSA solution. You are strict, objective, and analytical. Your output must always be a raw valid JSON object — no markdown, no code fences, no extra text.`
            },
            {
                role: 'user',
                content: `Evaluate the candidate's DSA solution below. Assess their code and verbal explanation independently and provide structured feedback.

=== PROBLEM ===
${question}

=== CONSTRAINTS ===
${constraint}

=== CANDIDATE'S CODE ===
${code}

=== CANDIDATE'S VERBAL EXPLANATION (transcribed) ===
${explanation}

=== WHAT TO EVALUATE ===

Evaluate across these 6 dimensions:
1. Algorithm & Approach — Did they pick the right data structure or algorithm? Is the strategy sound?
2. Correctness — Does the code produce the correct output for general and edge cases?
3. Edge Case Handling — Are null inputs, empty arrays, duplicates, or boundary values handled?
4. Time & Space Complexity — Is the complexity acceptable? Did they analyze it correctly?
5. Code Quality — Is the code readable, well-named, and free of unnecessary complexity?
6. Communication — Was the explanation clear, structured, and did it cover the "why" behind decisions?

=== SCORING RULES ===

codeScore (0–10):
- 9–10 → Correct, optimal, clean, handles all edge cases.
- 7–8  → Correct and efficient, minor issues in style or edge cases.
- 5–6  → Works for general cases but misses edge cases or has inefficiencies.
- 3–4  → Partially correct or uses a suboptimal approach.
- 0–2  → Incorrect logic or fundamentally broken.

explanationScore (0–10):
- 9–10 → Clearly explains the approach, complexity, and edge cases with good reasoning.
- 7–8  → Good explanation with minor gaps.
- 5–6  → Understandable but lacks depth or structure.
- 3–4  → Vague or mostly surface-level.
- 0–2  → Unclear, incorrect, or barely explained.

=== OUTPUT FORMAT ===

Return ONLY this raw JSON object. No markdown. No code fences. Single-line string values only — use \\n for line breaks inside strings.

{
  "yourApproach": "2–3 sentences describing what algorithm or data structure the candidate used and how they approached the problem.",
  "betterApproach": "2–3 sentences describing a more optimal approach if one exists. If their approach is already optimal, confirm it and briefly mention any valid alternatives.",
  "codeScore": 0.0,
  "explanationScore": 0.0,
  "codeReview": "- Point 1\\n- Point 2\\n- Point 3\\n- Point 4",
  "explanationReview": "- Point 1\\n- Point 2\\n- Point 3\\n- Point 4",
  "improvementScope": "A concise paragraph covering the top 2–3 areas the candidate should focus on to perform better in future interviews."
}

STRICT JSON RULES:
- codeScore and explanationScore must be a decimal number between 0 and 10 (e.g., 7.5).
- codeReview and explanationReview must be plain strings with bullet points separated by \\n — NOT arrays.
- Do NOT output anything outside the JSON object.
- All string values must be on a single line. Use \\n for line breaks, never actual newlines inside strings.`
            }
        ];

        const completion = await groqEval.chat.completions.create({
            model: MODEL_NAME,
            messages: messages,
            temperature: 0.3,
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
                content: `You are a senior frontend engineer and technical interviewer with 10+ years of experience hiring for MERN stack roles. You generate sharp, original, and interview-relevant frontend questions. Your output must always be a raw valid JSON object — no markdown, no code fences, no extra text.`
            },
            {
                role: 'user',
                content: `Generate exactly 4 frontend interview questions for a MERN stack frontend developer position.

=== QUESTION BREAKDOWN ===

question1 — Theory (Conceptual)
- Test understanding of a core concept: HTML semantics, CSS behavior, JavaScript internals (event loop, closures, prototypes), or React fundamentals (reconciliation, virtual DOM, lifecycle).
- Should require explanation, not just a definition.
- Example style: "What happens when..." / "Why does..." / "Explain the difference between..."

question2 — Theory (Best Practices / Situational)
- Test decision-making and real-world understanding.
- Cover topics like: React performance optimization, state management choices, accessibility, CSS architecture, or async patterns.
- Example style: "How would you approach..." / "What are the trade-offs of..." / "When would you choose X over Y..."

question3 — Intermediate Implementation (Function / Logic)
- Ask the candidate to write a JavaScript or React function/utility.
- Should be solvable in 10–15 minutes.
- Topics: array/object manipulation, debounce/throttle, custom hooks, event handling, promise chaining, etc.
- Must include: what the function receives as input and what it should return.

question4 — Coding Challenge (Component / Feature)
- Ask the candidate to build a small but complete React component or implement a UI feature.
- Should be solvable in 20–30 minutes.
- Topics: controlled forms, infinite scroll, accordion, tabs, search with debounce, drag-and-drop, pagination, etc.
- Must include: what the component should do, what props/state it needs, and expected behavior.

=== RULES ===
- All questions must be original — avoid generic or overused questions (e.g., "What is a closure?", "What is useState?").
- Each question must be self-contained — the candidate should fully understand the task without extra context.
- Keep each question concise but specific enough for implementation.
- Vary the topics across the 4 questions — do not repeat the same domain (e.g., avoid 2 React questions in theory).

=== OUTPUT FORMAT ===

Return ONLY this raw JSON object. No markdown. No code fences. Single-line string values only — use \\n for line breaks inside strings.

{
  "question1": "Full theory question text.",
  "question2": "Full theory question text.",
  "question3": "Full implementation question text including input, expected output, and any clarifications.",
  "question4": "Full coding challenge text including component requirements, expected behavior, and any constraints."
}

STRICT JSON RULES:
- Output must start with { and end with }.
- All string values must be on a single line. Use \\n for line breaks, never actual newlines inside strings.
- Do NOT output anything outside the JSON object.`
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
        //console.error('Groq Frontend Question Gen Error:', error);
        res.status(500).json({ error: 'Failed to generate frontend questions' });
    }
};

// Updated evaluateFrontend – no explanation used
const evaluateFrontend = async (req, res) => {
    try {
        const { questions, answers, explaination } = req.body;
        const questionMarks = [1, 1, 3, 5];

        let yourAnswers = [];
        let correctAnswers = [];
        let answerScores = [];

        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const answer = answers[i];
            const maxMarks = questionMarks[i];

            const messages = [
                {
                    role: 'system',
                    content: `You are a senior frontend engineer and technical interviewer evaluating a candidate's answer to a frontend interview question. You are strict, objective, and concise. Your output must always be a raw valid JSON object — no markdown, no code fences, no extra text.`
                },
                {
                    role: 'user',
                    content: `Evaluate the candidate's answer to the frontend question below. The answer may include code, explanation, or both.

=== QUESTION ===
${question}

=== CANDIDATE'S ANSWER ===
${answer}

=== EVALUATION INSTRUCTIONS ===

1. yourAnswer — Summarize what the candidate actually wrote or said. Capture their approach, key points, and any code logic in plain language. Max 5 lines.

2. correctAnswer — Provide the ideal or expected answer. Include the key concepts, correct approach, or correct code pattern a strong candidate should know. Max 5 lines.

3. answerScore — Score the candidate out of ${maxMarks} based on the following:
   - ${maxMarks}     → Fully correct, complete, and well-explained.
   - ${(maxMarks * 0.75).toFixed(1)} → Mostly correct with minor gaps or missing edge cases.
   - ${(maxMarks * 0.5).toFixed(1)}  → Partially correct — key idea present but incomplete or slightly off.
   - ${(maxMarks * 0.25).toFixed(1)} → Mostly incorrect but shows some relevant understanding.
   - 0     → Completely wrong, irrelevant, or no answer provided.

=== OUTPUT FORMAT ===

Return ONLY this raw JSON object. No markdown. No code fences. Single-line string values only — use \\n for line breaks inside strings.

{
  "yourAnswer": "Concise summary of the candidate's answer (max 5 lines).",
  "correctAnswer": "Concise ideal answer covering key concepts or correct implementation (max 5 lines).",
  "answerScore": 0.0
}

STRICT JSON RULES:
- answerScore must be a decimal between 0 and ${maxMarks}.
- yourAnswer and correctAnswer must be plain single-line strings — NOT arrays.
- Do NOT output anything outside the JSON object.
- Use \\n for line breaks inside strings, never actual newlines.`
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

        const answersSummary = yourAnswers.map((ans, i) =>
            `Q${i + 1}:\nCandidate's Answer: ${ans}\nCorrect Answer: ${correctAnswers[i]}\nScore: ${answerScores[i]}/${questionMarks[i]}`
        ).join('\n\n');

        const finalMessages = [
            {
                role: 'system',
                content: `You are a senior technical interviewer delivering a final performance review for a candidate who completed a frontend interview. You are constructive, honest, and specific. Your output must always be a raw valid JSON object — no markdown, no code fences, no extra text.`
            },
            {
                role: 'user',
                content: `A candidate has completed a frontend interview consisting of 4 questions. Below is a breakdown of their performance on each question, along with their overall verbal explanation.

=== PER-QUESTION PERFORMANCE ===
${answersSummary}

=== CANDIDATE'S OVERALL VERBAL EXPLANATION ===
${explaination}

=== EVALUATION INSTRUCTIONS ===

1. explanationScore (0–10) — Rate the overall quality of the candidate's communication and reasoning across all answers and their verbal explanation.
   - 9–10 → Exceptionally clear, structured, and technically accurate throughout.
   - 7–8  → Mostly clear with good reasoning, minor gaps in depth or precision.
   - 5–6  → Understandable but lacks structure, depth, or misses key technical reasoning.
   - 3–4  → Vague, disorganized, or shows surface-level understanding.
   - 0–2  → Mostly unclear, incorrect reasoning, or minimal communication.

2. improvementScope — Write a concise, constructive paragraph (max 10 lines) identifying the candidate's top 2–3 weaknesses. Be specific — reference the types of questions or concepts they struggled with. Make the feedback actionable so the candidate knows exactly what to study or practice.

=== OUTPUT FORMAT ===

Return ONLY this raw JSON object. No markdown. No code fences. Single-line string values only — use \\n for line breaks inside strings.

{
  "explanationScore": 0.0,
  "improvementScope": "Constructive paragraph identifying top 2–3 weaknesses with specific, actionable advice (max 10 lines)."
}

STRICT JSON RULES:
- explanationScore must be a decimal between 0 and 10.
- improvementScope must be a plain single-line string. Use \\n for line breaks, never actual newlines.
- Do NOT output anything outside the JSON object.`
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
        //console.error('Groq Frontend Evaluation Error:', error);
        res.status(500).json({ error: 'Frontend evaluation failed' });
    }
};

const generateBackendQuestion = async (req, res) => {
    try {
        const messages = [
            {
                role: 'system',
                content: `You are a senior backend engineer and technical interviewer with 10+ years of experience hiring for MERN stack roles. You generate sharp, original, and interview-relevant backend questions. Your output must always be a raw valid JSON object — no markdown, no code fences, no extra text.`
            },
            {
                role: 'user',
                content: `Generate exactly 4 backend interview questions for a MERN stack backend developer position.

=== QUESTION BREAKDOWN ===

question1 — Theory (Conceptual)
- Test deep understanding of a core backend concept: Node.js internals (event loop, streams, worker threads), Express middleware chain, MongoDB indexing or aggregation, REST principles, or HTTP fundamentals.
- Should require explanation, not just a definition.
- Example style: "What happens when..." / "Why does..." / "Explain the difference between..."

question2 — Theory (Best Practices / Situational)
- Test architectural thinking and real-world decision-making.
- Cover topics like: API rate limiting, JWT vs session auth, database schema design, error handling strategies, security best practices (CORS, helmet, input sanitization), or horizontal vs vertical scaling.
- Example style: "How would you approach..." / "What are the trade-offs of..." / "When would you choose X over Y..."

question3 — Intermediate Implementation (Function / Middleware / Query)
- Ask the candidate to write a Node.js/Express function, middleware, or Mongoose query.
- Should be solvable in 10–15 minutes.
- Topics: auth middleware (JWT verification), rate limiter, file upload handler, aggregation pipeline, pagination logic, async error wrapper, etc.
- Must include: what the function/middleware receives as input and what it should do or return.

question4 — Coding Challenge (API Endpoint / Feature)
- Ask the candidate to build a complete, production-ready REST API endpoint or backend feature.
- Should be solvable in 20–30 minutes.
- Topics: user registration with validation + hashing, role-based access control, file upload with Cloudinary, paginated feed API, refresh token flow, etc.
- Must include: the endpoint's purpose, required request structure (body/params/headers), expected response, and any validation or error handling requirements.

=== RULES ===
- All questions must be original — avoid generic or overused questions (e.g., "What is middleware?", "What is JWT?").
- Each question must be self-contained — the candidate should fully understand the task without extra context.
- Keep each question concise but specific enough for implementation.
- Vary the topics across the 4 questions — do not repeat the same domain (e.g., avoid 2 auth questions).

=== OUTPUT FORMAT ===

Return ONLY this raw JSON object. No markdown. No code fences. Single-line string values only — use \\n for line breaks inside strings.

{
  "question1": "Full theory question text.",
  "question2": "Full theory question text.",
  "question3": "Full implementation question text including what to build, inputs, and expected output or behavior.",
  "question4": "Full coding challenge text including endpoint purpose, request/response structure, validation rules, and error handling requirements."
}

STRICT JSON RULES:
- Output must start with { and end with }.
- All string values must be on a single line. Use \\n for line breaks, never actual newlines inside strings.
- Do NOT output anything outside the JSON object.`
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
        //console.error('Groq Backend Question Gen Error:', error);
        res.status(500).json({ error: 'Failed to generate backend questions' });
    }
};


const evaluateBackend = async (req, res) => {
    try {
        const { questions, answers, explaination } = req.body;
        const questionMarks = [1, 1, 3, 5];

        let yourAnswers = [];
        let correctAnswers = [];
        let answerScores = [];

        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const answer = answers[i];
            const maxMarks = questionMarks[i];

            const messages = [
                {
                    role: 'system',
                    content: `You are a senior backend engineer and technical interviewer evaluating a candidate's answer to a backend interview question. You are strict, objective, and concise. Your output must always be a raw valid JSON object — no markdown, no code fences, no extra text.`
                },
                {
                    role: 'user',
                    content: `Evaluate the candidate's answer to the backend question below. The answer may include code, explanation, or both.

=== QUESTION ===
${question}

=== CANDIDATE'S ANSWER ===
${answer}

=== EVALUATION INSTRUCTIONS ===

1. yourAnswer — Summarize what the candidate actually wrote or said. Capture their approach, key points, and any code logic in plain language. Max 5 lines.

2. correctAnswer — Provide the ideal or expected answer. Include the key concepts, correct approach, or correct code pattern a strong candidate should know. Max 5 lines.

3. answerScore — Score the candidate out of ${maxMarks} based on the following:
   - ${maxMarks}     → Fully correct, complete, and well-explained.
   - ${(maxMarks * 0.75).toFixed(1)} → Mostly correct with minor gaps or missing edge cases.
   - ${(maxMarks * 0.5).toFixed(1)}  → Partially correct — key idea present but incomplete or slightly off.
   - ${(maxMarks * 0.25).toFixed(1)} → Mostly incorrect but shows some relevant understanding.
   - 0     → Completely wrong, irrelevant, or no answer provided.

=== OUTPUT FORMAT ===

Return ONLY this raw JSON object. No markdown. No code fences. Single-line string values only — use \\n for line breaks inside strings.

{
  "yourAnswer": "Concise summary of the candidate's answer (max 5 lines).",
  "correctAnswer": "Concise ideal answer covering key concepts or correct implementation (max 5 lines).",
  "answerScore": 0.0
}

STRICT JSON RULES:
- answerScore must be a decimal between 0 and ${maxMarks}.
- yourAnswer and correctAnswer must be plain single-line strings — NOT arrays.
- Do NOT output anything outside the JSON object.
- Use \\n for line breaks inside strings, never actual newlines.`
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

        const answersSummary = yourAnswers.map((ans, i) =>
            `Q${i + 1}:\nCandidate's Answer: ${ans}\nCorrect Answer: ${correctAnswers[i]}\nScore: ${answerScores[i]}/${questionMarks[i]}`
        ).join('\n\n');

        const finalMessages = [
            {
                role: 'system',
                content: `You are a senior technical interviewer delivering a final performance review for a candidate who completed a backend interview. You are constructive, honest, and specific. Your output must always be a raw valid JSON object — no markdown, no code fences, no extra text.`
            },
            {
                role: 'user',
                content: `A candidate has completed a backend interview consisting of 4 questions. Below is a breakdown of their performance on each question, along with their overall verbal explanation.

=== PER-QUESTION PERFORMANCE ===
${answersSummary}

=== CANDIDATE'S OVERALL VERBAL EXPLANATION ===
${explaination}

=== EVALUATION INSTRUCTIONS ===

1. explanationScore (0–10) — Rate the overall quality of the candidate's communication and reasoning across all answers and their verbal explanation.
   - 9–10 → Exceptionally clear, structured, and technically accurate throughout.
   - 7–8  → Mostly clear with good reasoning, minor gaps in depth or precision.
   - 5–6  → Understandable but lacks structure, depth, or misses key technical reasoning.
   - 3–4  → Vague, disorganized, or shows surface-level understanding.
   - 0–2  → Mostly unclear, incorrect reasoning, or minimal communication.

2. improvementScope — Write a concise, constructive paragraph (max 10 lines) identifying the candidate's top 2–3 weaknesses. Be specific — reference the types of questions or backend concepts they struggled with. Make the feedback actionable so the candidate knows exactly what to study or practice.

=== OUTPUT FORMAT ===

Return ONLY this raw JSON object. No markdown. No code fences. Single-line string values only — use \\n for line breaks inside strings.

{
  "explanationScore": 0.0,
  "improvementScope": "Constructive paragraph identifying top 2–3 weaknesses with specific, actionable advice (max 10 lines)."
}

STRICT JSON RULES:
- explanationScore must be a decimal between 0 and 10.
- improvementScope must be a plain single-line string. Use \\n for line breaks, never actual newlines.
- Do NOT output anything outside the JSON object.`
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
        //console.error('Groq Backend Evaluation Error:', error);
        res.status(500).json({ error: 'Backend evaluation failed' });
    }
};

const generateFullstackQuestion = async (req, res) => {
    try {
        const messages = [
            {
                role: 'system',
                content: `You are a senior fullstack engineer and technical interviewer with 10+ years of experience hiring for MERN stack roles. You generate sharp, original, and interview-relevant fullstack questions that test both frontend and backend depth. Your output must always be a raw valid JSON object — no markdown, no code fences, no extra text.`
            },
            {
                role: 'user',
                content: `Generate exactly 4 fullstack interview questions for a MERN stack developer position.

=== QUESTION BREAKDOWN ===

question1 — Theory (Frontend-Focused Conceptual)
- Test deep understanding of a core frontend concept: React rendering behavior, virtual DOM, reconciliation, JavaScript event loop, closures, async/await, CSS specificity, or browser performance.
- Should require explanation, not just a definition.
- Example style: "What happens when..." / "Why does..." / "Explain the difference between..."

question2 — Theory (Backend or Fullstack Architecture)
- Test architectural and systems thinking across the stack.
- Cover topics like: how CORS works end-to-end, JWT auth flow (frontend + backend), environment variable management, API versioning, database schema design, or deployment considerations (CI/CD, Docker, env configs).
- Example style: "How would you design..." / "What are the trade-offs of..." / "Walk me through how X works from client to server..."

question3 — Intermediate Implementation (Function / Hook / Middleware)
- Ask the candidate to write a JavaScript/React function, custom hook, or Express middleware that bridges frontend and backend concerns.
- Should be solvable in 10–15 minutes.
- Topics: custom useFetch hook, debounced search with API call, JWT auth middleware, axios interceptor for token refresh, form validation with API error handling, etc.
- Must include: what the function/hook/middleware receives as input and what it should do or return.

question4 — Coding Challenge (Fullstack Feature)
- Ask the candidate to build a small but complete fullstack feature involving both a React component and a backend API endpoint.
- Should be solvable in 20–30 minutes.
- Topics: user login flow (React form + JWT API), paginated list with backend support, file upload (React + Multer), protected route with auth guard, real-time notification with polling, etc.
- Must include: the feature's purpose, frontend requirements (component structure, state, UX behavior), backend requirements (endpoint, request/response, validation), and how they connect.

=== RULES ===
- All questions must be original — avoid generic or overused questions (e.g., "What is useEffect?", "What is middleware?").
- Each question must be self-contained — the candidate should fully understand the task without extra context.
- Keep each question concise but specific enough for implementation.
- Vary the topics across the 4 questions — do not repeat the same domain or layer (e.g., avoid 2 React-only questions).

=== OUTPUT FORMAT ===

Return ONLY this raw JSON object. No markdown. No code fences. Single-line string values only — use \\n for line breaks inside strings.

{
  "question1": "Full theory question text.",
  "question2": "Full theory / architecture question text.",
  "question3": "Full implementation question text including what to build, inputs, and expected output or behavior.",
  "question4": "Full fullstack coding challenge including frontend requirements, backend requirements, and integration details."
}

STRICT JSON RULES:
- Output must start with { and end with }.
- All string values must be on a single line. Use \\n for line breaks, never actual newlines inside strings.
- Do NOT output anything outside the JSON object.`
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
        //console.error('Groq Fullstack Question Gen Error:', error);
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

        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const answer = answers[i];
            const maxMarks = questionMarks[i];

            const messages = [
                {
                    role: 'system',
                    content: `You are a senior fullstack engineer and technical interviewer evaluating a candidate's answer to a fullstack interview question. You are strict, objective, and concise. Your output must always be a raw valid JSON object — no markdown, no code fences, no extra text.`
                },
                {
                    role: 'user',
                    content: `Evaluate the candidate's answer to the fullstack question below. The answer may include code, explanation, or both.

=== QUESTION ===
${question}

=== CANDIDATE'S ANSWER ===
${answer}

=== EVALUATION INSTRUCTIONS ===

1. yourAnswer — Summarize what the candidate actually wrote or said. Capture their approach, key points, and any code logic in plain language. If the question spans frontend and backend, note how they addressed each layer. Max 5 lines.

2. correctAnswer — Provide the ideal or expected answer. Include the key concepts, correct approach, or correct code pattern a strong candidate should know. If fullstack, cover both layers concisely. Max 5 lines.

3. answerScore — Score the candidate out of ${maxMarks} based on the following:
   - ${maxMarks}     → Fully correct, complete, and well-explained.
   - ${(maxMarks * 0.75).toFixed(1)} → Mostly correct with minor gaps or missing edge cases.
   - ${(maxMarks * 0.5).toFixed(1)}  → Partially correct — key idea present but incomplete or slightly off.
   - ${(maxMarks * 0.25).toFixed(1)} → Mostly incorrect but shows some relevant understanding.
   - 0     → Completely wrong, irrelevant, or no answer provided.

=== OUTPUT FORMAT ===

Return ONLY this raw JSON object. No markdown. No code fences. Single-line string values only — use \\n for line breaks inside strings.

{
  "yourAnswer": "Concise summary of the candidate's answer (max 5 lines).",
  "correctAnswer": "Concise ideal answer covering key concepts or correct implementation (max 5 lines).",
  "answerScore": 0.0
}

STRICT JSON RULES:
- answerScore must be a decimal between 0 and ${maxMarks}.
- yourAnswer and correctAnswer must be plain single-line strings — NOT arrays.
- Do NOT output anything outside the JSON object.
- Use \\n for line breaks inside strings, never actual newlines.`
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

            console.log(parsed);

            yourAnswers.push(parsed.yourAnswer);
            correctAnswers.push(parsed.correctAnswer);
            answerScores.push(parsed.answerScore);
        }

        const answersSummary = yourAnswers.map((ans, i) =>
            `Q${i + 1}:\nCandidate's Answer: ${ans}\nCorrect Answer: ${correctAnswers[i]}\nScore: ${answerScores[i]}/${questionMarks[i]}`
        ).join('\n\n');

        const finalMessages = [
            {
                role: 'system',
                content: `You are a senior technical interviewer delivering a final performance review for a candidate who completed a fullstack interview. You are constructive, honest, and specific. Your output must always be a raw valid JSON object — no markdown, no code fences, no extra text.`
            },
            {
                role: 'user',
                content: `A candidate has completed a fullstack interview consisting of 4 questions. Below is a breakdown of their performance on each question, along with their overall verbal explanation.

=== PER-QUESTION PERFORMANCE ===
${answersSummary}

=== CANDIDATE'S OVERALL VERBAL EXPLANATION ===
${explaination}

=== EVALUATION INSTRUCTIONS ===

1. explanationScore (0–10) — Rate the overall quality of the candidate's communication and reasoning across all answers and their verbal explanation. Consider whether they clearly articulated frontend logic, backend logic, and how both layers connect.
   - 9–10 → Exceptionally clear, structured, and technically accurate throughout both layers.
   - 7–8  → Mostly clear with good reasoning, minor gaps in depth or fullstack integration understanding.
   - 5–6  → Understandable but lacks structure, depth, or fails to connect frontend and backend well.
   - 3–4  → Vague, disorganized, or shows surface-level understanding of one or both layers.
   - 0–2  → Mostly unclear, incorrect reasoning, or minimal communication effort.

2. improvementScope — Write a concise, constructive paragraph (max 10 lines) identifying the candidate's top 2–3 weaknesses. Be specific — reference whether gaps are on the frontend side, backend side, or in fullstack integration. Make the feedback actionable so the candidate knows exactly what to study or practice.

=== OUTPUT FORMAT ===

Return ONLY this raw JSON object. No markdown. No code fences. Single-line string values only — use \\n for line breaks inside strings.

{
  "explanationScore": 0.0,
  "improvementScope": "Constructive paragraph identifying top 2–3 weaknesses with specific, actionable advice (max 10 lines)."
}

STRICT JSON RULES:
- explanationScore must be a decimal between 0 and 10.
- improvementScope must be a plain single-line string. Use \\n for line breaks, never actual newlines.
- Do NOT output anything outside the JSON object.`
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

        // console.log(finalParsed);
        res.json({
            yourAnswers,
            correctAnswers,
            answerScores,
            explanationScore: finalParsed.explanationScore,
            improvementScope: finalParsed.improvementScope
        });

    } catch (error) {
        //console.error('Groq Fullstack Evaluation Error:', error);
        res.status(500).json({ error: 'Fullstack evaluation failed' });
    }
};

const generateDatabaseQuestion = async (req, res) => {
    try {
        const messages = [
            {
                role: 'system',
                content: `You are a senior database engineer and technical interviewer with 10+ years of experience hiring for backend and data-heavy roles. You generate sharp, original, and interview-relevant database questions covering SQL, schema design, and performance. Your output must always be a raw valid JSON object — no markdown, no code fences, no extra text.`
            },
            {
                role: 'user',
                content: `Generate exactly 4 database interview questions for a backend/database developer position.

=== QUESTION BREAKDOWN ===

question1 — Theory (Core Database Concept)
- Test deep understanding of a fundamental database concept: normalization (1NF–BCNF), ACID properties, isolation levels, CAP theorem, indexing internals (B-tree, hash), or transaction locking and deadlocks.
- Should require explanation, not just a definition.
- Example style: "What happens when..." / "Explain the difference between..." / "Why would you choose..."

question2 — Theory (Performance / Design / Best Practices)
- Test architectural thinking and real-world database decision-making.
- Cover topics like: when and why to use composite vs partial indexes, query execution plan analysis, denormalization trade-offs, choosing between SQL and NoSQL, sharding vs replication strategies, or connection pooling.
- Example style: "How would you approach..." / "What are the trade-offs of..." / "When would you prefer X over Y..."

question3 — Intermediate SQL Query
- Ask the candidate to write a SQL query that requires multi-table joins, aggregations, filtering, or grouping.
- Should be solvable in 10–15 minutes.
- Topics: GROUP BY with HAVING, INNER/LEFT/SELF JOIN, subqueries, COUNT/SUM with conditions, ranking with ROW_NUMBER or RANK, finding duplicates, top-N per group, etc.
- Must include: a brief schema description (table names + relevant columns) and exactly what the query should return.

question4 — Coding Challenge (Schema Design or Complex Query)
- Ask the candidate to either design a normalized database schema for a real-world scenario OR write a complex SQL query using advanced features.
- Should be solvable in 20–30 minutes.
- Schema design topics: e-commerce (orders, products, users, payments), social network (followers, posts, likes), booking system (slots, reservations, availability), etc. Must specify required entities, relationships, and constraints.
- Advanced query topics: CTEs, window functions (PARTITION BY, LAG/LEAD), recursive queries, pivot tables, upserts, or query optimization with indexes.
- Must include: clear scenario description, what needs to be modeled or queried, and expected output or schema deliverable.

=== RULES ===
- All questions must be original — avoid generic or overused questions (e.g., "What is a primary key?", "What is normalization?").
- Each question must be self-contained — include enough schema or scenario context for the candidate to answer without guessing.
- Keep each question concise but specific enough for implementation.
- Vary the topics across the 4 questions — do not repeat the same concept (e.g., avoid 2 indexing questions).

=== OUTPUT FORMAT ===

Return ONLY this raw JSON object. No markdown. No code fences. Single-line string values only — use \\n for line breaks inside strings.

{
  "question1": "Full theory question text.",
  "question2": "Full theory / best practices question text.",
  "question3": "Full SQL query question including schema description, column names, and exactly what the query must return.",
  "question4": "Full schema design or complex query challenge including scenario, requirements, relationships or constraints, and expected deliverable."
}

STRICT JSON RULES:
- Output must start with { and end with }.
- All string values must be on a single line. Use \\n for line breaks, never actual newlines inside strings.
- Do NOT output anything outside the JSON object.`
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
        //console.error('Groq Database Question Gen Error:', error);
        res.status(500).json({ error: 'Failed to generate database questions' });
    }
};


const evaluateDatabase = async (req, res) => {
    try {
        const { questions, answers, explaination } = req.body;
        const questionMarks = [1, 1, 3, 5];

        let yourAnswers = [];
        let correctAnswers = [];
        let answerScores = [];

        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const answer = answers[i];
            const maxMarks = questionMarks[i];

            const messages = [
                {
                    role: 'system',
                    content: `You are a senior database engineer and technical interviewer evaluating a candidate's answer to a database interview question. You are strict, objective, and concise. Your output must always be a raw valid JSON object — no markdown, no code fences, no extra text.`
                },
                {
                    role: 'user',
                    content: `Evaluate the candidate's answer to the database question below. The answer may include SQL queries, schema design, explanations, or both.

=== QUESTION ===
${question}

=== CANDIDATE'S ANSWER ===
${answer}

=== EVALUATION INSTRUCTIONS ===

1. yourAnswer — Summarize what the candidate actually wrote or said. Capture their approach, the SQL logic or schema they proposed, and any reasoning they provided. Max 5 lines.

2. correctAnswer — Provide the ideal or expected answer. Include the correct SQL query, optimal schema design, or key concept a strong candidate should know. If it's a query, briefly describe the correct logic. Max 5 lines.

3. answerScore — Score the candidate out of ${maxMarks} based on the following:
   - ${maxMarks}     → Fully correct, complete, and well-explained. Query is logically sound or schema is properly normalized.
   - ${(maxMarks * 0.75).toFixed(1)} → Mostly correct with minor gaps — small syntax issues, missing edge case, or a slightly suboptimal approach.
   - ${(maxMarks * 0.5).toFixed(1)}  → Partially correct — core idea is right but query has logical errors or schema misses key relationships/constraints.
   - ${(maxMarks * 0.25).toFixed(1)} → Mostly incorrect but shows some relevant database understanding.
   - 0     → Completely wrong, irrelevant, or no answer provided.

=== OUTPUT FORMAT ===

Return ONLY this raw JSON object. No markdown. No code fences. Single-line string values only — use \\n for line breaks inside strings.

{
  "yourAnswer": "Concise summary of the candidate's answer (max 5 lines).",
  "correctAnswer": "Concise ideal answer covering correct SQL logic, schema, or key concept (max 5 lines).",
  "answerScore": 0.0
}

STRICT JSON RULES:
- answerScore must be a decimal between 0 and ${maxMarks}.
- yourAnswer and correctAnswer must be plain single-line strings — NOT arrays.
- Do NOT output anything outside the JSON object.
- Use \\n for line breaks inside strings, never actual newlines.`
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

        const answersSummary = yourAnswers.map((ans, i) =>
            `Q${i + 1}:\nCandidate's Answer: ${ans}\nCorrect Answer: ${correctAnswers[i]}\nScore: ${answerScores[i]}/${questionMarks[i]}`
        ).join('\n\n');

        const finalMessages = [
            {
                role: 'system',
                content: `You are a senior technical interviewer delivering a final performance review for a candidate who completed a database interview. You are constructive, honest, and specific. Your output must always be a raw valid JSON object — no markdown, no code fences, no extra text.`
            },
            {
                role: 'user',
                content: `A candidate has completed a database interview consisting of 4 questions. Below is a breakdown of their performance on each question, along with their overall verbal explanation.

=== PER-QUESTION PERFORMANCE ===
${answersSummary}

=== CANDIDATE'S OVERALL VERBAL EXPLANATION ===
${explaination}

=== EVALUATION INSTRUCTIONS ===

1. explanationScore (0–10) — Rate the overall quality of the candidate's communication and reasoning across all answers and their verbal explanation. Consider whether they could clearly articulate database concepts, justify their SQL logic, and explain their schema design decisions.
   - 9–10 → Exceptionally clear, technically precise, and well-reasoned throughout — concepts, queries, and design choices all explained confidently.
   - 7–8  → Mostly clear with good reasoning, minor gaps in depth or inability to explain one concept fully.
   - 5–6  → Understandable but lacks depth — could write queries or schemas but struggled to explain the "why" behind decisions.
   - 3–4  → Vague or disorganized — showed surface-level understanding without being able to justify choices.
   - 0–2  → Mostly unclear, incorrect reasoning, or minimal communication effort.

2. improvementScope — Write a concise, constructive paragraph (max 10 lines) identifying the candidate's top 2–3 weaknesses. Be specific — reference whether gaps are in SQL proficiency, schema design thinking, performance concepts, or communication of database reasoning. Make the feedback actionable so the candidate knows exactly what to study or practice.

=== OUTPUT FORMAT ===

Return ONLY this raw JSON object. No markdown. No code fences. Single-line string values only — use \\n for line breaks inside strings.

{
  "explanationScore": 0.0,
  "improvementScope": "Constructive paragraph identifying top 2–3 weaknesses with specific, actionable advice (max 10 lines)."
}

STRICT JSON RULES:
- explanationScore must be a decimal between 0 and 10.
- improvementScope must be a plain single-line string. Use \\n for line breaks, never actual newlines.
- Do NOT output anything outside the JSON object.`
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
        // console.error('Groq Database Evaluation Error:', error);
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