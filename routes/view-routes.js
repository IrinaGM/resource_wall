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
      res.render("index", { resources, user_id: req.session.user_id });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// USER-STORY-04: Resource Page View
router.get('/resource', (req, res) => {
  resourceQueries.getResourcebyId(req.query.id)
    .then(resources => {
      const item = resources[0];
      res.render("resource", { item, user_id: req.session.user_id });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// USER-STORY-05: My Resources Page (loggedIn)
router.get('/my-resources', (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  }
  resourceQueries.getResourcesByUserId(req.session.user_id)
    .then(resources => {
      res.render("my-resources", { resources, user_id: req.session.user_id });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// USER-STORY-01: Add Resource Page (loggedIn)
router.get('/new-resource', (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  }
  resourceQueries.getResourcesByUserId(req.params.id)
    .then(resources => {
      res.render("new-resource", { resources, user_id: req.session.user_id });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
