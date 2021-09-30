const fs = require('fs');
const path = require('path');
const db = require('../../sql/sequelize')
const entryController = {};

entryController.verifyFood = async (req, res, next) => {
  const {fdcId, lowerDescription} = req.body.entry; 
  const food = await Foods.findAll()
}