# 💰 PocketPal — Personal Finance Tracker

PocketPal is a **full-stack personal finance web application** that helps users track income and expenses, monitor balances, and analyze spending habits through visual charts.

Built with **React, Node.js, Express, and MongoDB**, with the frontend production build served directly by the backend.

---

## ✨ Features

- 🔐 User authentication (Register / Login with JWT)
- 💸 Add, edit, and delete income & expense transactions
- 📊 Dashboard with balance, total income, and total expenses
- 📈 Financial analytics with charts and trends
- 🔍 Filter transactions by type, category, and date range
- 🧾 Recent transactions overview

---

## 🛠 Tech Stack

**Frontend**
- React + Vite
- Axios
- Chart.js / Recharts

**Backend**
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication

**Deployment**
- Frontend built with `npm run build`
- `dist` served as static files via Express
- Deployed on **Render**

 Note: The first load may take a few seconds due to Render free-tier cold start.

---
## 🚀 Live Demo

👉 [https://pocketpal-personal-finance-tracker-web.onrender.com](https://pocketpal-personal-finance-tracker-web.onrender.com)

---

## 📦 Project Structure
backend/
├── dist/ # Frontend production build
├── routes/
├── models/
├── middleware/
└── index.js
frontend/
└── src/

---

## 🎯 Purpose

This project was built to practice and demonstrate **full-stack web development**, including authentication, REST APIs, database integration, and deployment.

