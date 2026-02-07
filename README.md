# JWT Authentication Backend

A backend-only authentication service built with **Node.js**, **Express**, and **MongoDB**, implementing **JWT-based authentication** following industry best practices.

This project demonstrates secure user authentication, authorization, and protected API access using stateless JSON Web Tokens.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- dotenv

---

## Features

- User registration with hashed passwords
- User login with credential verification
- Stateless authentication using JWT
- Authorization middleware for protected routes
- Secure user profile access
- Client-side logout strategy

---

## Authentication Design

- JWTs are issued on successful login
- Tokens are sent via the `Authorization` header using the Bearer scheme
- The backend remains stateless (no server-side token storage)
- Token validation is handled through middleware
- Protected routes access user identity via decoded JWT payload

---

## API Overview

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/app/Auth/signup` | Register a new user |
| POST | `/app/Auth/login` | Authenticate user and issue JWT |
| GET  | `/app/Auth/home`  | Access protected user profile |
| POST | `/app/Auth/logout`| Client-side logout trigger |

---

## Security Considerations

- Passwords are never stored in plain text
- Password hashing is handled using bcrypt
- JWTs contain only non-sensitive user identifiers
- Tokens have a fixed expiration time
- Authorization logic is centralized in middleware

---

## Environment Configuration

The application requires the following environment variables:

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`

---

## Running the Project

Install dependencies and start the server:

```bash
npm install
node Server.js

