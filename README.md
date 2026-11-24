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

## Run locally

1. Start MongoDB and clone the [backend repository](https://github.com/inkersal501/chat-app-backend).
2. In the backend directory, create a `.env` file with `PORT=5000`, `APP_URL=http://localhost:5173`, `MONGODB_URI=mongodb://127.0.0.1:27017/convo`, `NODE_ENV=development`, `JWT_ACCESS_EXPIRATION_MINUTES=60`, and a random secret for `JWTSECRET`. Run `npm ci` and `npm start`.
3. In the frontend directory, create a `.env.local` file with `VITE_API_BASE_URL=http://localhost:5000/v1` and `VITE_SOCKET_BASE_URL=http://localhost:5000`. Run `npm ci` and `npm run dev`. Open http://localhost:5173.

Deploy the backend before the updated frontend so cursor-based history and message retries can use the updated API.

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


## Convo Next pilot

Chats uses the existing messaging service. The People section adds username lookup, friend requests, blocking, muting, and account reports. Feed adds friends and invite-only group audiences for text posts, comments, reactions, and recent activity. Feed content is stored on the server.

Feed is enabled in local development. For a production build, set `CONVO_FEED_ENABLED=true` on the backend and `VITE_CONVO_FEED_ENABLED=true` at frontend build time to opt in. The approved rollout calls for the encrypted-chat pilot before enabling the feed for production users.

Configure `CONVO_MODERATOR_IDS` as a comma-separated list of Convo user IDs authorized to list open reports and record their disposition through the moderation API. Keep this list on the backend. The queue and its audit history are stored in MongoDB.

The current chat service still uses the existing server-readable message storage. The Matrix rollout, device verification and recovery, and migration to a read-only legacy archive are separate deployment milestones.

Run the backend integration test with `MONGODB_TEST_URI=mongodb://127.0.0.1:27017 npm test` from the backend repository. It creates and removes a uniquely named test database.

## Optional OpenID Connect sign-in

Use Node.js 20.19 or newer. Register a confidential web client with a trusted HTTPS OpenID Connect provider. The provider must support authorization code flow with PKCE S256, query-mode callbacks, signed ID tokens, and `client_secret_post`. Configure the provider's account and passkey policies separately.

- Set `APP_URL` to the frontend origin. Host the API and frontend on the same HTTPS origin in production so the Convo session cookie is available throughout linking and sign-in.
- Set `OIDC_ISSUER`, `OIDC_CLIENT_ID`, `OIDC_CLIENT_SECRET`, and `OIDC_REDIRECT_URI` on the backend. Register the exact callback URL on the provider, for example `https://convo.example/v1/user/oidc/callback`. Keep the client secret on the backend.
- Build the frontend with `VITE_CONVO_OIDC_ENABLED=true` after the backend is configured. Serve the callback path through the API rather than the frontend SPA rewrite.
- Sign in to an existing Convo account, open Settings, and select **Link identity provider**. Future sign-ins use the linked provider identity. Matching email addresses alone never link accounts. Existing sign-in remains available during the pilot.

To test the end-to-end callback locally, run the backend integration suite with a disposable MongoDB and OpenSSL available. It starts a local HTTPS test issuer. A real production provider still needs a staging test.
