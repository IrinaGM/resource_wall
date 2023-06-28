/*
 * All default routes for Data are defined here
 */

const express = require('express');
const router  = express.Router();
const resourceQueries = require('../db/queries/resources');

// Landing Page
router.get('/', (req, res) => {
  resourceQueries.getAllResources()
    .then(resources => {
      res.render("index", { resources });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// USER-STORY-05: My Resources Page (loggedIn)
router.get('/my-resources', (req, res) => {
  resourceQueries.getResourcesByUserId(req.session.user_id)
    .then(resources => {
      res.render("my-resources", { resources });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// USER-STORY-01: Add Resource Page (loggedIn)
router.get('/new-resource', (req, res) => {
  resourceQueries.getResourcesByUserId(req.params.id)
    .then(resources => {
      res.render("new-resource", { resources });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
