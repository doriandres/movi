const { Router } = require('express');
const resolve = require("../api/resolve");
const ROLES = require("../constants/roles");
const { authenticate, deauthenticate } = require("../security/auth");
const { validateBusDriverCredentials } = require("../services/busDriver");

const router = Router();

/**
 * POST
 * /api/v1/bus-drivers/sign-in
 */
router.post("/sign-in", (req, res) => {
  const credentials = req.body;
  validateBusDriverCredentials(credentials, (error, user) => {
    if (!error) {
      authenticate(res, ROLES.DRIVER, user);
    }
    resolve(req, res)(error, user);
  });
});

/**
 * POST
 * /api/v1/bus-drivers/sign-out
 */
router.post("/sign-out", (req, res) => {
  deauthenticate(res, ROLES.DRIVER);
  resolve(req, res)(null, true);
});

module.exports = router;