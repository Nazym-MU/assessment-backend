import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import surveyRoutes from './survey.js';

const app = express();


app.use(cors({
    origin: ['https://mastercard-ai-solutions.vercel.app/'],
    credentials: true,
    methods: ['GET', 'POST']
  }));

app.use(express.json());

connectDB();

app.use('/', surveyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
