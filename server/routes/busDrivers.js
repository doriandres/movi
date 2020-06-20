const { Router } = require('express');
const resolve = require("../api/resolve");
const ROLES = require("../constants/roles");
const { authenticate, deauthenticate, authorize } = require("../security/auth");
const { validateBusDriverCredentials, insertBusDriver } = require("../services/busDriver");

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

/**
 * POST
 * /api/v1/bus-drivers/insert
 */
router.post("/insert", authorize(ROLES.ADMIN), (req, res) => {
  const data = req.body;
  insertBusDriver(data, resolve(req, res));
});

module.exports = router;