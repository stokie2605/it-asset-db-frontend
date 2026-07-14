# IT Asset Management (ITAM) Control Console

An operational user-interface dashboard built to manage hardware asset lifecycles, monitor physical server locations, and synchronize inventory data with backend assets databases.

> **Backend Repository:** [it-asset-db-api](https://github.com/stokie2605/it-asset-db-api)

| Dark Mode Preview | Light Mode Preview |
| --- | --- |
| ![Dark Mode Preview](screenshots/darkmode.png) | ![Light Mode Preview](screenshots/lightmode.png) |

---

## Operational Focus
* **The Problem:** Navigating raw database tables to audit hardware systems, track serial numbers, or update network parameters is highly prone to human input error.
* **The Solution:** A centralized, read-heavy administrator console designed for zero-lag hardware search, real-time status updates, and streamlined serial scanning.

---

## Core Capabilities
* **Inventory Lifecycle Tracking:** Simplifies rapid state tracking for physical infrastructure (from provisioning to decommissioned storage).
* **Real-Time API Data Sync:** Implements high-performance API pooling to keep terminal data matched with physical database states.
* **Field Validation Schemes:** Client-side logic checks that prevent bad MAC address formats, invalid IP ranges, or duplicate serial numbers before database submission.
* **High-Availability Layout:** Optimized for rapid, accessible field terminal use on standard tablets, mobile diagnostic devices, or monitoring boards.

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

---

## Recent Architectural Upgrades
* **Operational Restructuring:** Standardized repository file hierarchies by separating core automation logic, helper scripts, and test files.
* **Security Hardening:** Swapped legacy credential configs for environment variables and secure token validation policies.
* **Database Schema Upgrades:** Refactored primitive database types into native data structures for robust ORM and transaction handling.
* **Systems Maintenance:** Eradicated legacy diagnostic scripts, optimized loops, and established static analysis scanning to ensure code hygiene.
