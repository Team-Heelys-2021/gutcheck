const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');

router.post('/register', authController.register); // api/auth/register

module.exports = router;
