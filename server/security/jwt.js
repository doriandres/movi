const jwt = require('jsonwebtoken');
const SECRET = "=th12_12*4#2up3r%23cur3/23cr3t¡"

/**
 * Generates a JWT
 * @param {Object} data Data encrypted in the token
 * @returns {String} Json Web Token
 */
function generate(data) {
  return jwt.sign(data, SECRET, { expiresIn: '7d' });
}

/**
 * Verifies the validity of a JWT
 * @param {String} token Json Web Token
 * @param {(error: Error|null) => void} callback Callback
 */
function verify(token, callback) {
  jwt.verify(token, SECRET, callback);
}

module.exports = {
  generate,
  verify
};