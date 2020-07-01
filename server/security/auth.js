const { generate, verify } = require("./jwt");
const EXPIRATION_TIME = 604800000;

/**
 * Creates an jwt and stores it in a cookie using the given key
 * @param {Object} res express response object
 * @param {String} key cookie key for the token
 * @param {Object} data data to store in the token
 */
function authenticate(res, key, data) {
  const token = generate(data);
  res.cookie(key, token, { expires: new Date(Date.now() + EXPIRATION_TIME), secure: false, httpOnly: true, sameSite: 'None' });
}

/**
 * Deletes the jwt from the cookie according to the given key
 * @param {Object} res express response object
 * @param {String} key cookie key for the token
 */
function deauthenticate(res, key) {
  res.clearCookie(key);
}

/**
 * Creates an express middleware to filter access authorization
 * @param  {...String} roles Roles to authorize
 */
function authorize(...roles) {
  return (req, res, next) => {
    const tokens = roles.map(key => req.cookies[key]);

    if (!tokens.length) {
      res.status(401);
      return res.end();
    }

    const makeVerification = () => {
      verify(tokens.shift(), (error, data) => {
        if (error) {
          if (tokens.length) {
            makeVerification();
          } else {
            res.status(401);
            return res.json({ error });
          }
        } else {
          req.session = data;
          next();
        }
      });
    };
    makeVerification();
  };
}

module.exports = {
  authenticate,
  deauthenticate,
  authorize
};