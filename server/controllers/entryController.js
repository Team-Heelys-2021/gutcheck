const entryController = {};
const {
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
  const today = getDate();
  const userId = req.user.uid;
  try {
    let entries = await Entries.findAll({
      attributes: ['id', 'foodId'],
      where: {
        userId: userId,
        date: today,
      },
    });
    const foodIds = entries.map((entry) => entry.foodId);
    let foods = await Foods.findAll({
      attributes: ['fdcId', 'foodName', 'metaData'],
      where: {
        fdcId: foodIds,
      },
    });
    foods = foods.map((food) => {
      let { fdcId, foodName, metaData } = food.dataValues;
      metaData = JSON.parse(metaData);
      const {
        dataValues: { id: entryId },
      } = entries.find((entry) => entry.dataValues.foodId === fdcId);
      return { fdcId, foodName, ...metaData, entryId };
    });
    res.locals.entries = foods;

    //  [{ entryId, fdcId, foodName, ...JSON.parse(metaData) }]
  } catch (e) {
    console.log(e);
    return next(e);
  }
  next();
};

entryController.deleteEntry = async (req, res, next) => {};

module.exports = entryController;
