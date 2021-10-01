const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const {db} = require('../sql/sequelize');
const authRouter = require('./auth/auth.routes');
const userParser = require('./userParser');
const apiRouter = require('./routes/apiRouter');

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: process.env.OKTA_CLIENT_ID,
  issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
});

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

app.use(express.static(path.resolve(__dirname, '../client')));

db.sync({}); // implement the data model change for the sync

app.use('/api/auth' , authRouter);

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.use(async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      throw new Error('Authorization header is required');

    const accessToken = req.headers.authorization.trim().split(' ')[1];
    await oktaJwtVerifier.verifyAccessToken(accessToken, 'api://default');
    console.log(accessToken);
    next();
  } catch (error) {
    next(error.message);
  }
}, userParser);

app.use('/api', apiRouter);

app.get('/dummy', (req, res) => {
  res.status(200);
});

app.get('/api/debug', (req, res, next) => {
  console.log(req.user);
  res.json({ protected: 'ok' });
});

//global error handler
app.use(function(err, req, res, next) {
  console.log("Global error handler");
  return res.status(400).json(err);
})


app.listen(3000, () => {
  console.log('Running on port 3000');
});
