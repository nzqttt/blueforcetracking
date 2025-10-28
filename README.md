# BlueForceTracking Project

## Overview

**BlueForceTracking** is a comprehensive project consisting of three main components:

1. **bft-backend**: The backend server for managing devices and data.
2. **bft-map**: A Next.js web application for map visualization.
3. **bft-monitoring-app**: A monitoring application for device management and tracking.

This guide provides step-by-step instructions to set up and run the project.

---

## Prerequisites

* **MapTiler Self-Hosted Server** installed and running on Linux Ubuntu.
* **Node.js** and **npm** installed.
* **Visual Studio Code** installed.

---

## Setup Instructions

### 1. Install MapTiler Self-Hosted Server

1. Download and install MapTiler Server on your Linux Ubuntu machine.
2. Import your map data into MapTiler Server.
3. Start the MapTiler Server and ensure it is accessible from your network.

---

### 2. Open VS Code and Run the Server

1. Open the project folder (`BlueForceTracking`) in **Visual Studio Code**.
2. Open a terminal in VS Code.
3. Navigate to the `bft-backend` directory:

   ```bash
   cd bft-backend
   ```
4. Install dependencies:

   ```bash
   npm install
   ```

---

### 3. Start Dummy Server (for Simulated Device Data)

Before running the backend, start the dummy WebSocket server to simulate device movements.

1. In a **new terminal**, ensure you are still inside the `server` folder.
2. Run the dummy server:

   ```bash
   node dummyServer.js
   ```
3. You should see a message like:

   ```
   Connected to MongoDB for dummy server
   Dummy devices are being updated...
   ```
4. Keep this terminal running to continuously broadcast simulated device locations.

---

### 4. Run bft-backend

1. Open a **new terminal** (keep the dummy server running).
2. Start the backend server:

   ```bash
   npm start
   ```
3. Verify the server is accessible at:

   ```
   http://localhost:3000
   ```

---

### 5. Run bft-map

1. Navigate to the `bft-map` directory:

   ```bash
   cd bft-map
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the Next.js application:

   ```bash
   npm run dev
   ```
4. Access the web map at:

   ```
   http://localhost:3001
   ```

---

### 6. Run bft-monitoring-app

1. Navigate to the `bft-monitoring-app` directory:

   ```bash
   cd bft-monitoring-app
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the monitoring application:

   ```bash
   npm run dev
   ```
4. Access the application at:

   ```
   http://localhost:3000
   ```

---

## Notes

* Make sure `.env` files for each component are properly configured.
* Use **separate terminals** for each service (dummy server, backend, map, monitoring app).
* If you make code changes, restart the relevant service.
* You can view dummy device logs in the terminal where `dummyServer.js` is running.

---

## Troubleshooting

| Issue                                | Possible Solution                                                  |
| ------------------------------------ | ------------------------------------------------------------------ |
| **MapTiler Server not loading maps** | Check if the server is running and accessible on your network.     |
| **Backend connection failed**        | Verify MongoDB is running and `.env` has the correct database URI. |
| **WebSocket not updating devices**   | Ensure the dummy server is running before starting the backend.    |
| **Frontend display issues**          | Clear your browser cache and restart the development server.       |

---

## License

This project is licensed under [Your License].
