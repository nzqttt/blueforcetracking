"use client"; // Ensures this context runs on the client side (required for hooks like useState)

import { createContext, useContext, useState } from "react";

const MapContext = createContext();

export const MapProvider = ({ children }) => {

  const [mapCenter, setMapCenter] = useState({
    lat: 3.111675729059102,
    lng: 101.58351471298828,
    accuracy: 100, 
  });

  const [zoom, setZoom] = useState(13);

  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <MapContext.Provider
      value={{ mapCenter, setMapCenter, zoom, setZoom, selectedMarker, setSelectedMarker }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);

  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }

  return context;
};
