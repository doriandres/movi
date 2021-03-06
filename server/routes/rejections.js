const { Router } = require('express');
const resolve = require("./../api/resolve");
const ROLES = require("./../constants/roles");
const { authorize } = require("./../security/auth");
const { selectRejectionsByDriverId } = require('../services/rejection');

const router = Router();

/**
 * GET
 * /api/v1/rejections/driver/<driver_id>
 * AUTH [DRIVERS]
 */
router.get("/driver/:id", authorize(ROLES.DRIVER), (req, res) => {
  const { id } = req.params;
  selectRejectionsByDriverId(id, resolve(req, res));
});


module.exports = router;