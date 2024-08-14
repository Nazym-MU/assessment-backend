import mongoose from 'mongoose';

const surveyResponseSchema = new mongoose.Schema({
  role: String,
  responses: [{
    questionId: String,
    answer: mongoose.Schema.Types.Mixed
  }],
  timestamp: { type: Date, default: Date.now }
});

const SurveyResponse = mongoose.model('SurveyResponse', surveyResponseSchema);
export default SurveyResponse;
