const Device = require('./models/Device');

const simulateMovement = async () => {
    const devices = await Device.find({status: "active"});

    for (const device of devices) {
        const latDrift = (Math.random() - 0.5) * 0.0002;
        const lngDrift = (Math.random() - 0.5) * 0.0002;
        const newLat = device.latitude + latDrift;
        const newLng = device.longitude + lngDrift;
        const newSpeed = Math.max(0, device.speed + (Math.random() - 0.5) * 10);
        const newDirection = (device.direction + Math.floor(Math.random() * 10)) % 360;
        const newTimestamp = new Date();
    
        await Device.findByIdAndUpdate(device._id, {
          latitude: newLat,
          longitude: newLng,
          speed: newSpeed,
          direction: newDirection,
          timestamp: newTimestamp,
        });
      }
    };

    module.exports = simulateMovement;