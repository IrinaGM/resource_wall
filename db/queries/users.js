const db = require('../connection');

/**
 * Get all users from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUsers = function () {
  // define query
  const queryString = `
    SELECT *
    FROM users
    `;

  // query the db
  return db.query(queryString)
    .then((result) => {
      if (!result.rows) {
        return null;
      }
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  // define query
  const queryString = `
    SELECT *
    FROM users
    WHERE email = $1;
    `;

  // define values
  const values = [email];

  // query the db
  return db.query(queryString, values)
    .then((result) => {
      if (!result.rows[0]) {
        return null;
      }
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Get a single user from the database given their id.
 * @param {String} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  // define query
  const queryString = `
    SELECT *
    FROM users
    WHERE id = $1;
      `;

  // define values
  const values = [id];

  // query the db
  return db.query(queryString, values)
    .then((result) => {
      if (!result.rows[0]) {
        return null;
      }
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getUsers, getUserWithEmail, getUserWithId };
