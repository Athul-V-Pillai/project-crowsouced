# SmartReporter - Troubleshooting & Quick Fixes

## ❌ Common Issues & Solutions

### 1. **"Cannot find module" or "Module not found"**

**Error:** 
```
Error: Cannot find module 'express'
```

**Solution:**
```powershell
cd backend
npm install
npm cache clean --force
npm install --legacy-peer-deps
```

---

### 2. **MongoDB Connection Error**

**Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
```powershell
# Check if MongoDB is running
mongosh --eval "db.adminCommand('ping')"

# If not, start MongoDB:
net start MongoDB

# Or if using local MongoDB:
mongod

# Wait 10 seconds and try again
```

---

### 3. **Port Already in Use**

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```powershell
# Kill process using port 5000
Get-NetTCPConnection -LocalPort 5000 | ForEach-Object {Stop-Process -Id $_.OwningProcess -Force}

# Or use port 5002 temporarily:
$env:PORT=5002
npm run dev
```

---

### 4. **Missing .env File**

**Error:**
```
Error: Cannot read property 'split' of undefined
or
PORT is undefined
```

**Solution:**
```powershell
cd backend
Copy-Item .env.example .env

# Edit .env and add:
MONGODB_URI=mongodb://localhost:27017/smartreporter
JWT_SECRET=your_random_secret_key_12345678901234567890
CLOUDINARY_CLOUD_NAME=demo
CLOUDINARY_API_KEY=demo
CLOUDINARY_API_SECRET=demo
AI_SERVICE_URL=http://localhost:5001
FRONTEND_URL=http://localhost:3000
```

---

### 5. **Nodemon Issues**

**Error:**
```
'nodemon' is not recognized
```

**Solution:**
```powershell
npm install -g nodemon
npm run dev
```

---

### 6. **npm install Takes Too Long / Fails**

**Solution:**
```powershell
# Clear npm cache
npm cache clean --force

# Try again with timeout
npm install --fetch-timeout=120000

# Or use yarn
npm install -g yarn
yarn install
yarn dev
```

---

## 🔍 Diagnostic Steps

### Step 1: Verify Node/npm
```powershell
node --version   # Should be v16+
npm --version    # Should be v8+
```

### Step 2: Check MongoDB
```powershell
mongosh --eval "db.version()"
# Should show MongoDB version
```

### Step 3: Check Ports Available
```powershell
netstat -ano | findstr :5000
netstat -ano | findstr :3000
netstat -ano | findstr :5001
# Should show nothing if ports are free
```

### Step 4: Test Backend Directly
```powershell
cd backend
node src/index.js
# Without nodemon, if this works, issue is with nodemon
```

---

## 📋 Full Setup from Scratch

If everything fails, do a complete fresh setup:

### Clean Slate
```powershell
# Backend
cd backend
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json -Force
npm cache clean --force
npm install
Copy-Item .env.example .env

# Frontend
cd ../frontend
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json -Force
npm cache clean --force
npm install
Copy-Item .env.example .env

# AI Service
cd ../ai-service
Remove-Item venv -Recurse -Force
python -m venv venv
venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt
```

---

## 🔑 Minimal .env Configuration

Create `backend/.env` with minimum values:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/smartreporter
JWT_SECRET=test_secret_key_minimum_32_characters_here12345
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=demo
CLOUDINARY_API_KEY=demo
CLOUDINARY_API_SECRET=demo
AI_SERVICE_URL=http://localhost:5001
FRONTEND_URL=http://localhost:3000
```

---

## 🧪 Test Each Service Independently

### Test Backend Only
```powershell
cd backend
npm run dev
# Wait for "Server running on port 5000"
# Open new PowerShell
curl http://localhost:5000/api/health
```

### Test Frontend Only (without backend)
```powershell
cd frontend
npm start
# Opens http://localhost:3000
```

### Test AI Service Only
```powershell
cd ai-service
python run.py
# Wait for "Running on http://0.0.0.0:5001"
# Open new PowerShell
curl http://localhost:5001/health
```

---

## 🛟 Emergency Fallback

If nothing works, try the simplest possible test:

```powershell
# Backend sanity check
cd backend
node -e "console.log('Node works')"

# Python sanity check
cd ../ai-service
python -c "print('Python works')"

# npm sanity check
npm -v
```

---

## 📞 Next Steps

**Please tell me:**
1. What exact error message do you see?
2. Which terminal/service fails? (backend, frontend, or AI)
3. Did you create `.env` files?
4. Is MongoDB running? (`net start MongoDB`)
5. Are ports 3000, 5000, 5001 free?

Then I can give you the exact fix!

---

## ⚡ Quick Fix Attempt

Run this sequence:

```powershell
# 1. Start MongoDB
net start MongoDB

# 2. Clean and reinstall backend
cd "c:\Users\Athul V   Pillai\OneDrive\Desktop\project crowsouced\SmartReporter\backend"
npm cache clean --force
Remove-Item node_modules -Recurse -Force -ErrorAction SilentlyContinue
npm install

# 3. Create .env
Copy-Item .env.example .env

# 4. Try to run
npm run dev
```

**What happens when you run `npm run dev`?** Copy and paste the error/output!
