import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  questionId: String,
  role: String,
  recommendations: {
    behind: String,
    onTrack: String,
    ahead: String
  }
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);
export default Recommendation;
