const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    speed: { type: Number, default: 0 },
    direction: { type: Number, default: 0 },
    status: { type:String, default: "active" },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Device', deviceSchema);
