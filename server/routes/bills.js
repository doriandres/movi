const { Router } = require('express');
const resolve = require("./../api/resolve");
const ROLES = require("./../constants/roles");
const { authorize } = require("./../security/auth");
const { selectBillsByDriverId } = require('../services/bill');

const router = Router();

/**
 * POST
 * /api/v1/bills/driver/<driver_id>
 * AUTH [DRIVERS]
 */
router.post("/driver/:id", authorize(ROLES.DRIVER), (req, res) => {
  const { id } = req.params;
  selectBillsByDriverId(id, resolve(req, res));
});


module.exports = router;