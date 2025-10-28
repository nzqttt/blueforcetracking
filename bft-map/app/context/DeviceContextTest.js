//websocket
"use client";
import { createContext, useContext, useEffect, useState } from "react";

const DeviceContext = createContext();

export function DeviceProvider({ children }) {
  const [position, setPosition] = useState(null);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.0.84:8080");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      socket.send(JSON.stringify({ type: "getPosition" }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPosition(data.position);
      console.log(data);
    };

    socket.onerror = (err) => console.error("WebSocket error:", err);
    socket.onclose = () => console.log("WebSocket closed");

    setWs(socket);
    return () => socket.close();
  }, []);

  return (
    <DeviceContext.Provider value={{ position, ws }}>
      {children}
    </DeviceContext.Provider>
  );
}

export const useDevices = () => useContext(DeviceContext);