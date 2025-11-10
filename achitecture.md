# NimbleCart — Architecture Documentation

NimbleCart is a mini e-commerce web application designed to provide a clean, responsive UI for browsing products, viewing product details, searching, and managing a shopping cart. The system follows a **modular full-stack structure** with a React frontend, Express backend, and client-side state persistence.

---

## 1. High-Level System Overview

The system is split into two layers:

| Layer | Technology | Responsibility |
|------|------------|----------------|
| **Frontend** | React (Vite) + Context API | UI rendering, navigation, cart state, auth state |
| **Backend** | Node.js + Express.js | Authentication, product data delivery, search API |
| **Storage** | localStorage (Demo Mode) | Persists cart + session token |

---

## 2. Architecture Diagram

```mermaid
flowchart LR
    User --> Browser[React Frontend]
    Browser -- fetch/axios --> API[Express Backend]
    API --> UserDB[(Users Memory Store)]
    API --> ProductDB[(Products JSON Store)]
    Browser --> LocalStorage[(localStorage Cart + JWT Token)]
