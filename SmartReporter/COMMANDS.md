# SmartReporter - Development Commands

## Quick Start All Services

```bash
# 1. Start MongoDB (if local)
mongod

# 2. Backend - Terminal 1
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev

# 3. AI Service - Terminal 2
cd ai-service
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python run.py

# 4. Frontend - Terminal 3
cd frontend
npm install
cp .env.example .env
npm start
```

## Using Docker Compose

```bash
# Start all services
docker-compose up

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild images
docker-compose build --no-cache
```

## Backend Commands

```bash
cd backend

# Install dependencies
npm install

# Development with auto-reload
npm run dev

# Production
npm start

# Clear node_modules
rm -rf node_modules

# Update dependencies
npm update
```

## AI Service Commands

```bash
cd ai-service

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Download YOLO model
python -c "import yolov5; yolov5.load('yolov5s.pt')"

# Run development server
python run.py

# Run with specific port
FLASK_PORT=5002 python run.py

# Deactivate virtual environment
deactivate
```

## Frontend Commands

```bash
cd frontend

# Install dependencies
npm install

# Development server (port 3000)
npm start

# Production build
npm run build

# Test build locally
npx serve -s build

# Analyze bundle size
npm run build && npm install -g serve && serve -s build
```

## Database Commands

```bash
# MongoDB - Check if running
mongo --eval "db.adminCommand('ping')"

# MongoDB - Start shell
mongosh

# MongoDB - View all databases
show dbs

# MongoDB - Switch to smartreporter
use smartreporter

# MongoDB - View all collections
show collections

# MongoDB - View sample complaint
db.complaints.findOne()

# MongoDB - Count complaints by status
db.complaints.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } }
])

# MongoDB - Find all users
db.users.find({})

# MongoDB - Delete all complaints (caution!)
db.complaints.deleteMany({})
```

## API Testing

```bash
# Test Backend Health
curl http://localhost:5000/api/health

# Test AI Service Health
curl http://localhost:5001/health

# Test Frontend
curl http://localhost:3000

# Register User
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'

# Login User
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get Dashboard Stats (admin only)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/admin/dashboard/stats
```

## Debugging

```bash
# Backend debug logs
DEBUG=* npm run dev

# Frontend debug in Chrome
# Open DevTools (F12) -> Console tab

# Python debug
python -m pdb run.py

# Check port usage
# Windows
netstat -ano | findstr :5000

# macOS/Linux
lsof -i :5000

# Kill process on port
# Windows
taskkill /PID <PID> /F

# macOS/Linux
kill -9 <PID>
```

## Deployment Preparation

```bash
# Build frontend for production
cd frontend
npm run build
# Outputs to build/ directory

# Test production build locally
npx serve -s build

# Backend production
# Set NODE_ENV=production
# Use environment variables properly

# AI Service deployment
# Install gunicorn
pip install gunicorn

# Run with gunicorn
gunicorn -w 4 -b 0.0.0.0:5001 run:app
```

## Clean Up

```bash
# Remove all node_modules
find . -name "node_modules" -type d -exec rm -rf {} +

# Remove all .env files
find . -name ".env" -delete

# Clear npm cache
npm cache clean --force

# Clear Docker images
docker image prune -a

# Remove all containers
docker container prune -f
```

## Environment Setup Windows (PowerShell)

```powershell
# Set environment variables temporarily
$env:NODE_ENV = "development"
$env:MONGODB_URI = "mongodb://localhost:27017/smartreporter"
$env:JWT_SECRET = "your_secret"

# Check environment variable
Get-ChildItem env:NODE_ENV

# Clear environment variable
Remove-Item env:NODE_ENV
```

## Useful Links

- MongoDB Compass: GUI for MongoDB
- Postman: API testing tool
- Thunder Client: VS Code API client
- MongoDB Atlas: Cloud database
- Cloudinary: Image hosting
- Vercel: Frontend deployment
- Heroku: Backend deployment
- Railway: Full-stack deployment

---

**Tips:**
- Always run `npm install` after pulling changes
- Keep `.env.example` updated with new variables
- Use `npm run dev` for development
- Check logs for debugging
- Test API endpoints before frontend integration
