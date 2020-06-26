/**
 * Creates an standarized exception object for the api
 * @param {Error|String} error Error details
 * @param {Number} code Http status code that should be use with the error
 */
function exception(error, code = 500) {
  return {
    error,
    message: typeof error === "string" ? error : error.message,
    code
  }
}

module.exports = exception;