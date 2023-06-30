/*
 * All default routes for Data are defined here
 */

const express = require('express');
const router  = express.Router();
const resourceQueries = require('../db/queries/resources');
const userQueries = require('../db/queries/users');
const topicQueries = require('../db/queries/topics');

// Landing Page
router.get('/', (req, res) => {
  resourceQueries.getAllResources(req.query.topic)
    .then(resources => {
      userQueries.getUserWithId(req.session.user_id)
      .then((userData) => {
        topicQueries.getTopics()
        .then((topics) => {
          res.render("index", { resources, user: userData, topics, originUrl: req.path });
        })
      })
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
      resourceQueries.getUserRatingForResource(req.session.user_id, req.query.id)
      .then(ratings => {
        if(!ratings){
          ratings= {};
          ratings.rate=0;
          ratings.islike=0;
        }
        userQueries.getUserWithId(req.session.user_id)
        .then((userData) => {
          const item = resources[0];
          const rating = ratings;
          rating.isLike = ratings.islike==true?1:0;
          res.render("resource", { item, user: userData, rating });
        })
      })
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
  resourceQueries.getResourcesByUserId(req.session.user_id, req.query.topic)
    .then(resources => {
      userQueries.getUserWithId(req.session.user_id)
      .then((userData) => {
        topicQueries.getTopics()
        .then((topics) => {
        res.render("my-resources", { resources, user: userData, topics, originUrl: req.path });
        })
      })
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
      userQueries.getUserWithId(req.session.user_id)
      .then((userData) => {
        res.render("new-resource", { resources, user: userData });
      })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
