const mongoose = require('mongoose');

const Rejection = mongoose.model('Rejection', {
  route: {
    type: mongoose.Schema.Types.ObjectId, // Foreign Key
    ref: "BusRoute", // References BusRoute 
    required: true // Not null
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId, // Foreign Key
    ref: "Customer", // References Customer 
    required: true // Not null
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId, // Foreign Key
    ref: "BusDriver", // References BusDriver 
    required: true // Not null
  },
  date: { type: Date, default: Date.now }
});

module.exports = Rejection;