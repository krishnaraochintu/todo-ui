# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# React TODO App

A single-page React application for managing TODOs with full CRUD functionality. Connects to the backend API for data.




## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   The app runs at `http://localhost:5173` and expects the backend API at `http://localhost:8080/todos`.

## Production Build & Deploy

1. Build the app (set API base URL if needed):
   ```bash
   VITE_API_BASE_URL=http://your-api-host:port npm run build
   ```
   The build output will be in the `dist` folder.
2. Serve the static files:
   - Locally: Use any static server (e.g., `npx serve dist`)
   - Containerized (Nginx):
     ```bash
     docker run -d -p 80:80 -v $(pwd)/dist:/usr/share/nginx/html --name todo-ui nginx
     ```
   The app will be available at `http://localhost` and use the API base URL set during build.

## Features
- List TODOs
- Create, edit, delete TODOs
- Modern UI with React hooks and table layout

## API Expectations
- The app expects a backend API at `${API_BASE_URL}/todos` for CRUD operations.
- By default, `API_BASE_URL` is set to `http://localhost:8080` in `src/App.jsx`.
- You can change this to point to your production backend.
