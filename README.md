# NoteVault — AI Notes App

A full-stack notes application with JWT authentication and AI-powered summarization.

## Tech Stack

**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Frontend:** React, Vite, Tailwind CSS  
**Auth:** JWT, bcrypt  
**AI:** Groq (LLaMA 3.1)

## Features

- Signup / Login with JWT authentication
- Create, edit, delete notes
- Star notes and trash system
- AI-powered note summarization
- Dark / Light mode
- Search notes
- Responsive layout

## Project Structure

\`\`\`
ai-notes-app/
├── backend/      → Express API
└── frontend/     → React App
\`\`\`

## Setup

### Backend
\`\`\`bash
cd backend
npm install
cp .env.example .env
# Fill in your values in .env
npm run dev
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
cp .env.example .env
# Fill in your values in .env
npm run dev
\`\`\`

## Environment Variables

### Backend `.env`
\`\`\`
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_key
\`\`\`

### Frontend `.env`
\`\`\`
VITE_API_URL=http://localhost:5000/api
\`\`\`