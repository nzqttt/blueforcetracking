"use client";

export default function MapEmbed() {
  return (
    <iframe
      id="bft-map-iframe"
      src="http://localhost:3001"
      style={{ width: "100%", height: "100%", border: "none" }}
    />
  );
}
