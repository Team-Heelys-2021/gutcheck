const fs = require('fs');
const path = require('path');
const entryController = {};
const {
  models: { Foods, Entries },
} = require('../../sql/sequelize');

//TODO: add try catch

entryController.verifyOrCreateFood = async (req, res, next) => {
  const { fdcId, lowercaseDescription, ...metaData } = req.body.food;
  console.log(req.body);
  const food = await Foods.findOne({
    where: {
      fdcId: fdcId,
    },
  });
  //if food doesn't exist in the database, create the food in db

  if (!food) {
    try {
      await Foods.create({
        fdcId: fdcId,
        foodName: lowercaseDescription,
        metaData: JSON.stringify(metaData),
      });
    } catch (e) {
      return next(e);
    }
  }
  res.locals.foodFdcId = fdcId;
  next();
};

entryController.createEntry = async (req, res, next) => {
  //TO DO: not sure about what the headers will give us, make sure to get the subId correctly
  const { uid } = req.user;
  console.log('food id', res.locals.foodFdcId);
  try {
    await Entries.create({
      userId: uid,
      foodId: res.locals.foodFdcId,
    });
  } catch (e) {
    return next(e);
  }
  next();
};
//TODO: get all the entries
entryController.getAllEntries = async (req, res, next) => {};

module.exports = entryController;
