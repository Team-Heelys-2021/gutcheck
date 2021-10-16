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

    res.locals.journalEntry = journalEntry;
    next();
  } catch (err) {
    console.log('Error at journalController.getEntry: ', err);
    return next(err);
  }
};

journalController.createJournalEntry = async (req, res, next) => {
  try {
    const userId = req.user.uid;
    const date = new Date(Date.parse(req.body.date));
    const content = req.body.content;

    let journalEntry = await JournalEntries.findOne({
      where: {
        userId: userId,
        date: date.toISOString().split('T')[0],
      },
    });

    console.log('found: ', journalEntry);
    if (!journalEntry) {
      journalEntry = await JournalEntries.create({
        userId: userId,
        date: date.toISOString().split('T')[0],
        content: content,
      });
    } else {
      journalEntry = await JournalEntries.update(
        { content: content },
        {
          where: {
            userId: userId,
            date: date.toISOString().split('T')[0],
          },
          returning: true,
        }
      );
      journalEntry = journalEntry[1][0]
    }

    console.log('created/updated entry: ', journalEntry);
    res.locals.journalEntry = journalEntry;
    next();
  } catch (err) {
    console.log('Error at journalController.createEntry: ', err);
    return next(err);
  }
};

module.exports = journalController;
