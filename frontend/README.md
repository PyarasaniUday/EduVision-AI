# Frontend - React & Tailwind SPA client

This directory houses the web UI components and client workflows for EduVision AI.

## Technical Architecture & Styling
- **React & Vite**: Extremely fast HMR compilation and bundle optimizations.
- **Tailwind CSS**: Preconfigured brand color palette (`google-blue`, `google-green`, custom `slate-800` backgrounds).
- **Lucide Icons**: Modern SVG icon vectors.
- **Chart.js (React-Chartjs-2)**: Radar chart competency map visualization.
- **Firebase client libraries**: Handles state tokens, secure user logins, and token refreshes.

## Running Locally

1. Install Node modules:
   ```bash
   npm install
   ```
2. Setup environment variables:
   Copy `.env.example` to `.env` and fill in your Firebase Web App configuration.
3. Start the dev server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to interact with the dashboard.

## Folder Contents
- `src/assets/`: Brand graphics and system icons.
- `src/components/`: Reusable dashboard elements and radar charts.
- `src/services/`: Services wrapper modules connecting Firebase Auth and REST APIs.
- `src/pages/`: Containers (Dashboard, AI mentor, SkillGap, Roadmap, PlacementReadiness, Login).
