const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entryController')


router.get('/entry',entryController.verifyOrCreateFood, entryController.createEntry, (req,res) => {
  res.status(200).json({foodFdcId: res.locals.foodFdcId});
});

module.exports = router; 