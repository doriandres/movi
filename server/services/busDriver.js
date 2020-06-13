const exception = require("../errors/exception");
const BusDriver = require("../models/BusDriver");

function validateBusDriverCredentials(data, callback) {
  const busDriver = new BusDriver(data);
  BusDriver.findOne({ citizenId: busDriver.citizenId }, (error, result) => {
    if (error) {
      return callback(exception(error));
    }

    if (!result) {
      return callback(exception("No existe un conductor con ese número de cédula", 401));
    }

    if (result && result.password !== busDriver.password) {
      return callback(exception("La contraseña no coincide", 401));
    }

    delete result.password;
    return callback(null, result);
  });
}

module.exports = {
  validateBusDriverCredentials,
};