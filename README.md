# NoteVault — AI-Powered Notes Application

A modern full-stack notes application that allows users to securely create, organize, and manage notes with AI-powered summarization. Built with React, Node.js, Express, MongoDB, and JWT authentication, and deployed on Vercel and Render.

## 🚀 Live Demo

**Frontend:** https://notevault-kappa.vercel.app

**Backend API:** https://notevault-backend-2tpo.onrender.com

---

## 📌 Features

### Authentication

* User Signup & Login
* JWT-based Authentication
* Protected Routes
* Secure Password Hashing using bcrypt

### Notes Management

* Create Notes
* Edit Notes
* Delete Notes
* View Individual Notes
* Star / Unstar Notes
* Trash & Restore Notes

### AI Features

* AI-powered Note Summarization
* Groq API Integration (LLaMA 3.1)

### User Experience

* Dark / Light Mode
* Responsive Design
* Persistent Login Sessions
* Real-time UI Updates

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

### Authentication & Security

* JSON Web Token (JWT)
* bcryptjs
* CORS

### AI

* Groq API
* LLaMA 3.1

### Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas (Database)

---

## 📂 Project Structure

```text
ai-notes-app/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/praveenvedha26/notevault.git
cd notevault
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GROQ_API_KEY=your_groq_api_key
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

### Production Frontend (.env)

```env
VITE_API_URL=https://notevault-backend-2tpo.onrender.com/api
```

---

## 📖 API Endpoints

### Authentication

```http
POST /api/auth/signup
POST /api/auth/login
```

### Notes

```http
GET    /api/notes
POST   /api/notes
PUT    /api/notes/:id
DELETE /api/notes/:id
```

### Advanced Features

```http
PATCH /api/notes/:id/star
PATCH /api/notes/:id/trash
PATCH /api/notes/:id/restore
POST  /api/notes/:id/summarize
```

---

## 🎯 Learning Outcomes

This project helped me gain hands-on experience with:

* Full-Stack Web Development
* REST API Design
* JWT Authentication
* React Context API
* Protected Routes
* MongoDB & Mongoose
* AI API Integration
* Git & GitHub Workflow
* Deployment using Vercel and Render
* CORS Configuration & Production Debugging

---

## 👨‍💻 Author

**M. V. Praveen**

Aspiring Software Developer passionate about Full-Stack Development, Data Structures & Algorithms, and building real-world applications.

GitHub: https://github.com/praveenvedha26
