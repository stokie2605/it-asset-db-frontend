# IT Asset DB Frontend
> **The 1-Line Mission:** React-based administrative dashboard utilizing dynamic REST query loops to visualize, filter, and modify hardware inventory logs in real time.
> **Backend Repository:** [it-asset-db-api](https://github.com/stokie2605/it-asset-db-api)

### ⚡ Engineering Breakdown
* **The Problem:** Back-office hardware tracking APIs require friendly client visualization and stateful filtering loops to prevent administrators from running manual JSON requests during device onboarding.
* **The Solution:** A responsive React dashboard built on Vite, implementing localized theme state persistence (Light/Dark variables), direct REST fetches, and event handlers to sync local UI state changes with backend databases.
* **The Tech Stack:** `React` `Vite` `JavaScript` `CSS Variables`

---

## 🎥 Visual Preview

| Dark Mode Preview | Light Mode Preview |
| --- | --- |
| ![Dark Mode Preview](screenshots/darkmode.png) | ![Light Mode Preview](screenshots/lightmode.png) |

---

## ⚙️ Features & Architecture
*   **Live REST Sync:** Consumes FastAPI endpoints to pull, display, and filter corporate hardware assets.
*   **Persistent Theming:** Light and dark visual modes controlled through native CSS variable tokens.
*   **Mutational UI State:** An interactive modal workflow executing `POST` request payload validation to instantly refresh the primary asset log table.
*   **Micro-animations:** Interface built with custom glassmorphism components and UI transition loops.

---

## 🛠️ Local Development Setup

1. Ensure the containerized FastAPI backend is running.
2. Clone the repository and install packages:
   ```bash
   npm install
   ```
3. Boot the local server:
   ```bash
   npm run dev
   ```
4. Access the site at `http://localhost:5173`.


### Recent Project Cleanups & Upgrades
* **Project Organization:** Cleaned up project folders by separating backend logic, frontend code, and testing suites.
* **Security Fixes:** Swapped out weak authentication methods for secure hashing and tokens to protect user data.
* **Database Tuning:** Reorganized database tables and data types to make queries run faster and handle dates/times properly.
* **Code Cleanup:** Removed dead code, optimized slow loops, and set up strict linting rules to keep the codebase easy to read.
