A modern, responsive React app that allows users to explore countries, view details, and manage favorites — with a built-in dark/light theme toggle.

🧠 Design Decisions

Simplicity & Clarity: Focused on clean UI and intuitive navigation over heavy styling.

State Management: Used Zustand for lightweight global state without boilerplate.

Reusable Components: Country cards and navbar are modular and easy to extend.

Dark/Light Theme: Implemented using React Context to maintain global theme state.

API-Driven: Integrated REST Countries API and ReqRes API for real-world data simulation.

⚙️ Tech Stack

React + TypeScript

Tailwind CSS (v4) for responsive design

Zustand for state management

React Router DOM for routing

React Toastify for feedback/notifications

REST Countries API for data

ReqRes API for authentication mock



🧩 Project Structure
src/
 ├── components/        # Reusable UI components (Navbar, CountryCard, etc.)
 ├── pages/             # Route-based pages (Login, Register, CountryDetails)
 ├── store/             # Zustand stores for Auth & Favorites
 ├── context/           # Theme context for light/dark mode
 ├── services/               # API client, countriesapi
 └── App.tsx     





🚀 Setup Instructions

Clone the repo

git clone https://github.com/salik123456/country-explorer

Install dependencies

npm install


Start the app

npm run dev



🌐 Live Demo

👉 View on Vercel
https://country-explorers.vercel.app/