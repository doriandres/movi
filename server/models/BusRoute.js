const mongoose = require('mongoose');

const BusRoute = mongoose.model('BusRoute', {
  name: { type: String, required: true },
  code: { type: String, unique: true, required: true },
  cost: { type: Number, required: true },
  province: { type: String, required: true },
  canton: { type: String, required: true },
});

module.exports = BusRoute;