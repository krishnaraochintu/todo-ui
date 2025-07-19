# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# React TODO App

A single-page React application for managing TODOs with full CRUD functionality. Connects to the backend API for data.


## Getting Started (Development)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Production Build & Run

1. Set the backend API base URL (default: `http://localhost:8080`) in `src/App.jsx` as `API_BASE_URL`.
   - For advanced setups, use a `.env.production` file with `VITE_API_BASE_URL` and update your code to use `import.meta.env.VITE_API_BASE_URL`.
2. Build the app (with custom API base URL):
   ```bash
   VITE_API_BASE_URL=http://your-api-host:port npm run build
   VITE_API_BASE_URL=http://localhost:8080 npm run build
   ```
   This creates a `dist` folder with static files. The app will use the API base URL you set during build.
3. Serve the static files with Nginx or any static server:
   ```bash
   # Example with Nginx Docker
   docker run -d -p 80:80 -v $(pwd)/dist:/usr/share/nginx/html --name todo-ui nginx
   ```

## Features
- List TODOs
- Create, edit, delete TODOs
- Modern UI with React hooks and table layout

## API Expectations
- The app expects a backend API at `${API_BASE_URL}/todos` for CRUD operations.
- By default, `API_BASE_URL` is set to `http://localhost:8080` in `src/App.jsx`.
- You can change this to point to your production backend.
