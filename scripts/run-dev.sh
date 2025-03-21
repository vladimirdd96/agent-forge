#!/bin/bash

# Run development servers for AgentForge
# This script starts both the frontend and backend servers in parallel

echo "🚀 Starting Agent Forge Development Environment..."

# Get the root directory (2 levels up from the script location)
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "📂 Project root directory: $ROOT_DIR"

# Start the backend server
echo "🔧 Starting backend server..."
cd "$ROOT_DIR/backend" && npm run dev &
BACKEND_PID=$!

# Start the frontend development server
echo "🎨 Starting frontend development server..."
cd "$ROOT_DIR/frontend" && npm run dev &
FRONTEND_PID=$!

# Handle script termination
function cleanup {
  echo "🛑 Shutting down servers..."
  kill $FRONTEND_PID
  kill $BACKEND_PID
  exit
}

# Trap SIGINT (Ctrl+C) and call cleanup
trap cleanup SIGINT

echo "✅ Development environment is running!"
echo "- Backend: http://localhost:3001"
echo "- Frontend: http://localhost:3000"
echo "Press Ctrl+C to stop all servers."

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID 