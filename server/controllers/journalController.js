const journalController = {};
const {
  db,
  models: { JournalEntries },
} = require('../../sql/sequelize');

journalController.getJournalEntry = async (req, res, next) => {
  try {
    const userId = req.user.uid;
    const date = req.params.date ? req.params.date : new Date();

    let journalEntry = await JournalEntries.findOne({
      where: {
        userId: userId,
        date: date.toISOString().split('T')[0],
      },
    });

    if (!journalEntry) {
      journalEntry = await JournalEntries.create({
        userId: userId,
        date: date.toISOString().split('T')[0],
        content: '',
      });
    }

    res.locals.journalEntry = journalEntry;
    next();
  } catch (err) {
    console.log('Error at journalController.getEntry: ', err);
    return next(err);
  }
};

module.exports = journalController;
