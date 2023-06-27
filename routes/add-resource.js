/*
 * Add resource are defined here
 */
const express = require('express');
const router  = express.Router();
const resourceQueries = require('../db/queries/resources');

// My Resources Page (loggedIn)
router.get('/', (req, res) => {
  resourceQueries.getResourcesByUserId(req.params.id)
    .then(resources => {
      res.render("add-resource", { resources });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
