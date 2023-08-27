/**
 * Module to manage configuration settings
 * @module config
 */
require('dotenv').config();
require('module-alias/register');

const server = require('@/src/app');

server;
