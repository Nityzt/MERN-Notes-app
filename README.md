# 📝 MERN Notes App

A modern, responsive notes application built with the MERN stack, featuring real-time CRUD operations, rate limiting, and a sleek UI.

## ✨ Features

- **Create, Read, Update, Delete** notes with intuitive UI
- **Rate limiting** with Redis (Upstash) to prevent abuse
- **Responsive design** with Tailwind CSS and DaisyUI
- **Real-time notifications** with React Hot Toast
- **Modern UI components** with Lucide React icons
- **Production-ready** deployment on Render

## 🚀 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **Redis (Upstash)** - Rate limiting and caching

### Frontend
- **React 18** - UI library with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS components
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icon library

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Redis instance (Upstash account)

### Clone the Repository
```bash
git clone https://github.com/nityzt/mern-notes-app.git
cd mern-notes-app
```

### Backend Setup
```bash
# Install backend dependencies
npm install

# Create .env file in root directory
touch .env
```

Add the following environment variables to your `.env` file:
```env
# MongoDB
MONGO_URI=your_mongodb_connection_string

# Upstash Redis
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

# Server Configuration
PORT=5001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
# Start backend server (from root directory)
npm run dev

# Start frontend development server (from frontend directory)
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5001

### Production Build
```bash
# Build frontend for production
cd frontend
npm run build

# Start production server (from root directory)
npm start
```

## 🌐 Deployment

This app is configured for deployment on Render.com with the following setup:

### Backend Deployment
- Build command: `npm run build`
- Start command: `npm run start`

### Frontend Integration
- Frontend builds are served statically in production
- All routes redirect to `index.html` for SPA functionality

## 📱 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes |
| GET | `/api/notes/:id` | Get single note |
| POST | `/api/notes` | Create new note |
| PUT | `/api/notes/:id` | Update note |
| DELETE | `/api/notes/:id` | Delete note |

## 🔒 Rate Limiting

The app implements rate limiting using Upstash Redis:
- **Limit**: 40 requests per 10 seconds per IP
- **Algorithm**: Sliding window
- **Response**: 429 status code when exceeded

## 🎨 UI Features

- **Responsive Grid Layout** - Adapts to different screen sizes
- **Smooth Hover Effects** - Enhanced user interactions
- **Loading States** - Visual feedback during operations
- **Toast Notifications** - Real-time user feedback
- **Confirmation Dialogs** - Prevent accidental deletions
- **Card-based Design** - Clean, modern interface

## 🗂️ Project Structure

```
mern-notes-app/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── upstash.js
│   ├── controllers/
│   │   └── notesController.js
│   ├── middleware/
│   │   └── rateLimiter.js
│   ├── models/
│   │   └── Note.js
│   ├── routes/
│   │   └── notesRoutes.js
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── NoteCard.jsx
    │   │   └── RateLimitedUI.jsx
    │   ├── lib/
    │   │   ├── axios.js
    │   │   └── utils.js
    │   ├── pages/
    │   │   ├── CreatePage.jsx
    │   │   ├── HomePage.jsx
    │   │   └── NoteDetailPage.jsx
    │   └── App.jsx
    └── package.json
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
   

## 🙏 Acknowledgments

- MongoDB for the robust database solution
- Upstash for Redis hosting and rate limiting
- Render for seamless deployment
- The amazing open-source community

## 📧 Contact

Your Name - [nitvfx@gmail.com](mailto:nitvfx@gmail.com)

---

⭐ If you found this project helpful, please give it a star!
