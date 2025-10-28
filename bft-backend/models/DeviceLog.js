const mongoose = require('mongoose');

const DeviceLogSchema = new mongoose.Schema({
    device_id: String,
    latitude: Number,
    longitude: Number,
    timestamp: { type: Date, default: Date.now },
    session_date: { type: String }, // e.g. "2025-10-23"
});

module.exports = mongoose.model('DeviceLog', DeviceLogSchema);