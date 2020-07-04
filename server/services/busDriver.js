const exception = require("../errors/exception");
const BusDriver = require("../models/BusDriver");

/**
 * Validates bus driver credentials
 * @param {Object} data credentials data
 * @param {(error: Error|null) => void} callback callback
 */
function validateBusDriverCredentials(data, callback) {
  const busDriver = new BusDriver(data);
  BusDriver
    .findOne({ citizenId: busDriver.citizenId })
    .populate('route')
    .exec((error, result) => {
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

/**
 * Inserts a bus driver
 * @param {Object} data Bus driver data
 * @param {(error: Error|null, busDriver: Object) => void} callback callback
 */
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

/**
 * Retrieves all the bus drivers
 * @param {(error: Error|null, busDrivers: Object[]) => void} callback callback
 */
function selectAllBusDriver(callback) {
  BusDriver.find({}).populate('route').exec((error, results) => {
    if (error) {
      return callback(exception(error));
    }
    return callback(null, results);
  })
}

/**
 * Select a driver by its id
 * @param {String} id Driver id
 * @param {(error: Error|null, driver: Object) => void} callback callback
 */
function selectBusDriverById(id, callback) {
  BusDriver.findById(id)
    .populate('route')
    .exec((error, driver) => {
      if (error) {
        return callback(exception(error));
      }
      if (!driver) {
        return callback(exception("El conductor no existe", 401));
      }

      callback(null, driver);
    });
}

module.exports = {
  validateBusDriverCredentials,
  insertBusDriver,
  selectAllBusDriver,
  selectBusDriverById
};