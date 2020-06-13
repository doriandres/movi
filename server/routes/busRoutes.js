const { Router } = require('express');
const resolve = require("./../api/resolve");
const ROLES = require("./../constants/roles");
const { authorize } = require("./../security/auth");
const { selectAllBusRoutes, insertBusRoute } = require("./../services/busRoute");

const router = Router();

/**
 * GET
 * /api/v1/bus-routes/all
 */
router.get("/all", authorize(ROLES.ADMIN), (req, res) => {
  selectAllBusRoutes(resolve(req, res));
});

/**
 * POST
 * /api/v1/bus-routes/insert
 */
router.post("/insert", authorize(ROLES.ADMIN), (req, res) => {
  const data = req.body;
  insertBusRoute(data, resolve(req, res));
});

module.exports = router;