# AI Adoption Assessment - Backend

This is the backend component of the AI Adoption Assessment application. It is built using Express.js and provides an API for managing the assessment process.

## Features

- Receive survey responses from the frontend
- Process open-ended responses using the OpenAI API
- Determine the status of each response based on predefined scoring ranges
- Calculate the overall AI maturity level
- Generate a structured assessment report in JSON format
- Cache the assessment report to improve response times

## Dependencies

- Express.js
- OpenAI API
- Node Cache

## API Endpoints

- `POST /api/survey`: Receives the survey responses and generates an assessment report.
- `GET /api/questions/:role`: Fetches the available questions for a given user role.

## Website

The application is available at `https://mastercard-ai-solutions.vercel.app/`.

## Demo

[YouTube Demo](https://youtu.be/Hb6lzs8-Hes)