import express from 'express';
import Question from './models/Question.js';
import SurveyResponse from './models/SurveyResponse.js';
import Recommendation from './models/Recommendation.js';
import { openai } from './config/openai.js';

const router = express.Router();

router.post('/api/survey', async (req, res) => {
  try {
    const { role, responses } = req.body;

    const surveyResponse = new SurveyResponse({ role, responses });
    await surveyResponse.save();

    const questions = await Question.find({ role });
    const recommendations = await Recommendation.find({ role });

    const promptData = responses.map(response => {
      const question = questions.find(q => q.questionId === response.questionId);
      const recommendation = recommendations.find(r => r.questionId === response.questionId);
      const status = determineStatus(response.answer, recommendation.scoreRange);
      return {
        question: question.text,
        answer: response.answer,
        category: question.category,
        status,
        recommendation: recommendation.recommendations[status]
      };
    });

    const prompt = `You are an AI consultant providing an assessment of a Kazakhstan bank's AI maturity. Based on the following survey responses and the assessment, generate a comprehensive summary of the strengths of the bank, what needs improvement, and provide specific recommendations for improvement in the main problematic areas. Structure the summary as follows: Results, Strengths, Weaknesses, Recommendations. Include 3-4 bullet points of detailed analysis under each of them.

Survey responses:
${promptData.map(d => `Category: ${d.category}
Question: ${d.question}
Answer: ${d.answer}
Status: ${d.status}
Recommendation: ${d.recommendation}`).join('\n\n')}

Please provide a detailed analysis and actionable recommendations.`;

    const gptResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 1000
    });

    const summary = gptResponse.data.choices[0].message.content;

    res.json({ summary, detailedRecommendations: promptData });
  } catch (error) {
    console.error('Error processing survey:', error);
    res.status(500).json({ error: 'An error occurred while processing the survey' });
  }
});

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
  

function determineStatus(answer, scoreRange) {
  const [behind, onTrack, ahead] = scoreRange.split(',').map(range => {
    const [min, max] = range.split('-').map(Number);
    return { min, max };
  });

  if (answer <= behind.max) return 'behind';
  if (answer <= onTrack.max) return 'onTrack';
  return 'ahead';
}

export default router;
