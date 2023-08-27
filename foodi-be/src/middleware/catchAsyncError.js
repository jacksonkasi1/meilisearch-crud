/**
 * Handles asynchronous errors in Express routes.
 * @callback requestCallback
 * @param {function} fn - The asynchronous route handler function
 * @returns {function} Express middleware function
 */
const HttpStatus = require('http-status-codes');

module.exports = (fn) => (req, res, next) => {
    try {
        Promise.resolve(fn(req, res, next)).catch(next);
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' });
    }
};
