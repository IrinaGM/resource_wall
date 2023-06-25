const db = require('../connection');

const getAllResources = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};
const getResourcesByUserId = (user_id, limit = 10) => {
  return db.query(`SELECT * FROM users WHERE id = $1 LIMIT $2;`, [user_id,limit])
    .then(data => {
      return data.rows;
    });
};
const getSpecificResourceByUserId= (resource_id, user_id) =>{
  return db.query(`SELECT * FROM users WHERE id = $1
 /* AND user_id = $2*/
  ;`, [resource_id])
    //, user_id])
    .then(data => {
      return data.rows;
    });
};
const getResourceByResourceId= (resource_id) =>{
  return db.query(`SELECT * FROM users WHERE id = $1;`, [resource_id])
    .then(data => {
      return data.rows;
    });
};
module.exports = { getAllResources,
                  getResourcesByUserId,
                  getSpecificResourceByUserId,
                  getResourceByResourceId
                 };
