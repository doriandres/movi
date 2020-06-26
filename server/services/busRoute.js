const exception = require("../errors/exception");
const BusRoute = require("./../models/BusRoute");

/**
 * Inserts a bus route
 * @param {Object} data bus route data
 * @param {(error: Error|null, busRoute: Object) => void} callback callback
 */
function insertBusRoute(data, callback) {
  const busRoute = new BusRoute(data);
  busRoute.save()
    .then(result => callback(null, result))
    .catch(error => callback(exception(error)));
}

/**
 * Retrieves all bus routes
 * @param {(error: Error|null, busRoutes: Object[]) => void} callback callback
 */
function selectAllBusRoutes(callback) {
  BusRoute.find({}, (error, results) => {
    if (error) {
      return callback(exception(error));
    }
    return callback(null, results);
  });
}

module.exports = {
  insertBusRoute,
  selectAllBusRoutes
};