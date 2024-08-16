import express from 'express';
import Question from './models/Question.js';
import SurveyResponse from './models/SurveyResponse.js';
import Recommendation from './models/Recommendation.js';
import { openai } from './config/openai.js';
import NodeCache from 'node-cache';

const router = express.Router();
const cache = new NodeCache({ stdTTL: 3600 });

router.post('/api/survey', async (req, res) => {
  try {
    const { role, responses } = req.body;

    if (!Array.isArray(responses)) {
      throw new TypeError('Expected responses to be an array');
    }

    const surveyResponse = new SurveyResponse({ role, responses });
    await surveyResponse.save();

    const questions = await Question.find({ role });
    const recommendations = await Recommendation.find({ role });

    const promptData = await Promise.all(responses.map(async (response) => {
        const question = questions.find(q => q.questionId === response.questionId);
  
        if (!question) {
          console.error(`Question not found for questionId: ${response.questionId}`);
          return null;
        }
  
        const recommendation = recommendations.find(r => r.questionId === response.questionId);
  
        let processedAnswer = response.answer;
        let status;
  
        if (question.type === 'open-ended') {
          const processedResponse = await processOpenEndedResponse(response.answer, question);
          processedAnswer = processedResponse.summary;
          status = processedResponse.status;
        } else {
          status = determineStatus(question, processedAnswer);
        }
  
        return {
          question: question.text,
          answer: processedAnswer,
          category: question.category,
          status,
          weight: question.weight,
          recommendation: recommendation ? recommendation.recommendations[status] : 'No recommendation available'
        };
      }));
  

    const validPromptData = promptData.filter(data => data !== null); 

    const cacheKey = JSON.stringify(validPromptData);
    let summary = cache.get(cacheKey);

    if (!summary) {
      const prompt = createStructuredPrompt(validPromptData);
      const gptResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: prompt }],
        max_tokens: 1000,
      });
      summary = gptResponse.choices[0].message.content;
      cache.set(cacheKey, summary);
    }

    res.json({ summary, detailedRecommendations: validPromptData });
} catch (error) {
    console.error('Error processing survey:', error);
    res.status(500).json({ error: 'An error occurred while processing the survey' });
  }
});

function determineStatus(question, answer) {
    if (question.type === 'single-choice') {
      const rangeParts = question.scoreRange.split(',');
      for (const part of rangeParts) {
        const [range, status] = part.split(':').map(s => s.trim());
        if (range.includes(answer)) {
          return status.toLowerCase();
        }
      }
    } else if (question.type === 'open-ended') {
      return answer.status; 
    }
    return 'unknown';
  }

  async function processOpenEndedResponse(answer, question) {
    const prompt = `
      Analyze the following response to the question: "${question.text}"
      
      Response: "${answer}"
      
      Consider the following scoring range for this question:
      ${question.scoreRange}
      
      Provide your analysis in the following JSON format:
      {
        "summary": "Brief summary of the response",
        "status": "behind" or "onTrack" or "ahead",
        "strengths": ["Strength 1", "Strength 2"] (or [] if none),
        "weaknesses": ["Weakness 1", "Weakness 2"],
        "recommendations": ["Recommendation 1", "Recommendation 2"]
      }
      
      Ensure that the status aligns with the provided scoring range.
    `;

  const gptResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: prompt }],
    max_tokens: 1000,
  });
    
  try {
    const rawResponse = gptResponse.choices[0].message.content;
    console.log("Raw AI Response:", rawResponse);
  
    const reportData = JSON.parse(rawResponse);

    const defaultReport = {
      summary: "",
      status: "unknown",
      strengths: [],
      weaknesses: [],
      recommendations: []
    };

    const validatedReport = { ...defaultReport, ...reportData };

    ['strengths', 'weaknesses', 'recommendations'].forEach(field => {
      if (!Array.isArray(validatedReport[field])) {
        validatedReport[field] = [validatedReport[field]].filter(Boolean);
      }
    });

    return validatedReport;
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Failed to generate valid report data");
  }
}

function calculateOverallMaturity(promptData) {
    const statusScores = { ahead: 2, ontrack: 1, behind: 0 };
    let totalScore = 0;
    let totalWeight = 0;
  
    promptData.forEach(data => {
      const score = statusScores[data.status] || 0;
      totalScore += score * data.weight;
      totalWeight += data.weight;
    });
  
    const averageScore = totalScore / totalWeight;
    if (averageScore > 1.5) return 'ahead';
    if (averageScore >= 0.5) return 'on track';
    return 'behind';
  }

  function createStructuredPrompt(promptData) {
    const structuredData = promptData.map(d => ({
      category: d.category,
      question: d.question,
      answer: d.answer,
      status: d.status,
      weight: d.weight,
      recommendation: d.recommendation
    }));
  
    const role = structuredData[0].role;
    const overallMaturity = calculateOverallMaturity(promptData);
  
    return `You are an AI consultant providing an assessment of a bank's AI maturity. Based on the following survey responses, generate a structured report in JSON format. Address the report directly to the ${role}, using "you" and "your" instead of "the bank".
  
  The JSON should have the following structure:
  
  {
    "maturityLevel": "${overallMaturity}",
    "summary": "A comprehensive paragraph summarizing the bank's current AI adoption state and overall recommendations",
    "strengths": [
      "Strength 1",
      "Strength 2"
    ],
    "weaknesses": [
      "Weakness 1",
      "Weakness 2"
    ],
    "detailedRecommendations": "A paragraph providing a cohesive plan for AI adoption, explaining the recommendations in context",
    "bulletRecommendations": [
      "Recommendation 1",
      "Recommendation 2",
      "Recommendation 3",
      "Recommendation 4",
      "Recommendation 5"
    ]
  }
  
  Survey responses:
  ${JSON.stringify(structuredData, null, 2)}
  
  Based on these responses, provide a comprehensive assessment. The overall maturity level has been calculated as "${overallMaturity}". Take into account the weight of each question and the status of the responses. Include a summary of the current state, identify strengths and weaknesses, and create a cohesive plan for AI adoption. Provide at least 5 specific, actionable recommendations. Ensure that strengths are genuinely positive aspects, not limitations or challenges. The detailedRecommendations should read like an AI consultant's advice, explaining the context and reasoning behind the recommendations. Ensure that the detailed recommendations expand on the actionable recommendations without directly repeating them. Address the recommendations directly to the ${role}. Ensure that the output is in the exact JSON format provided above.`;
  }

router.get('/api/questions/:role', async (req, res) => {
  try {
    const { role } = req.params;
    const questions = await Question.find({ role });
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'An error occurred while fetching questions' });
  }
});

export default router;
