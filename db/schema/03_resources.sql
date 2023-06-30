-- Drop Resources table
DROP TABLE IF EXISTS resources CASCADE;

-- Create Resources table
CREATE TABLE resources (
  id SERIAL PRIMARY KEY NOT NULL,
  url VARCHAR(2048) NOT NULL,
  title VARCHAR(60) NOT NULL,
  description VARCHAR(5000) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE
);
