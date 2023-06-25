const db = require('../connection');

const getTopics = () => {
  return db.query('SELECT * FROM topics;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getTopics };
