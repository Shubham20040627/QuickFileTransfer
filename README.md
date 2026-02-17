# QuickFileShare (SyncDrop)

> **Share messages and files securely in real-time.**
> *No database. No sign-ups. Just instant, private sharing.*

## 🚀 Overview
QuickFileShare is a **Real-Time File Sharing & Chat Application**. It allows users to create private "rooms" and share text messages, documents, and images instantly.
It is built with a focus on **Privacy and Speed**. The server is completely stateless—files are streamed directly from sender to receiver through the server's RAM and are never stored on a hard disk.

## 📸 How It Works (Workflow)

### 1. Welcome Screen
Enter your username to get started. The UI is clean and minimal.
![Welcome Screen - Desktop](client/src/assets/welcome_screen.png)
![Welcome Screen - Mobile](client/src/assets/file_transfer_1.jpeg)

### 2. Create or Join a Room
You can create a new room (which generates a unique 8-character ID) or join an existing one.
![Create Room - Desktop](client/src/assets/create_join_room.png)
![Create Room - Mobile](client/src/assets/file_transfer_2.jpeg)

### 3. Real-Time Chat & File Sharing
Once inside, you can chat instantly and share files.
![Chat Room - Desktop](client/src/assets/chat_room.png)
![Chat Room - Mobile](client/src/assets/file_transfer_3.jpeg)

---

## 🛠️ Tech Stack
*   **Frontend:** React.js, Vite, CSS (Modules)
*   **Backend:** Node.js, Express.js
*   **Real-Time:** Socket.io (WebSockets)
*   **Security:** UUID for unique room generation, CORS for secure cross-origin requests.

## 💡 Key Features
*   **⚡ Zero Latency:** Uses In-Memory transfer for instant speed.
*   **🔒 High Privacy:** No database. Files are wiped from RAM immediately after transfer.
*   **📂 Large File Support:** Optimized for files up to 10MB (images, PDFs, docs).
*   **📱 Responsive Design:** Works seamlessly on Desktop and Mobile.

## 🏗️ Deployment
The project is deployed as a **Single Service Monolith** on **Render**.
- The backend serves the production-ready React frontend static files.
- **Port:** Automatically managed via `process.env.PORT`.

---
*Built by Shubham.*
