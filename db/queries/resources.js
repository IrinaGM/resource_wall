const db = require('../connection');

// Check Input URL to includes HTTPS://
const checkHttp = (url) => {
  if (!url.startsWith("https://") && !url.startsWith("http://")) {
    return "https://" + url;
  }
  return url;
};

const getAllResources = () => {
  // define query
  const queryString = 'SELECT * FROM resources;';

  // query the db
  return db.query(queryString)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// USER-STORY-05: Get Resources by USER_ID
const getResourcesByUserId = (user_id) => {
  // define query
  const queryString = `SELECT * FROM resources WHERE user_id = $1;`;

  //define values
  const values = [user_id];

  // query the db
  return db.query(queryString, values)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getSpecificResourceByUserId= (resource_id, user_id) =>{
    // define query
    const queryString = `SELECT * FROM resources WHERE id = $1 AND user_id = $2;`;

    //define values
    const values = [resource_id, user_id];

  // query the db
  return db.query(queryString, values)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });

};

// USER-STORY-01: POST Data to Database
const postResourceByUserId = (title, url, description, options, user_id) => {
  // Query
  const queryString = `
  INSERT INTO resources (url, title, description, user_id, topic_id)
  VALUES ($1, $2, $3, $4, $5);
  `;

  // Variables
  const values = [checkHttp(url), title, description, user_id, options];

  return db.query(queryString, values)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports =
  {
    getAllResources,
    getResourcesByUserId,
    getSpecificResourceByUserId,
    postResourceByUserId
  };
