const {db, models: {Foods,Entries}} = require('../../sql/sequelize');
const getDate = require('./entryController')


const dashboardController = {};

dashboardController.getData = async (req, res, next) => {
  const today = getDate();
  const userId = req.user.uid; 
  try {
    const entries = await db.query(`SELECT * FROM "Entries", "Foods" WHERE "Entries"."date" = '${day}' AND "Foods"."fdcId" = "Entries"."foodId" AND "Entries"."userId" = '${userId}' `);
    const formattedEntries = entries[0].map((entry) => {
      const metaData = JSON.parse(entry.metaData);
      return {...metaData, entryId : entry.id}; 
    })
    res.locals.entries = formattedEntries;
  } catch(e) {
    console.log(e)
    return next(e)
  }
  next()
}

const getCount = () => {
  
}

module.exports = dashboardController;