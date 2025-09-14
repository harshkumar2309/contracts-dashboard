# SaaS Contract Dashboard

A simple **SaaS Contract Management Dashboard** built using **React + Vite** with state management using **Redux Toolkit** and mock API integration using **JSON Server**.  
This project demonstrates contract listing, filtering, pagination, and file upload functionality.

---

## Setup Instructions

### Prerequisites
- Node.js v18+ (recommended)
- npm v9+ (comes with Node)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Install Additional Dependencies**
    - **React Router DOM**
        ```bash
        npm install react-router-dom
        ```
    - **Redux Toolkit & React Redux**
        ```bash
        npm install @reduxjs/toolkit react-redux
        ```
    - **Lucide React (for icons)**
        ```bash
        npm install lucide-react
        ```


4. **TailwindCSS Setup**
    - Install Tailwind CSS
        ```bash
        npm install tailwindcss @tailwindcss/vite
        ```
    - Configure the Vite plugin (vite.config.js)
        ```
        import { defineConfig } from 'vite'
        import tailwindcss from '@tailwindcss/vite'

        export default defineConfig({
        plugins: [
            tailwindcss(),
        ],
        })
        ```
    - Import Tailwind CSS (index.css)
        ```
            @import "tailwindcss";
        ```

5. **Start Mock API (JSON Server)**
    ```
    npx json-server --watch db.json --port 5000
    ```
    This will run the API at:
        ```
        http://localhost:5000/contracts
        ```
        ```
        http://localhost:5000/contracts/:id
        ```

6. **Start React App**
    ```bash
    npm run dev
    ```


## Tech Stack Choices

- **Frontend Framework** → React with Vite for fast development.
- **State Management** → Redux Toolkit for predictable and centralized state handling.
- **Styling** → Tailwind CSS for modern utility-first styling.
- **Mock API** → JSON Server to simulate backend REST APIs.
- **Icons** → Lucide React for clean and customizable SVG icons.

## Assumptions Made
1. Contracts are stored in a mock API (db.json) and follow a simple schema:
2. Pagination is implemented on the frontend side using Redux state (itemsPerPage).
3. File uploads in the modal are simulated and not actually stored on the backend (for demo purposes).
4. Authentication flow is mocked (no real backend auth).
5. This project is intended as an assignment demo, not production-ready software.