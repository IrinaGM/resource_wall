/*
 * All routes for Logout are defined here
 * Since this file is loaded in server.js into logout,
 *   these routes are mounted onto /logout
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// route for logout functionality, clears the user_id cookie and redirects the user back to the /login page
router.get('/', (req, res) => {
  req.session = null;
  res.redirect("/login");
});

module.exports = router;
