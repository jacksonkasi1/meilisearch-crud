/**
 * Import required libraries and modules
 */
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

/**
 * Import custom modules
 */
const connectDB = require('./db');
const route = require('./routes');
const getLog = require('./middleware/logger');

/**
 * Initialize the Express app
 */
const app = express();

/**
 * Set the port for the server
 */
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

/**
 * Middleware setup
 */
app.use(cookieParser());
app.use(cors());

// Parse application/x-www-form-urlencoded and application/json requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

/**
 * Connect to the database
 */
connectDB();

/**
 * Apply custom middleware
 */
app.use(getLog);

// ** Default route **

// Specific route for the default page
app.get('/', (req, res) => {
    res.status(404).sendFile('welcome.html', { root: 'public' });
});

/**
 * Apply routes
 */
app.use('/api', route);

// Catch-all route for handling 404
app.all('*', (req, res) => {
    res.status(404).sendFile('404.html', { root: 'public' });
});

/**
 * Start the server
 */
const server = app.listen(PORT, () => {
    console.log(`
    🚀 Server listening on port ${PORT} \n
    ⚡ http://localhost:${PORT}
    `);
});

/**
 * Export the server instance
 */
module.exports = server;
