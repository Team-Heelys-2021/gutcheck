const fs = require('fs');
const path = require('path');
const entryController = {};
const {models: {Foods,Entries}} = require('../../sql/sequelize');

entryController.verifyOrCreateFood = async (req, res, next) => {
  const {fdcId, lowercaseDescription, metaData} = req.body.entry; 
  const food = await Foods.findAll({
    where: {
      fdcId: fdcId
    }
  });
  //if food doesn't exist in the database, create the food in db 
  if(!food) {
    await Foods.create({
      fdcId: fdcId, 
      foodName: lowercaseDescription,
      metaData: metaData
    })
  }
  res.locals.foodFdcId = fdcId; 
  next(); 
};
entryController.createEntry = async (req, res, next) => {
  //TO DO: not sure about what the headers will give us, make sure to get the subId correctly 
  const {sub} = req.headers.authentication; 
  await Entries.create({
    userId: sub, 
    fdcId: res.locals.foodFdcId
  })
  next(); 
};

module.exports = entryController; 