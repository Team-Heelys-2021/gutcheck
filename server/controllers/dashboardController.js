const {
  db,
  models: { Foods, Entries },
} = require('../../sql/sequelize');

const dashboardController = {};

dashboardController.getData = async (req, res, next) => {
  const userId = req.user.uid;
  try {
    const data = []
    for (let i = 0; i < 7; i++) {
      const date = getAnyDay(i);
      const entries = await getEntries(date, userId)
      if (entries) {
        // console.log(entries)
        data.push(entries)
      }
    }
    res.locals.data = data;
    next();
  } catch (e) {
    console.log(e);
    return next(e);
  }
};
const getEntries = async (date,userId) => {
  let formattedEntries = null
  try {
    const entries = await db.query(
      `SELECT * FROM "Entries", "Foods" WHERE "Entries"."date" = '${date}' AND "Foods"."fdcId" = "Entries"."foodId" AND "Entries"."userId" = '${userId}' `
    );
    const foods = entries[0].map((entry) => {
      return {
        foodsId: entry.id,
        foodName: entry.foodName,
        fdcId: entry.fdcId,
      };
    });
    const count = await db.query(
      `SELECT COUNT(DISTINCT "foodId") FROM "Entries" WHERE "date" = '${date}' AND "userId" = '${userId}'`
    );
    // console.log('count', count[0]);
    formattedEntries = {
      date: date,
      foods: foods,
      count: count[0][0].count,
    };
  } catch (e) {
    console.log(e);
  }
  return formattedEntries;
};

const getAnyDay = (n) => {
  let today = new Date();
  let d = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - n
  );
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = d.getFullYear();
  d = yyyy + '-' + mm + '-' + dd;
  return d;
};

module.exports = dashboardController;
