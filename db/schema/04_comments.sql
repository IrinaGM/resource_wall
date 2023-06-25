-- Drop Resources table
DROP TABLE IF EXISTS comments CASCADE;

-- Create Resources table
CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
  content VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE
);
