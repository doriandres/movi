const exception = require("../errors/exception");
const BusRoute = require("./../models/BusRoute");

function insertBusRoute(data, callback) {
  const busRoute = new BusRoute(data);
  busRoute.save()
    .then(result => callback(null, result))
    .catch(error => callback(exception(error)));
}

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