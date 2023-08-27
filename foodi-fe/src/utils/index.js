const { MeiliSearch } = require("meilisearch");

export const client = new MeiliSearch({
  host: process.env.REACT_APP_MEILISEARCH_HOST,
  apiKey: process.env.REACT_APP_MEILISEARCH_MASTER_KEY,
});
