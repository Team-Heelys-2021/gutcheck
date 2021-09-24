-- one time copy paste into elephantsql

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS foods CASCADE;
DROP TABLE IF EXISTS entries CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  hashsalt VARCHAR NOT NULL,
  password VARCHAR NOT NULL
);

CREATE TABLE foods (
  id SERIAL PRIMARY KEY,
  fdcid INTEGER NOT NULL,
  name VARCHAR NOT NULL,
  metadata JSON
);

CREATE TABLE entries (
  id SERIAL PRIMARY KEY,
  users_id INTEGER REFERENCES users(id),
  foods_id INTEGER REFERENCES foods(id),
  date_created DATE DEFAULT now()
);
