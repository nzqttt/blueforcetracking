"use client";
import { useState, useEffect } from "react";
import styles from "./Device.module.css";
import { useDevices } from "@context/DeviceContext";
import { useMap } from "@context/MapContext";
import { MdArrowBackIos } from "react-icons/md";

export default function DevicePanel() {
  const { devices } = useDevices();
  const { setMapCenter } = useMap();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [address, setAddress] = useState("");

  // ✅ Filter using `id` (actual property from your backend)
  const filteredDevices = devices.filter((device) =>
    (device.id || device._id || "").toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  useEffect(() => {
    if (!selectedDevice) return;

    const latitude = Number(selectedDevice.latitude);
    const longitude = Number(selectedDevice.longitude);

    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.display_name) setAddress(data.display_name);
      });

    setMapCenter({ lat: latitude, lng: longitude, accuracy: 100 });

    //send to bft map
    const iframe = document.getElementById("bft-map-iframe");
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        {
          type: "FLY_TO_DEVICE",
          payload: { lat: latitude, lng: longitude },
        },
        "*"
      );
    }
  }, [selectedDevice, setMapCenter]);

  return (
    <div className={styles.panel}>
      {!selectedDevice ? (
        <>
          <div className={styles.searchHeader}>
            <h2>Find Devices</h2>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search devices by ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.deviceList}>
            {filteredDevices.map((device) => (
              <div
                key={device.id}
                className={styles.deviceItem}
                onClick={() => setSelectedDevice(device)}
              >
                <strong>{device.name || device.id}</strong>
                <div className={styles.meta}>
                  Last updated:{" "}
                  {new Date(device.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className={styles.details}>
          <div className={styles.detailsHeader}>
            <button
              className={styles.backButton}
              onClick={() => setSelectedDevice(null)}
            >
              <MdArrowBackIos size={20} />
            </button>

            <h3>{selectedDevice.name || selectedDevice.id}</h3>
          </div>

          <div className={styles.imageSection}>
            <img
              src="/icons/device-placeholder.png"
              alt="device"
              className={styles.deviceImage}
            />
          </div>

          <div className={styles.infoSection}>
            <p>
              <strong>Address:</strong> {address || "Resolving..."}
            </p>
            <p>
              <strong>Latitude:</strong> {selectedDevice.latitude}
            </p>
            <p>
              <strong>Longitude:</strong> {selectedDevice.longitude}
            </p>
            <p>
              <strong>Last Updated:</strong>{" "}
              {new Date(selectedDevice.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
