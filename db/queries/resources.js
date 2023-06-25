const db = require('../connection');

const getAllResources = () => {
  return db.query('SELECT * FROM resources;')
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
const getResourcesByUserId = (user_id, limit = 10) => {
  return db.query(`SELECT * FROM users WHERE id = $1 LIMIT $2;`, [user_id,limit])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
const getSpecificResourceByUserId= (resource_id, user_id) =>{
  return db.query(`SELECT * FROM users WHERE id = $1
 /* AND user_id = $2*/
  ;`, [resource_id])
    //, user_id])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
const getResourceByResourceId= (resource_id) =>{
  return db.query(`SELECT * FROM resources WHERE id = $1;`, [resource_id])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
const addResource= (resource, user_id) =>{
  return db.query(`INSERT INTO resources (url, title, description, user_id, topic_id)
  VALUES ($1, $2, $3, $4, $5) RETURNING *`,
  //['https://javascript.info/', 'The Modern JavaScript Tutorial', 'From the basics to advanced topics with simple, but detailed explanations.', user_id, 1])
  [resource.url, resource.title, resource.description, user_id, resource.topic_id])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const updateResource= (resource) =>{
  return db.query(`UPDATE resources SET url = $1, title = $2, description = $3, topic_id = $4
  WHERE id = $5
  RETURNING *`,
  [resource.url, resource.title, resource.description, resource.topic_id, resource.id])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const addRatings= (rating) =>{
  return db.query(`SELECT * FROM ratings WHERE user_id = $1 AND resource_id = $2`, [rating.user_id, rating.resource_id])
    .then(data => {
      if(data.rows && data.rows.length > 0){ //UPDATE rating if already present
        return db.query(`UPDATE ratings SET rate = $1, isLike = $2 WHERE user_id =  $3 AND resource_id = $4
         RETURNING *`,
        [rating.rate, rating.isLike, rating.user_id, rating.resource_id])
        .then(data => {
          return data.rows[0];
        })
        .catch((err) => {
          console.log(err.message);
        });
      }else{ //INSERT new rating
        return db.query(`INSERT INTO ratings (user_id, resource_id, rate, isLike)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [rating.user_id, rating.resource_id, rating.rate, rating.isLike])
          .then(data => {
            return data.rows[0];
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const addComments= (comment) =>{
  return db.query(`INSERT INTO comments (user_id, resource_id, content)
  VALUES ($1, $2, $3) RETURNING *`,
  [comment.user_id, comment.resource_id, comment.content])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};
module.exports = { getAllResources,
                  getResourcesByUserId,
                  getSpecificResourceByUserId,
                  getResourceByResourceId,
                  addResource,
                  updateResource,
                  addRatings,
                  addComments
                 };
