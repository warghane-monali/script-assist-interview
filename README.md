🚀 Script Assist - React Developer Technical Exercise

📌 Overview
This project fulfills the requirements of the Script Assist technical assessment using a fully integrated React frontend and a custom Node.js backend API built within the same project directory. The app showcases authentication, dynamic routing, data presentation, and enrichment using React, Zustand, Mantine UI, React Query, and React Router.

🧰 Tech Stack
Frontend

React

React Router DOM

Zustand (for global state & auth)

React Query (for data fetching & caching)

Mantine UI (for modern UI components)

Backend

Node.js + Express

In-memory data storage (simulating public API)

Tooling

Vite (or CRA, depending on setup)

ES Modules (if used)

Fetch API

✅ Features Implemented
1. 🔐 Authentication Mechanism
    Users can log in via a form using hardcoded credentials in the backend.

    Zustand persists the user session in localStorage, allowing automatic rehydration on refresh.

    Routing is protected—unauthenticated users cannot access resource routes.

2. 📄 Resource List Page
    Displays a table of resource data fetched from the backend API.

    Integrates sorting, searching, and filtering using UI controls.

    Implemented with React Query to cache and refetch efficiently.

3. 📌 Resource Detail Page
    Clicking a resource navigates to a detailed view using route parameters.

    Detailed information is rendered using Mantine components like Card, Paper, Grid, Text, etc.

4. 🧠 Data Enrichment
    On the detail page, a secondary API call fetches related/enriched data (e.g., related entity or extended metadata).

    This data is merged and displayed alongside the main resource content.

5. 🔗 Deep Linking
    Routes support path-based deep linking:

    /dashboard/resources/:id

Pages can be shared/bookmarked directly and still show full data upon refresh (thanks to persisted state and backend API support).

📂 Project Structure

    root/
    ├── backend/
        └── Controllers 
        └── Modals
        └── Routes
    │   └── index.js          
    │   └── package.json  
    |
    |__ interview (frontend)           # Static JSON or JS-based data
    ├── src/
        ├── assets/            # All images, assets at one uniform location
    │   ├── components/        # Reusable UI components
        ├── features/          # Devided all pages by features like resourse, Script info
    │   ├── store/             # Zustand setup for auth
    │   ├── api/               # React Query hooks and API utils
    │   └── Main.tsx            # Routing and layout
    ├── README.md
    └── package.json


🛠️ How to Run the Project

1. Clone the Repository

git clone https://github.com/warghane-monali/script-assist-interview.git
cd script-assist-interview

2. We need to run backend first
    cd Backend
    open powershell
    npm i ( install backend dependancies)
    node index.js
    The backend will run at http://localhost:3000.

3. Now lets start frontend host
    open another powershell
    cd interview
    npm i
    npm run dev
    The frontend will run at http://localhost:5175 or similar depending on Vite setup.

🧪 Demo Credentials
    Username: monali1997
    Password: 123456
