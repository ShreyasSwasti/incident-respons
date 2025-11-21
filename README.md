# Incident Response Playbook Generator

This is a hackathon project for an Incident Response Dashboard.

## Features
- **Login/Sign-in Page**: Secure entry point with animations.
- **Real-time Dashboard**: Monitors requests per second.
- **Status Indicators**: 
  - Green: Safe (< 200 req/s)
  - Yellow: Warning (200-300 req/s)
  - Red: Critical (> 300 req/s)
- **Alert System**: Pop-up alert when traffic exceeds 300 req/s.
- **Views**:
  - Graph View: Real-time traffic chart.
  - Blocked Requests: List of blocked IPs and reasons.
  - Settings: Configuration placeholder.

## Tech Stack
- React (Vite)
- Tailwind CSS (Styling)
- Recharts (Graphs)
- Framer Motion (Animations)
- Lucide React (Icons)

## How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the browser at the URL shown (usually `http://localhost:5173`).
