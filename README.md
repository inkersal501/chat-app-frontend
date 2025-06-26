# Real-Time Chat App

A simple and scalable real-time chat application built with **React**, **Node.js**, and **Socket.IO**, designed for instant messaging with room-based communication and persistent messages.

---

## Features

- Real-time messaging powered by **Socket.IO**
- Supports **multiple chat rooms** with instant updates
- **Authentication** with secure login and registration
- **Message persistence** with MongoDB backend
- **Responsive UI** using Tailwind CSS for clean layout
- Toast notifications and input validations for better UX

---

## Tech Stack

| Layer      | Technology              |
|----------- |--------------------------|
| Frontend   | React.js, Tailwind CSS   |
| Backend    | Node.js, Express.js      |
| Real-Time  | Socket.IO                |
| Database   | MongoDB (Mongoose)       |
| Auth       | JWT, Bcrypt              |

---

## How it Works

1. **Users register and log in** securely.
2. On login, users can **join or create chat rooms**.
3. Messages are exchanged **in real-time** using WebSocket connections.
4. All messages are **stored in the database** for history and reloads.
5. UI updates instantly across all connected clients.

---

## Authentication Flow

- JWT-based login system with protected routes
- Redux used for managing auth state on the frontend
- Passwords are hashed securely using bcrypt

---

## Notes

- Built as a full-stack project to demonstrate real-time communication, state management, and clean UI principles.
- Scalable structure with separation of concerns for frontend and backend.
- Could be extended with encryption, typing indicators, read receipts and groups features.

---

## Author

**Inkersal Mahendran**  
[LinkedIn](https://linkedin.com/in/inkersal-mahendran) • [GitHub](https://github.com/inkersal501)

---

