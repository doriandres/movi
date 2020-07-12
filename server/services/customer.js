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
 * @param {(error: Error|null, customer: Object) => void} callback callback
 */
function insertCustomer(data, callback) {
  const customer = new Customer({ ...data, status: 'active', balance: 0, code: new Date().getTime().toString(36) });
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
  Customer.find({ status: 'active' }, '-password -cardCsv', (error, results) => {
    if (error) {
      return callback(exception(error));
    }
    return callback(null, results);
  });
}

/**
 * Select a customer by its code
 * @param {String} code Customer code
 * @param {(error: Error|null, customer: Object) => void} callback callback
 */
function selectCustomerByCode(code, callback) {
  Customer.findOne({ code: code, status: 'active' }, (error, customer) => {
    if (error) {
      return callback(exception(error));
    }
    if (!customer) {
      return callback(exception("El usuario no existe o no está activo", 401));
    }
    callback(null, customer);
  });
}

/**
 * Select a customer by its id
 * @param {String} id Customer code
 * @param {(error: Error|null, customer: Object) => void} callback callback
 */
function selectCustomerById(id, callback) {
  Customer.findById(id, (error, customer) => {
    if (error) {
      return callback(exception(error));
    }
    if (!customer) {
      return callback(exception("El usuario no existe o no está activo", 401));
    }
    callback(null, customer);
  });
}

/**
 * Bans a customer
 * @param {String} id Customer ID
 * @param {(error: Error, result: Boolean) => void} callback Callback
 */
function banCustomerById(id, callback) {
  Customer.updateOne({ _id: id }, { $set: { status: 'inactive' } }, error => {
    if (error) {
      return callback(exception(error));
    }
    return callback(null, true);
  });
}

/**
 * Increases customer balance
 * @param {String} id Customer ID
 * @param {Number} amount Amount to deposit
 * @param {(error: Error, result: Boolean) => void} callback Callback
 */
function depositByCustomerId(id, amount, callback) {
  selectCustomerById(id, (err, customer) => {
    if (err) {
      return callback(err);
    }
    Customer.updateOne({ _id: id }, { $set: { balance: customer.balance + amount } }, error => {
      if (error) {
        return callback(exception(error));
      }
      return callback(null, true);
    });
  });
}

module.exports = {
  validateCustomerCredentials,
  insertCustomer,
  selectAllCustomers,
  selectCustomerByCode,
  banCustomerById,
  selectCustomerById,
  depositByCustomerId
};