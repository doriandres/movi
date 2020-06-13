const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', {
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  status: { type: String, required: true },
  bornDate: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expirationMonth: { type: Number, required: true },
  expirationYear: { type: Number, required: true },
  cardCsv: { type: Number, required: true },
  balance: { type: Number, required: true },
});

module.exports = Customer;