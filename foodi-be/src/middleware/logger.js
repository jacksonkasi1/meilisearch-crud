/* eslint-disable no-undef */

/**
 * Middleware for logging HTTP request duration and status.
 * @module requestLogger
 */

/**
 * Calculate the duration in milliseconds from a start time.
 * @function getDurationInMilliseconds
 * @param {Array} start - Start time as [seconds, nanoseconds]
 * @returns {number} Duration in milliseconds
 */
const getDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

/**
 * Express middleware that logs request duration and status.
 * @function requestLoggerMiddleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Next middleware function
 */
module.exports = (req, res, next) => {
    const { method, originalUrl } = req;
    const timestamp = new Date().toLocaleString();
    const logPrefix = `[${timestamp}] 🕐 `;
    console.log(`${logPrefix}${method} ${originalUrl} [STARTED]`);
    const start = process.hrtime();

    const logFinished = (status) => {
        const durationInMilliseconds = getDurationInMilliseconds(start);
        const statusIcon = status === 'ERROR' ? '❌' : status === 'FINISHED' ? '✅' : 'ℹ️';
        console.log(`${logPrefix}${statusIcon} ${method} ${originalUrl} [${status}] ${durationInMilliseconds.toLocaleString()} ms`);
    };

    res.on('finish', () => logFinished('FINISHED'));
    res.on('close', () => logFinished('CLOSED'));
    res.on('error', () => logFinished('ERROR'));

    next();
};
