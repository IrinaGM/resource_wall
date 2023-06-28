/*
 * All routes for Resource Data are defined here
 * Since this file is loaded in server.js into api/resources,
 *   these routes are mounted onto /api/resoucres
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const resourceQueries = require('../db/queries/resources');

/*
 * All the GET goes here
 */
//api to get all resources
router.get('/', (req, res) => {
  resourceQueries.getAllResources()
    .then(resources => {
      res.json({ resources });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

/*
 * All the POST goes here
 */
// USER-STORY-01: Add New Resource
router.post('/add', (req, res) => {
  const { title, url, description, options } = req.body;
  const user_id = req.session.user_id;

  resourceQueries.postResourceByUserId(title, url, description, options, user_id)
    .then(resources => {
      console.log(resources)
    })
    .catch(err => {
      res.status(400).send(err);
    })
    res.redirect("/my-resources");
});

//api to update a resource

router.post("/:id/edit", (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    return res.send({ error: "Please log in!" });
  }
  const updatedResource = req.body;
  updatedResource.user_id = userId;
  updatedResource.resource_id = req.params.id;
  resourceQueries
    .updateResource(updatedResource)
    .then((resource) => {
      res.json({ resource });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//api to add a new rating

router.post("/:id/ratings", (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    return res.send({ error: "Please log in!" });
  }
  const rating = req.body;
  rating.user_id = userId;
  rating.resource_id = req.params.id;
  resourceQueries
    .addRatings(rating)
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//api to add a new comment

router.post("/:id/comments", (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    return res.send({ error: "Please log in!" });
  }
  const comment = req.body;
  comment.user_id = userId;
  comment.resource_id = req.params.id;
  resourceQueries
    .addComments(comment)
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
