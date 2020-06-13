const mongoose = require('mongoose');

const BusDriver = mongoose.model('BusDriver', {
  citizenId: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  route: {
    type: mongoose.Schema.Types.ObjectId, // Foreign Key
    ref: "BusRoute", // References BusRoute 
    required: true // Not null
  }
});

module.exports = BusDriver;