const { MeiliSearch } = require('meilisearch');

const config = require('@/config');

const client = new MeiliSearch({
    host: config.MEILISEARCH_HOST,
    apiKey: config.MEILISEARCH_MASTER_KEY,
});

module.exports = client;
