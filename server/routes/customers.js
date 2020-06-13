const { Router } = require('express');
const resolve = require("./../api/resolve");
const ROLES = require("./../constants/roles");
const { authenticate, deauthenticate } = require("./../security/auth");
const { validateCustomerCredentials } = require("./../services/customer");

const router = Router();

/**
 * POST
 * /api/v1/customers/sign-in
 */
router.post("/sign-in", (req, res) => {
  const credentials = req.body;
  validateCustomerCredentials(credentials, (error, user) => {
    if (!error) {
      authenticate(res, ROLES.CUSTOMER, user);
    }
    resolve(req, res)(error, user);
  });
});


/**
 * POST
 * /api/v1/customers/sign-out
 */
router.post("/sign-out", (req, res) => {
  deauthenticate(res, ROLES.CUSTOMER);
  resolve(req, res)(null, true);
});

module.exports = router;