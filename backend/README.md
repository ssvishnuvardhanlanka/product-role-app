# Product Role App - Backend

This is the backend API for the Product Role App.

The backend is built with:

- NestJS
- Node.js
- TypeORM
- PostgreSQL
- Neon.tech PostgreSQL database
- JWT Authentication
- Role Based Access Control

The backend runs locally and connects to a Neon.tech PostgreSQL database.

---

## Features

- User signup
- User login
- JWT based authentication
- Product CRUD APIs
- Role based API access
- Default admin user creation
- Default role creation
- Admin user management
- Admin role management

---

## Roles

The application uses the following default roles:

| Role | Access |
|---|---|
| VIEWER | Can only view products |
| EDITOR | Can view, add and edit products |
| MANAGER | Can view, add, edit and delete products |
| ADMIN | Full access, manage users and roles |

---

## Tech Stack

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- Neon.tech
- JWT
- Passport JWT
- bcrypt

---

## Folder Structure

```txt
backend/
├── src/
│   ├── auth/
│   ├── users/
│   ├── roles/
│   ├── products/
│   ├── common/
│   ├── app.module.ts
│   └── main.ts
├── .env
├── package.json
└── README.md