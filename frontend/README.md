# KitchenLens - Frontend Client Application

This directory contains the user interface client for KitchenLens, built using React, TypeScript, Vite, Tailwind CSS v4, and TanStack Query. It provides a highly responsive, modern dashboard interface for users to manage their kitchen inventories, plan budgets, receive nutrition insights, and interact with the AI recipe assistant.

---

## Technical Stack

*   **Runtime and Build**: Node.js 20+ & Vite 8 (TypeScript configuration)
*   **Core UI Library**: React 19
*   **Styling and Design System**: Tailwind CSS v4 & Framer Motion
*   **Data Fetching and Synchronization**: TanStack Query (React Query) v5 & Axios
*   **Iconography**: Lucide React
*   **Routing**: React Router DOM v6

---

## Directory Organization

```text
frontend/
├── public/                 # Static public assets (logos, favicon)
├── src/                    # Primary application source
│   ├── api/                # Axios instance configuration and service API endpoints
│   ├── components/         # Shared component primitives (Layout, ProtectedRoute)
│   ├── context/            # AuthContext provider for sessions
│   ├── pages/              # Primary view pages
│   │   ├── Assistant.tsx   # Contextual Chat RAG Assistant
│   │   ├── Budget.tsx      # Spending charts & category analytics
│   │   ├── Dashboard.tsx   # Main inventory and overview widgets
│   │   ├── Inventory.tsx   # CRUD lists & expiry tracking
│   │   ├── Login.tsx       # Authentication view
│   │   ├── Nutrition.tsx   # Vision OCR label summarizer
│   │   ├── Receipts.tsx    # Receipt Vision scanner
│   │   ├── Register.tsx    # Registration view
│   │   └── ShoppingList.tsx# Priority shopping list management
│   ├── App.tsx             # Root page router
│   ├── index.css           # Global custom styled CSS layer
│   └── main.tsx            # Application entrypoint
├── Dockerfile              # Production Nginx deploy recipe
├── package.json            # Scripts & project dependencies
└── tsconfig.json           # Strict TypeScript configuration
```

---

## Local Setup

### Prerequisites
*   Node.js 20 or higher
*   Running KitchenLens Backend API at `http://localhost:8000` (refer to the root README)

### Installation
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server
Run the local Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to [http://localhost:5173](http://localhost:5173).

### Building for Production
Compile static TypeScript assets and build the optimized production distribution:
```bash
npm run build
```
The output assets will be populated in the `dist/` directory, ready to be served by any static web server or Nginx.

---

## Quality Assurance and Formatting

To maintain a clean and reliable codebase, the following standard utility scripts are provided:

*   **Format Check**:
    ```bash
    npm run lint
    ```
    Validates static analysis rules, strict typing compliance, and syntax guidelines across all `.ts` and `.tsx` source files.

---
*Developed and maintained by Antigravity AI Coding Assistant.*
