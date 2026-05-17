# 🌍 Project Crowdsourced

A comprehensive civic issue resolution platform powered by community participation and AI-driven insights.

**GitHub Repository:** [https://github.com/Athul-V-Pillai/project-crowsouced](https://github.com/Athul-V-Pillai/project-crowsouced)

---

## 📋 Overview

**Project Crowdsourced** is a collection of applications designed to empower citizens and municipalities in addressing local civic issues through crowdsourced reporting, community engagement, and intelligent automation.

The flagship application is **SmartReporter** - a full-stack MERN application with AI-powered image classification for automatic issue categorization.

---

## 🚀 Main Applications

### SmartReporter
**A Crowdsourced Complaint Resolution System**

A complete MERN stack application for reporting and resolving local civic issues through crowdsourcing.

**Location:** `./SmartReporter/`

**Key Features:**
- ✅ User registration & complaint submission
- ✅ Real-time camera integration for image capture
- ✅ GPS-based location detection
- ✅ AI-powered issue classification (YOLO v8)
- ✅ Admin dashboard with analytics
- ✅ Interactive map visualization
- ✅ Community upvote system
- ✅ Email notifications

**Tech Stack:**
- **Frontend:** React 18, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js, MongoDB
- **AI Service:** Python, FastAPI, YOLO v8
- **Cloud:** Google Colab, Cloudinary, Gmail SMTP

**Quick Links:**
- 📖 [SmartReporter README](./SmartReporter/README.md) - Quick start guide
- 📚 [SmartReporter Detailed Guide](./SmartReporter/README_PROJECT.md) - Comprehensive documentation
- 🔗 [GitHub Repository](https://github.com/Athul-V-Pillai/project-crowsouced)

---

## 📂 Project Structure

```
project-crowsouced/
├── SmartReporter/                    # Main Application
│   ├── frontend/                     # React UI
│   ├── backend/                      # Node.js API
│   ├── ai-service/                   # Python AI Service
│   ├── README.md                     # Quick Start Guide
│   ├── README_PROJECT.md             # Comprehensive Guide
│   ├── PROJECT_CONTENT_PROMPT.md     # Full Documentation
│   ├── SETUP.md                      # Detailed Setup
│   ├── API_DOCS.md                   # API Reference
│   ├── docker-compose.yml            # Docker Setup
│   └── ...
│
├── README.md                         # This file
└── ...
```

---

## 🛠 Getting Started

### Option 1: Quick Start SmartReporter
```bash
cd SmartReporter
# Follow instructions in SmartReporter/README.md
```

### Option 2: Docker Compose (All Services)
```bash
cd SmartReporter
docker-compose up -d

# Access:
# Frontend: http://localhost:3000
# Backend: http://localhost:5000/api
```

### Option 3: Google Colab AI Service
1. Open [SmartReporter AI Colab Notebook](https://colab.research.google.com/drive/1yYyhHwacQFiLkRwTbwLKi887OrvwyepU)
2. Run all cells to get FastAPI service with free GPU
3. Copy Ngrok URL and add to backend `.env`

---

## 📊 Technology Stack

### Frontend
- React 18
- Tailwind CSS
- React Router v6
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication

### AI Service
- Python
- FastAPI
- YOLO v8
- PyTorch

### Cloud Services
- Google Colab (Free GPU)
- Cloudinary (Image Hosting)
- Gmail (Email Service)
- MongoDB Atlas (Database)

---

## 🎯 Features Overview

| Feature | Status | Details |
|---------|--------|---------|
| User Authentication | ✅ Complete | JWT-based, password reset, OTP |
| Complaint Submission | ✅ Complete | Camera, file upload, geolocation |
| Image Classification | ✅ Complete | YOLO v5 object detection |
| Admin Dashboard | ✅ Complete | Stats, complaints, user management |
| Community Voting | ✅ Complete | Upvote system for prioritization |
| Map Visualization | ✅ Complete | Interactive map with filters |
| Email Notifications | ✅ Complete | Status updates, confirmations |
| Google Colab AI | ✅ Complete | Free GPU FastAPI service |
| Docker Support | ✅ Complete | Full containerization |

---

## 📚 Documentation

### SmartReporter Guides
- **[Quick Start](./SmartReporter/README.md)** - Get up and running in 5 minutes
- **[Detailed Guide](./SmartReporter/README_PROJECT.md)** - Complete feature documentation
- **[Setup Instructions](./SmartReporter/SETUP.md)** - Step-by-step installation
- **[API Documentation](./SmartReporter/API_DOCS.md)** - All endpoints reference
- **[Project Content](./SmartReporter/PROJECT_CONTENT_PROMPT.md)** - Full project specification

---

## 🚀 Quick Access

### Run SmartReporter Locally
```bash
# 1. Backend
cd SmartReporter/backend
npm install
cp .env.example .env
# Configure .env with your credentials
npm start

# 2. Frontend (new terminal)
cd SmartReporter/frontend
npm install
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
npm start

# 3. AI Service (new terminal)
cd SmartReporter/ai-service
pip install -r requirements.txt
python run.py
```

### Access Applications
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- AI Service: http://localhost:5001/docs (FastAPI docs)

---

## 💻 System Requirements

- **Node.js** 16+
- **Python** 3.8+
- **MongoDB** 5+ (or Atlas account)
- **Docker & Docker Compose** (optional)
- **Google Account** (for Colab AI service)

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Submit a pull request

**Repository:** [https://github.com/Athul-V-Pillai/project-crowsouced](https://github.com/Athul-V-Pillai/project-crowsouced)

---

## 📱 Features Roadmap

### Version 1.1
- [ ] Real-time notifications (WebSocket)
- [ ] Advanced analytics dashboard
- [ ] PDF report export
- [ ] Batch upload feature

### Version 2.0
- [ ] Mobile app (React Native)
- [ ] Progressive Web App (PWA)
- [ ] Multi-language support
- [ ] Blockchain integration
- [ ] ML model retraining pipeline

---

## 👨‍💻 Author

**Athul V Pillai**
- GitHub: [@Athul-V-Pillai](https://github.com/Athul-V-Pillai)
- Repository: [project-crowsouced](https://github.com/Athul-V-Pillai/project-crowsouced)

---

## 📄 License

MIT License - Feel free to use this project for educational and commercial purposes.

---

## 💬 Support

- 📖 Read the [SmartReporter Documentation](./SmartReporter/README_PROJECT.md)
- 🐛 Report issues on [GitHub](https://github.com/Athul-V-Pillai/project-crowsouced/issues)
- 💡 Request features on [GitHub Discussions](https://github.com/Athul-V-Pillai/project-crowsouced/discussions)

---

<div align="center">

### 🌟 Project Crowdsourced

**Empowering Communities Through Technology**

[![GitHub Stars](https://img.shields.io/github/stars/Athul-V-Pillai/project-crowsouced?style=social)](https://github.com/Athul-V-Pillai/project-crowsouced)
[![GitHub Forks](https://img.shields.io/github/forks/Athul-V-Pillai/project-crowsouced?style=social)](https://github.com/Athul-V-Pillai/project-crowsouced)

[View on GitHub](https://github.com/Athul-V-Pillai/project-crowsouced)

</div>

---

**Last Updated:** May 2026  
**Status:** Production Ready ✅
