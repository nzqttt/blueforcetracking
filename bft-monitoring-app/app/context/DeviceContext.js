"use client";
import { createContext, useContext, useEffect, useState } from "react";

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);

  const fetchDevices = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/devices");
      if (!res.ok) throw new Error("Failed to fetch devices");

      const data = await res.json();
      //console.log("📡 Backend returned:", data); // ✅ debug log

      const normalized = Array.isArray(data) ? data : [data];
      setDevices(normalized);

    } catch (err) {
      console.error("❌ Failed to fetch devices:", err);
    }
  };

  useEffect(() => {
    fetchDevices();
    const interval = setInterval(fetchDevices, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DeviceContext.Provider value={{ devices, fetchDevices }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevices = () => {
  const ctx = useContext(DeviceContext);
  if (!ctx) throw new Error("useDevices must be used within a DeviceProvider");
  return ctx;
};
