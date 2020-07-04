const { Router } = require('express');
const resolve = require("../api/resolve");
const ROLES = require("../constants/roles");
const { authenticate, deauthenticate, authorize } = require("../security/auth");
const { validateBusDriverCredentials, insertBusDriver, selectAllBusDriver } = require("../services/busDriver");

const router = Router();

/**
 * POST
 * /api/v1/bus-drivers/sign-in
 */
router.post("/sign-in", (req, res) => {
  const credentials = req.body;
  validateBusDriverCredentials(credentials, (error, driver) => {
    let session = null;
    if (!error) {
      session = {
        _id: driver._id,
        citizenId: driver.citizenId,
        name: driver.name,
        lastName: driver.lastName,
        route: driver.route
      };
      authenticate(res, ROLES.DRIVER, session);
    }
    resolve(req, res)(error, session);
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
 * Auth [ADMIN]
 */
router.post("/insert", authorize(ROLES.ADMIN), (req, res) => {
  const data = req.body;
  insertBusDriver(data, resolve(req, res));
});

/**
 * GET
 * /api/v1/bus-drivers/all
 * Auth [ADMIN]
 */
router.get("/all", authorize(ROLES.ADMIN), (req, res) => {
  selectAllBusDriver(resolve(req, res));
});

module.exports = router;