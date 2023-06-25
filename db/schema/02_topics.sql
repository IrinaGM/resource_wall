-- Drop Resources table

DROP TABLE IF EXISTS topics CASCADE;

-- Create Resources table
CREATE TABLE topics (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(60) NOT NULL
);
