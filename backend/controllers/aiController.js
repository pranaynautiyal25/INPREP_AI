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

1. **Algorithm & Approach**
   - Identify the algorithm or data structure used.
   - Determine whether the chosen approach is optimal or suboptimal.
   - Check if the approach actually solves the problem.

2. **Correctness**
   - Determine if the code logically solves the problem.
   - Check potential bugs, logical mistakes, or missing conditions.

3. **Edge Cases**
   Consider whether the code handles:
   - Empty inputs
   - Minimum/maximum constraint values
   - Duplicate values
   - Boundary conditions
   - Invalid or corner scenarios mentioned in constraints.

4. **Time & Space Complexity**
   - Infer the algorithm's complexity.
   - Compare it with what would typically be expected for a medium-level interview problem.

5. **Code Quality**
   - Readability
   - Naming conventions
   - Structure/modularity
   - Avoidance of unnecessary complexity.

6. **Communication / Explanation**
   Evaluate whether the candidate:
   - Clearly explained their approach.
   - Explained why the algorithm works.
   - Mentioned complexity.
   - Mentioned edge cases or trade-offs.
   - Structured their explanation logically.

-----------------------
OUTPUT FORMAT
-----------------------

Return ONLY a valid JSON object with the EXACT structure below:

{
  "yourApproach": "2-3 sentence summary of the candidate's approach. Mention the algorithm or data structures used.",
  "betterApproach": "2-3 sentences describing a better or more optimal approach if applicable. If the candidate’s approach is already optimal, explain why and briefly mention alternatives.",
  "codeScore": 0.0,
  "explanationScore": 0.0,
  "codeReview": [
    "Bullet point describing a strength or issue in the code",
    "Bullet point describing another strength or issue",
    "Bullet point describing another strength or issue",
    "Bullet point describing another strength or issue"
  ],
  "explanationReview": [
    "Bullet point evaluating explanation clarity",
    "Bullet point evaluating structure or reasoning",
    "Bullet point evaluating discussion of complexity or edge cases",
    "Bullet point evaluating communication quality"
  ],
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
- Do NOT include markdown formatting.
- Do NOT include any text outside the JSON object.
- Scores must be decimals between 0 and 10 (e.g., 7.5).
- Reviews must contain concise bullet points.`
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

module.exports = { generateQuestion, evaluateSubmission };