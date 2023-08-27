const debug = require('debug');
const chalk = require('chalk');

/**
 * Logger functions for different log levels.
 * @module logger
 */

/**
 * Debug loggers for different log levels.
 * @type {Object}
 */
const loggers = {
    error: debug('app'),
    warn: debug('app'),
    info: debug('app'),
    success: debug('app'),
};

/**
 * Labels for different log levels.
 * @type {Object}
 */
const logLabels = {
    error: 'Error',
    warn: 'Warning',
    info: 'Info',
    success: 'Success',
};

/**
 * Colors for different log levels.
 * @type {Object}
 */
const logColors = {
    error: chalk.red,
    warn: chalk.yellow,
    info: chalk.blue,
    success: chalk.green,
};

/**
 * Create a log function for a specific log level.
 * @callback logFunction
 * @param {string} msg - Log message
 */

/**
 * Creates a log function for the specified log level.
 * @function createLogFunction
 * @param {string} type - Log level type
 * @returns {logFunction} A log function for the specified log level
 */
const createLogFunction = (type) => (msg) => {
    const label = logLabels[type];
    const color = logColors[type];

    // Convert the message to a string if it's an object
    const formattedMessage = typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg;

    // Format the log message manually
    const logMessage = `${chalk.cyanBright('-')} ${label}: ${color(formattedMessage)}`;
    loggers[type](logMessage);
};

/**
 * Logger function for error messages.
 * @function error
 * @type {logFunction}
 */
module.exports.error = createLogFunction('error');

/**
 * Logger function for warning messages.
 * @function warn
 * @type {logFunction}
 */
module.exports.warn = createLogFunction('warn');

/**
 * Logger function for information messages.
 * @function info
 * @type {logFunction}
 */
module.exports.info = createLogFunction('info');

/**
 * Logger function for success messages.
 * @function success
 * @type {logFunction}
 */
module.exports.success = createLogFunction('success');
