const exception = require("./../errors/exception");
const Admin = require("./../models/Admin");

/**
 * Validates admin credentials
 * @param {Object} data crendentials data
 * @param {(error: Error|null) => void} callback Callback
 */
function validateAdminCredentials(data, callback) {
  const admin = new Admin(data);
  Admin.findOne({ username: admin.username }, (error, result) => {
    if (error) {
      return callback(exception(error));
    }
    if (!result) {
      return callback(exception("No existe un usuario administrador con ese nombre de usuario", 401));
    }
    if (result && result.password !== admin.password) {
      return callback(exception("La contraseña no coincide", 401));
    }

    delete result.password;
    return callback(null, result);
  });
}

module.exports = {
  validateAdminCredentials
};