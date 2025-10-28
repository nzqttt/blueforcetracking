const Device = require("../models/Device");

//keep track of last cache
let lastCacheUpdate = null; 

// GET all devices (used as cache)
exports.getDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get single cached device by ID
exports.getDeviceById = async (req, res) => {
  try{
    const { id } = req.params;
    const device = await Device.findOneOne({ id });
    
    if (!device) return res.status(404).json(
      { 
        error: "Device not found" 
      });
    res.json(device);
  } catch (err) {
    console.error("getDeviceById error:", err);
    res.status(500).json({ error: err.message });
  }
};

//update - testing
exports.updateDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const device = await Device.findOneAndUpdate(
      { id }, updates, { new: true }
    );

    if (!device) {
      return res.status(404).json({ error: "Device not found" });
    }

    res.json(device);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//check when DB cache was last updated
exports.getCacheStatus = async (req, res) => {
  try{
    const totalDevices = await Device.countDocuments();
    res.json({
      status: "ok",
      totalDevices,
      lastCacheUpdate,
    });
  }catch (err) {
    console.error("getCacheStatus error:", err);
    res.status(500).json({ error: err.message });
  }
  };

  exports.markCacheUpdated = () => {
    lastCacheUpdate = new Date();
  };  
