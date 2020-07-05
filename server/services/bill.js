const Bill = require("../models/Bill");
const exception = require("../errors/exception");
const { promisify } = require("util")
const { selectCustomerByCode } = require("./customer");
const { selectBusDriverById } = require("./busDriver");
const { insertRejection } = require("./rejection");

/**
 * Processes a checkout
 * @param {Object} bill bill data
 * @param {(error: Error|null) => void} callback Callback
 */
function processCheckout(bill, callback) {
  // This allows to run multiple async processes at once
  Promise.all([
    // Find the customer
    promisify(selectCustomerByCode)(bill.customer),
    // Find the driver
    promisify(selectBusDriverById)(bill.driver),
  ])
    .then(([customer, driver]) => {
      // If driver has no route
      if (!driver.route) {
        return callback(exception("El conductor no tiene una ruta asignada", 401));
      }

      // If customer has not enough balance
      if (customer.balance < driver.route.cost) {
        insertRejection({
          customer: customer._id,
          driver: driver._id,
          route: driver.route._id
        },
          () => callback(exception("El usuario no cuenta con suficientes fondos", 401))
        );
      } else {
        // If the user has enough balance
        // Withdraw it
        customer.balance -= driver.route.cost;
        // Update the user
        customer.save()
          .then(() => insertBill({
            cost: driver.route.cost,
            customer: customer._id,
            driver: driver._id,
            route: driver.route._id
          },
            () => callback(null) // All good
          ))
          .catch(error => callback(error)) // In case any error happens while making the update
      }
    })
    .catch(error => callback(error)) // In case any error happens while requesting data
}

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
  insertBill,
  selectBillsByDriverId,
  processCheckout
}