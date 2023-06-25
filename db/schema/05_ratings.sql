-- Drop Resources table
DROP TABLE IF EXISTS ratings CASCADE;

-- Create Resources table
CREATE TABLE ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  rate SMALLINT NOT NULL DEFAULT 0,
  isLike BOOLEAN NOT NULL DEFAULT false,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE,
  UNIQUE(user_id, resource_id)
);
