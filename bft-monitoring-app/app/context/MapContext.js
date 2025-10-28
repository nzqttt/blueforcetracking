"use client";
import { createContext, useContext, useState } from "react";

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [mapCenter, setMapCenter] = useState({
    lat: 3.1116757,
    lng: 101.5835147,
    accuracy: 100,
  });

  const [zoom, setZoom] = useState(13);

  return (
    <MapContext.Provider value={{ mapCenter, setMapCenter, zoom, setZoom }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const ctx = useContext(MapContext);
  if (!ctx) throw new Error("useMap must be used within a MapProvider");
  return ctx;
};
