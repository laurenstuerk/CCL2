Ripground - A Full-Stack Browser Gaming Platform
Ripground is a modern, full-stack web app designed to deliver instant-play browser games within a competitive ecosystem. It moves beyond simple web games by providing a complete platform experience, from secure user accounts to dynamic leaderboards and administrative dashboards.

Key Features
This project was built from the ground up, it  includes a comprehensive set of features expected from a modern web platform:

Secure User Authentication: Full registration and login flow, complete with JWT, secure refresh token rotation, and optional Multi-Factor Authentication (MFA) for enhanced account security.

Dynamic Dashboards:

User Dashboard: A hub featuring a dynamic game library and carousel, populated by data from the backend.

Admin Dashboards: protected dashboards for managing users and game activity, featuring statistics, sortable and searchable data tables, and administrative actions.

Interactive Game Ecosystem:

Game Detail Pages: Dynamically generated pages for each game, featuring media galleries, descriptions, and a user review system.

Live Leaderboards: A centralized leaderboard page with the ability to switch between a global XP-based ranking and game-specific, time-based rankings.

Gameplay Integration: In-game actions, such as finishing a race, automatically submit results and award XP, updating user stats and leaderboard positions in real-time.

Comprehensive User Profiles: Public and private user profiles that display dynamically calculated statistics (total play time, rank, league) and achievements based on user activity.

Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js

npm

A running MySQL server instance

Installation & Setup
Clone the repository:

git clone https:..

Backend Setup:

Navigate to the backend directory:

cd backend

Install NPM packages:

npm install

Create a .env file, add your database credentials and secret keys.

Run the server:

npm run dev

Frontend Setup:

Navigate to the frontend directory:

cd frontend

Install NPM packages:

npm install

Run the development server:

npm run dev

Open http://localhost:5173