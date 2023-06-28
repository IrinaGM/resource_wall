/*
 * All routes for Login are defined here
 * Since this file is loaded in server.js into login,
 *   these routes are mounted onto /login
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
    // check if user already logged in by checking if cookie user_id exists
    if (req.session.user_id) {
      res.redirect("/");
      return;
    }

    res.render("login", { user: null });
});


router.post('/',(req, res) => {
  // set user email and password if they exist, if not set them to null
  const email = req.body.email ? req.body.email : null;
  const password = req.body.password ? req.body.password : null;

   // show error if email and/or passord were not provided
  if (email === null || password === null) {
    res.status(400).send("Please provide email and password");
    return;
  }

  // check if user exists in DB, if not userData will be null
  userQueries.getUserWithEmail(req.body.email)
    .then((userData) => {
      if (!userData) {
        res.status(403).send("Email cannot be found");
        return;
      }

      // if user exists but the passwords don't match, return error
      if (password !== userData.password) {
        res.status(403).send("Password does not match for that email account");
        return;
      }

      // set up signed cookie with the user id retrieved from users DB
      req.session.user_id = userData.id;
      res.redirect("/");
    })
    .catch((err) => {
    console.log(err.message);
  });

});



module.exports = router;

