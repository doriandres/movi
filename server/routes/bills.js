const { Router } = require('express');
const resolve = require("./../api/resolve");
const ROLES = require("./../constants/roles");
const { authorize } = require("./../security/auth");
const { selectBillsByDriverId, processCheckout } = require('../services/bill');

const router = Router();

/**
 * GET
 * /api/v1/bills/driver/<driver_id>
 * AUTH [DRIVERS]
 */
router.get("/driver/:id", authorize(ROLES.DRIVER), (req, res) => {
  const { id } = req.params;
  selectBillsByDriverId(id, resolve(req, res));
});

/**
 * POST
 * /api/v1/bills/checkout
 * AUTH [DRIVERS]
 */
router.post('/checkout', authorize(ROLES.DRIVER), (req, res) => {
  processCheckout(req.body, resolve(req, res));
});


module.exports = router;