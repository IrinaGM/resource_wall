const db = require('../connection');

// Check Input URL to includes HTTPS://
const checkHttp = (url) => {
  if (!url.startsWith("https://") && !url.startsWith("http://")) {
    return "https://" + url;
  }
  return url;
};

const getAllResources = (topic_id) => {
  //define query values
  const values = [];

  // define query
  let queryString = `
    SELECT resources.id, resources.url, resources.title, resources.description, resources.user_id, resources.topic_id, topics.name as topic_name
    FROM resources
    JOIN topics ON topics.id = resources.topic_id
    WHERE 1=1
  `;

  // if topic id is truethy chain topic_id param to query
  if (topic_id){
    values.push(topic_id);
    queryString += ` AND resources.topic_id = $1`
  }

  // query the db
  return db.query(queryString, values)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// USER-STORY-04: Get Single Resource by resource ID
const getResourcebyId = (id) => {
  // Query
  const queryString = `
  SELECT
    resources.url, resources.title, resources.description,
    resources.user_id, topics.name as topic_name, resources.id,
    (SELECT round(avg(rate), 2) FROM ratings WHERE resource_id = $1) as avg_rating,
    (SELECT sum(CASE WHEN ratings.islike THEN 1 ELSE 0 END) FROM ratings WHERE resource_id = $1) as total_like
  FROM resources
  JOIN topics ON topics.id = resources.topic_id
  WHERE resources.id = $1;
  `;

  const values = [id];

  // Database
  return db.query(queryString, values)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// USER-STORY-05: Get Resources by USER_ID + USER-STORY-09: Includes Liked Resources
const getResourcesByUserId = (user_id, topic_id) => {
  // Show resources added by user
  let queryString1 = `
    SELECT DISTINCT resources.title, resources.topic_id, ratings.islike, resources.id, topics.name as topic_name
    FROM resources
    LEFT JOIN ratings ON ratings.resource_id = resources.id
    JOIN topics ON topics.id = resources.topic_id
    WHERE resources.user_id = $1
  `;

  // Show resources liked by user
  let queryString2 = `
    SELECT DISTINCT resources.title, resources.topic_id, ratings.islike, resources.id, topics.name as topic_name
    FROM resources
    LEFT JOIN ratings ON ratings.resource_id = resources.id
    JOIN topics ON topics.id = resources.topic_id
    WHERE ratings.islike = true AND ratings.user_id = $1
  `;

  //define values
  const values = [user_id];

  // if topic id is truethy chain topic_id param to queries
  if (topic_id){
    values.push(topic_id);
    queryString1 += ` AND resources.topic_id = $2;`;
    queryString2 += ` AND resources.topic_id = $2;`;
  }

  // Query the database for both queries concurrently
  const query1 = db.query(queryString1, values).then(data => data.rows);
  const query2 = db.query(queryString2, values).then(data => data.rows);

  // Return a promise that resolves when both queries have completed
  return Promise.all([query1, query2])
    .then(([ userResources, likedResources ]) => {
      return { userResources, likedResources };
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
//Update resource
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
//Add/Update ratings
const addRatings= (rating) =>{
  return db.query(`SELECT * FROM ratings WHERE user_id = $1 AND resource_id = $2`, [rating.user_id, rating.resource_id])
    .then(data => {
      if(data.rows && data.rows.length > 0){ //UPDATE rating if already present
        return db.query(`UPDATE ratings SET rate = $1, isLike = $2 WHERE user_id =  $3 AND resource_id = $4
         RETURNING *`,
        [rating.rate, rating.isLike, rating.user_id, rating.resource_id])
        .then(data => {
          return db.query(`(SELECT round(avg(rate), 2) as average FROM ratings WHERE resource_id = $1) `,
          [rating.resource_id])
          .then(rating =>{
            return {"data" : data.rows[0], "avg-rating" : rating.rows[0] };
          })
          .catch((err) => {
            console.log(err.message);
          });
        })
        .catch((err) => {
          console.log(err.message);
        });

      }else{ //INSERT new rating
        return db.query(`INSERT INTO ratings (user_id, resource_id, rate, isLike)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [rating.user_id, rating.resource_id, rating.rate, rating.isLike])
          .then(data => {
            return db.query(`(SELECT round(avg(rate), 2) as average FROM ratings WHERE resource_id = $1) `,
          [rating.resource_id])
          .then(rating =>{
            return {"data" : data.rows[0], "avg-rating" : rating };
          })
          .catch((err) => {
            console.log(err.message);
          });
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
//Add comments
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
//USER STORY - 06
const getUserRatingForResource = (user_id,resource_id)=>{
  return db.query(`SELECT rate, isLike FROM ratings WHERE user_id=$1 AND resource_id =$2`,
    [user_id,resource_id])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports =
  {
    getAllResources,
    getResourcebyId,
    getResourcesByUserId,
    postResourceByUserId,
    updateResource,
    addRatings,
    addComments,
    getUserRatingForResource
  };
