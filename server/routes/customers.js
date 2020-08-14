const { Router } = require('express');
const resolve = require("./../api/resolve");
const ROLES = require("./../constants/roles");
const { authenticate, deauthenticate } = require("./../security/auth");
const { validateCustomerCredentials, selectAllCustomers, banCustomerById, insertCustomer, selectCustomerById, depositByCustomerId, selectAllInactiveCustomers, restoreCustomerById } = require("./../services/customer");
const { authorize } = require("./../security/auth");

const router = Router();

/**
 * POST
 * /api/v1/customers/sign-in
 */
router.post("/sign-in", (req, res) => {
  const credentials = req.body;
  validateCustomerCredentials(credentials, (error, customer) => {
    let session = null;
    if (!error) {
      session = {
        _id: customer._id,
        email: customer.email,
        code: customer.code,
        name: customer.name,
        lastName: customer.lastName,
      };
      authenticate(res, ROLES.CUSTOMER, session);
    }
    resolve(req, res)(error, session);
  });
});

/**
 * POST
 * /api/v1/customers/sign-up
 */
router.post("/sign-up", (req, res) => {
  const customerData = req.body;
  insertCustomer(customerData, (error, customer) => {
    let session = null;
    if (!error) {
      session = {
        _id: customer._id,
        email: customer.email,
        code: customer.code,
        name: customer.name,
        lastName: customer.lastName,
      };
      authenticate(res, ROLES.CUSTOMER, session);
    }
    resolve(req, res)(error, session);
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


/**
 * get
 * /api/v1/customers/all
 * AUTH [ADMIN]
 */
router.get("/all", authorize(ROLES.ADMIN), (req, res) => {
  selectAllCustomers(resolve(req, res));
});

/**
 * get
 * /api/v1/customers/all/inactive
 * AUTH [ADMIN]
 */
router.get("/all/inactive", authorize(ROLES.ADMIN), (req, res) => {
  selectAllInactiveCustomers(resolve(req, res));
});

/**
 * PUT
 * /api/v1/customers/ban/<customer_id>
 * AUTH [ADMIN]
 */
router.put("/ban/:id", authorize(ROLES.ADMIN), (req, res) => {
  const { id } = req.params;
  banCustomerById(id, resolve(req, res));
});

/**
 * PUT
 * /api/v1/customers/restore/<customer_id>
 * AUTH [ADMIN]
 */
router.put("/restore/:id", authorize(ROLES.ADMIN), (req, res) => {
  const { id } = req.params;
  restoreCustomerById(id, resolve(req, res));
});

/**
 * GET
 * /api/v1/customers/balance/<customer_id>
 * AUTH [CUSTOMER]
 */
router.get("/balance/:id", authorize(ROLES.CUSTOMER), (req, res) => {
  const { id } = req.params;

  if (id !== req.session._id) {
    res.status(401);
    return res.end();
  }

  selectCustomerById(id, (err, customer) => resolve(req, res)(err, customer && customer.balance));
});

/**
 * PUT
 * /api/v1/customers/deposit
 * AUTH [CUSTOMER]
 */
router.put("/deposit", authorize(ROLES.CUSTOMER), (req, res) => {
  const { customer, amount } = req.body;
  if (customer !== req.session._id) {
    res.status(401);
    return res.end();
  }
  depositByCustomerId(customer, amount, resolve(req, res));
});

module.exports = router;