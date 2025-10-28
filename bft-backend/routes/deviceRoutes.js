const express = require("express");
const router = express.Router();
const {
  getDevices,
  getDeviceById,
  updateDevice,
  seedDevices,
  getCacheStatus,
} = require("../controllers/deviceController");

//fetch all devices when sokcet disconnected
router.get("/devices", getDevices);

//fetch single cached device
router.get("/devices/:id", getDeviceById);

//check when DB cache
router.get("/cache/status", getCacheStatus);

//------ for testing ------//
router.put("/devices/:id", updateDevice);

//router.put("/:id", updateDevice);

module.exports = router;
