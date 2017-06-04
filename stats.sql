DROP DATABASE IF EXISTS statistics;
CREATE DATABASE statistics;

\c statistics;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  wins INTEGER
);

INSERT INTO users (name, wins)
  VALUES ('Dana', 1);