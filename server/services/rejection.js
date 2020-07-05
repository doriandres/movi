const Rejection = require("../models/Rejection");
const exception = require("../errors/exception");

/**
 * Inserts a rejection
 * @param {Object} data Rejection data
 * @param {(error: Error|null, busDriver: Object) => void} callback callback
 */
function insertRejection(data, callback) {
  const rejection = new Rejection(data);
  rejection.save()
    .then(result => callback(null, result))
    .catch(error => callback(exception(error)));
}

/**
 * Retrieves all rejections associated with a driver
 * @param {String} id Driver id
 * @param {(error: Error|null, customers: Object[]) => void} callback callback
 */
function selectRejectionsByDriverId(id, callback) {
  Rejection
    .find({ driver: id })
    .populate('route')
    .populate({ path: 'customer', select: '-password -cardCsv' })
    .populate({ path: 'driver', select: '-password' })
    .sort('-date')
    .exec((error, results) => {
      if (error) {
        return callback(exception(error));
      }
      return callback(null, results);
    });
}

module.exports = {
  insertRejection,
  selectRejectionsByDriverId,
}