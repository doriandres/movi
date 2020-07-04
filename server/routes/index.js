module.exports = {
  // api path is defined using the object key name

  // api/v1/admin
  "admin": require("./admin"),

  // api/v1/customers
  "customers": require("./customers"),

  // api/v1/bus-routes
  "bus-routes": require("./busRoutes"),

  // api/v1/bus-drivers
  "bus-drivers": require("./busDrivers"),

  // api/v1/bills
  "bills": require("./bills"),

  // api/v1/rejections
  "rejections": require("./rejections"),
};