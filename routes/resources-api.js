/*
 * All routes for Resource Data are defined here
 * Since this file is loaded in server.js into api/resources,
 *   these routes are mounted onto /api/resoucres
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const resourceQueries = require("../db/queries/resources");

//api to get all resources
router.get("/", (req, res) => {
  resourceQueries
    .getAllResources()
    .then((resources) => {
      res.json({ resources });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
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

//api to get resources only for the loggedIn user
router.get('/users/:id', (req, res) => {
 // req.session.userId = req.params.id;
  const userId = req.params.id;
  if (!userId) {
    return res.send({ error: "Please log in!" });
  }
  resourceQueries
    .getResourcesByUserId(userId)
    .then((resources) => {
      res.json({ resources });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//api to get a specific resource for the loggedIn user

router.get("/:id/users/:user_id", (req, res) => {
  const userId = req.params.user_id;
  const resource_id = req.params.id;
  if (!userId) {
    return res.send({ error: "Please log in!" });
  }
  resourceQueries
    .getSpecificResourceByUserId(resource_id, userId)
    .then((resources) => {
      res.json({ resources });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//api to get a specific resource for the guest

router.get("/:id", (req, res) => {
  const resource_id = req.params.id; //get resource id passed a parameter in the URL
  resourceQueries
    .getResourceByResourceId(resource_id)
    .then((resources) => {
      res.json({ resources });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//api to add a new resource

router.post("/users/:id", (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.send({ error: "Please log in!" });
  }
  const newResource = req.body; 
  newResource.user_id = userId;
  resourceQueries
    .addResource(newResource, userId)
    .then((resource) => {
      res.json({ resource });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//api to update a resource

router.post("/:id/users/:user_id", (req, res) => {
  const userId = req.params.user_id;
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

router.post("/:id/users/:user_id/ratings", (req, res) => {
  const userId = req.params.user_id;
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

router.post("/:id/users/:user_id/comments", (req, res) => {
  const userId = req.params.user_id;
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
