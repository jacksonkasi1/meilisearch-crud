/* eslint-disable no-undef */

/**
 * Configuration object containing various settings
 * @typedef {Object} Config
 * @property {string} DATABASE_URL - Database URL
 * @property {string} MEILISEARCH_HOST - Meilisearch host URL
 * @property {string} MEILISEARCH_MASTER_KEY - Meilisearch master key
 */

/**
 * Configuration object with settings retrieved from environment variables
 * @type {Config}
 */

const config = {
    DATABASE_URL: process.env.DATABASE_URL,
    MEILISEARCH_HOST: process.env.MEILISEARCH_HOST,
    MEILISEARCH_MASTER_KEY : process.env.MEILISEARCH_MASTER_KEY
};

module.exports = config;
