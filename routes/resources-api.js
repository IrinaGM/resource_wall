/*
 * All routes for Resource Data are defined here
 * Since this file is loaded in server.js into api/resources,
 *   these routes are mounted onto /api/resoucres
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const resourceQueries = require('../db/queries/resources');

//api to get all resources
router.get('/api', (req, res) => {
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

//api to get resources only for the loggedIn user

// My Resources Page (loggedIn)
router.get('/myresources', (req, res) => {
  resourceQueries.getResourcesByUserId(req.params.id)
    .then(resources => {
      res.render("myresources", { resources });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/users/:id', (req, res) => {
 // req.session.userId = req.params.id;
  const userId = req.params.id;
  if (!userId) {
    return res.send({ error: "Please log in!" });
  }
  resourceQueries.getResourcesByUserId(userId)
    .then(resources => {
      res.json({ resources });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//api to get a specific resource for the loggedIn user

router.get('/:id/users/:user_id', (req, res) => {
    // req.session.userId = req.params.id;
    console.log(req.params);
   const userId = req.params.user_id;
   const resource_id = req.params.id;
   if (!userId) {
     return res.send({ error: "Please log in!" });
   }
   resourceQueries.getSpecificResourceByUserId(resource_id, userId)
     .then(resources => {
       res.json({ resources });
     })
     .catch(err => {
       res
         .status(500)
         .json({ error: err.message });
     });
 });
module.exports = router;
