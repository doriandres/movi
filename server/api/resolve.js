/**
 * Offers an standarized way to resolve api requests
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @returns { (error: object, data: any) => void }
 */
function resolve(req, res) {
  return (error, data) => {
    if (error) {
      res.status(error.code);
      res.json({ error: error.message });
    } else {
      res.status(200);
      res.json({ result: data });
    }
  };
}
module.exports = resolve;