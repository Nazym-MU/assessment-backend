import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionId: String,
  role: String,
  text: String,
  type: String,
  options: [String],
  category: String,
  weight: Number,
  scoreRange: String
});

const Question = mongoose.model('Question', questionSchema);
export default Question;
