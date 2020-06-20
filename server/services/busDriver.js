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

function insertBusDriver(data, callback) {
  const busDriver = new BusDriver(data);
  busDriver.save()
    .then(result => callback(null, result))
    .catch(error => {
      if (error.name === 'MongoError' && error.code === 11000) {
        callback(exception("Ya existe un conductor registrado con esa cédula", 422));
      } else {
        callback(exception(error));
      }
    });
}


module.exports = {
  validateBusDriverCredentials,
  insertBusDriver
};