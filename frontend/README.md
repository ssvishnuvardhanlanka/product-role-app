# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Product Role App - Frontend

This is the frontend application for the Product Role App.

The frontend is built with:

- React JS
- Vite
- React Router DOM
- Axios
- JWT based authentication
- Role based UI access

The frontend runs locally and communicates with the local NestJS backend API.

---

## Features

- Signup page
- Login page
- Product table page
- Product create, edit and delete in the same table
- Role based button visibility
- Admin users page
- Admin roles page
- Logout functionality
- Protected routes

---

## Tech Stack

- React JS
- Vite
- JavaScript
- Axios
- React Router DOM
- CSS

---

## Folder Structure

```txt
frontend/
├── src/
│   ├── api/
│   │   └── api.js
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Products.jsx
│   │   ├── Users.jsx
│   │   └── Roles.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── style.css
├── .env
├── package.json
└── README.md