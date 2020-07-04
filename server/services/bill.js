const Bill = require("../models/Bill");
const exception = require("../errors/exception");

/**
 * Inserts a bill
 * @param {Object} data Bill data
 * @param {(error: Error|null, busDriver: Object) => void} callback callback
 */
function insertBill(data, callback) {
  const bill = new Bill(data);
  bill.save()
    .then(result => callback(null, result))
    .catch(error => callback(exception(error)));
}

/**
 * Retrieves all bills associated with a driver
 * @param {String} id Driver id
 * @param {(error: Error|null, customers: Object[]) => void} callback callback
 */
function selectBillsByDriverId(id, callback) {
  Bill
    .find({ driver: id })
    .populate('route')
    .populate({ path: 'customer', select: '-password' })
    .populate({ path: 'driver', select: '-password' })
    .exec((error, results) => {
      if (error) {
        return callback(exception(error));
      }
      return callback(null, results);
    });
}

module.exports = {
  insertBill,
  selectBillsByDriverId,
}