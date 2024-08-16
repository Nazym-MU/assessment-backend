import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import surveyRoutes from './survey.js';

const app = express();

// CORS setup
app.use(cors({
  origin: 'https://mastercard-ai-solutions.vercel.app',
}));

app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
connectDB();

// Use survey routes
app.use('/', surveyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
