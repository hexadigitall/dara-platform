# StyleAI - Quick Start Guide

## 🎯 How to Run the App

### Option 1: Run Development Server
```bash
cd /mnt/c/projects/ai-fashion-stylist/05-development/frontend
npm run dev
```
Then open: **http://localhost:3000**

### Option 2: Using the Quick Script
```bash
cd /mnt/c/projects/ai-fashion-stylist/05-development
./run-preview.sh
```

## 🌐 App URLs
- **Home Page:** http://localhost:3000
- **AI Stylist:** http://localhost:3000/style
- **Static Preview:** Open `frontend/static-preview.html` in browser

## 🚀 Deploy to Vercel (Production)

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Deploy from Frontend Directory
```bash
cd frontend
vercel --prod
```

### 3. Alternative: GitHub Integration
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Deploy automatically

## 📱 What You'll See
- Modern AI fashion platform
- Interactive chat interface
- Responsive design
- Dark/light mode toggle
- Professional UI with animations

## 🛠 Troubleshooting
- **Port 3000 in use:** Kill with `pkill -f "next dev"`
- **Dependencies missing:** Run `npm install`
- **Build errors:** Clear cache with `rm -rf .next && npm run dev`