const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  //altitude: { type: Number, default: 0 },
  //speed: { type: Number, default: 0 },
 // direction: { type: Number, default: 0 },
 // status: { type: String, enum: ["active", "idle", "offline"], default: "active" },
  //battery: { type: Number, default: 100 },
  //signalStrength: { type: Number, default: -50 },
});


module.exports = mongoose.model("Device", DeviceSchema);
