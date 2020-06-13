const exception = require("./../errors/exception");
const Customer = require("./../models/Customer");

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

module.exports = {
  validateCustomerCredentials
};