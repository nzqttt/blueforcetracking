"use client";

import { useEffect } from "react";
import MapEmbed from "@components/MapEmbed";

export default function HomePage() {
  useEffect(() => {
    const handleMapReady = (event) => {
      if (event.data?.type === "MAP_READY") {
        console.log("✅ Map is ready!");
        window.mapIsReady = true; // Global flag
      }
    };

    window.addEventListener("message", handleMapReady);
    return () => window.removeEventListener("message", handleMapReady);
  }, []);

  return (
    <div style={{ flex: 1, height: "100%" }}>
      <MapEmbed />
    </div>
  );
}
