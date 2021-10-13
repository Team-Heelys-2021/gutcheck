const entryController = {};
const { request } = require('express');
const {
  db,
  models: { Foods, Entries },
} = require('../../sql/sequelize');

//TODO: add try catch

const getDate = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  return today;
};

entryController.verifyOrCreateFood = async (req, res, next) => {
  const { fdcId, lowercaseDescription, foodNutrients } = req.body.food;
  const metaData = req.body.food;
  console.log(req.body);
  let fiberValue = 0;
  foodNutrients.forEach((s) => {
    s.nutrientId == '1079' ? (fiberValue = s.value) : 0;
  });
  console.log('fiber Value', fiberValue);
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
        fiberCount: fiberValue,
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
  try {
    const entry = await Entries.create({
      userId: uid,
      foodId: res.locals.foodFdcId,
    });
    res.locals.entryId = entry.id;
  } catch (e) {
    return next(e);
  }
  next();
};

//TODO: get all the entries
entryController.getAllEntries = async (req, res, next) => {
  let date = null;

  if (req.body.date) {
    date = new Date(Date.parse(req.body.date));
    date = date.toISOString().split('T')[0];
  } else {
    date = getDate();
  }

  const userId = req.user.uid;
  try {
    const entries = await db.query(
      `SELECT * FROM "Entries", "Foods" WHERE "Entries"."date" = '${date}' AND "Foods"."fdcId" = "Entries"."foodId" AND "Entries"."userId" = '${userId}' `
    );
    const formattedEntries = entries[0].map((entry) => {
      const metaData = JSON.parse(entry.metaData);
      return { ...metaData, entryId: entry.id };
    });
    res.locals.entries = formattedEntries;
  } catch (e) {
    console.log(e);
    return next(e);
  }
  next();
};

entryController.deleteEntry = async (req, res, next) => {
  const { entryId } = req.params;
  try {
    await Entries.destroy({
      where: {
        id: entryId,
      },
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
  res.status(204).json({ success: true });
};

module.exports = entryController;
