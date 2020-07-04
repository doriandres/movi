const exception = require("./../errors/exception");
const Customer = require("./../models/Customer");

/**
 * Validates customer credentials
 * @param {Object} data customer credential data
 * @param {(error: Error|null, customer: Object) => void} callback callback
 */
function validateCustomerCredentials(data, callback) {
  const customer = new Customer(data);
  Customer.findOne({ email: customer.email }, (error, result) => {
    if (error) {
      return callback(exception(error));
    }

    if (!result) {
      return callback(exception("No existe un usuario con ese correo electrónico", 401));
    }

    if (result && result.status === "pending") {
      return callback(exception("El usuario ha sido deshabilitado", 401));
    }

    if (result && result.password !== customer.password) {
      return callback(exception("La contraseña no coincide", 401));
    }

    delete result.password;
    return callback(null, result);
  });
}

/**
 * Inserts a customer
 * @param {Object} data Customer data
 * @param {(error: Error|null, busDriver: Object) => void} callback callback
 */
function insertCustomer(data, callback) {
  const customer = new Customer({ ...data, code: new Date().getTime().toString(36) });
  customer.save()
    .then(result => callback(null, result))
    .catch(error => {
      if (error.name === 'MongoError' && error.code === 11000) {
        callback(exception("Ya existe un usuarios registrado con ese correo electrónico", 422));
      } else {
        callback(exception(error));
      }
    });
}

/**
 * Retrieves all customers
 * @param {(error: Error|null, customers: Object[]) => void} callback callback
 */
function selectAllCustomers(callback) {
  Customer.find({}, '-password', (error, results) => {
    if (error) {
      return callback(exception(error));
    }
    return callback(null, results);
  });
}

module.exports = {
  validateCustomerCredentials,
  insertCustomer,
  selectAllCustomers
};