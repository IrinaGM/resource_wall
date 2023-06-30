const db = require('../connection');

/**
 * Get a all topics from the database
 * @return {Promise<{}>} A promise to list of topics.
 */
const getTopics = () => {
  // define query
  const queryString = `
    SELECT *
    FROM topics;
  `;

  // query the db
  return db.query(queryString)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getTopics };
