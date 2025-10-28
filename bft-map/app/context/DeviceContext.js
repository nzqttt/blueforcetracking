"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const DeviceContext = createContext();

export function DeviceProvider({ children }) {
  const [devices, setDevices] = useState([]);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    let socket;
    let reconnectTimer;

    async function fetchFromDB() {
      try {
        console.log("Fetching devices from backend DB cache...");
        const res = await fetch("http://localhost:5000/api/devices");
        if (!res.ok) throw new Error("Failed to fetch cache from DB");
        const data = await res.json();
        setDevices(
          data.map((d) => ({
            device_id: d.id,
            latest: d.timestamp,
            latitude: d.latitude,
            longitude: d.longitude,
            timestamp: d.timestamp,
          }))
        );
        console.log("✅ Loaded", data.length, "devices from cache");
      } catch (err) {
        console.error("❌ Error fetching devices from DB cache:", err.message);
      }
    }

    function connectSocket() {
      socket = io("http://localhost:5000");

      socket.on("connect", () => {
        console.log("✅ Connected to backend Socket.IO", socket.id);
        setIsOffline(false);
      });

      socket.on("device-update", (data) => {
        if (data.type === "position") {
          setDevices((prev) => {
            const existing = prev.find((d) => d.device_id === data.device_id);
            if (existing) {
              return prev.map((d) =>
                d.device_id === data.device_id ? data : d
              );
            } else {
              return [...prev, data];
            }
          });
        } else if (data.type === "source-status") {
          if (data.status === "offline") {
            console.warn("⚠️ Data source went offline, fetching from DB cache...");
            setIsOffline(true);
            fetchFromDB();
          } else if (data.status === "online") {
            console.log("✅ Data source is back online");
            setIsOffline(false);
          }
        }
      });

      socket.on("disconnect", () => {
        console.log("⚠️ Socket disconnected, fetching from DB cache...");
        setIsOffline(true);
        fetchFromDB();

        reconnectTimer = setTimeout(connectSocket, 5000); 
      });

      socket.on("connect_error", (err) => {
        console.error("❌ Socket.IO connection error:", err.message);
        setIsOffline(true);
        fetchFromDB();

        reconnectTimer = setTimeout(connectSocket, 5000);
      });
    }

    connectSocket();

    return () => {
      if (socket) socket.disconnect();
      if (reconnectTimer) clearTimeout(reconnectTimer);
    };
  }, []);

  return (
    <DeviceContext.Provider value={{ devices, isOffline }}>
      {children}
    </DeviceContext.Provider>
  );
}

export const useDevices = () => useContext(DeviceContext);
