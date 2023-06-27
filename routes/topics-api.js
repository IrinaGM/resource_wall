/*
 * All routes for resource topics are defined here
 * Since this file is loaded in server.js into api/topics,
 *   these routes are mounted onto /api/topics
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const topicQueries = require('../db/queries/topics');

router.get('/', (req, res) => {
  topicQueries.getTopics()
    .then(topics => {
      res.json({ topics });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
