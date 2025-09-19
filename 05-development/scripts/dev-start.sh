#!/bin/bash
echo "Starting StyleAI Full Stack Development..."

# Start backend
cd backend && source venv/bin/activate && python main.py &
BACKEND_PID=$!

# Start frontend (already running)
echo "Frontend running at: http://localhost:3000"
echo "Backend running at: http://localhost:8000"

echo "Development environment ready!"
echo "Backend PID: $BACKEND_PID"
