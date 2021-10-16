const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entryController');
const dashboardController = require('../controllers/dashboardController');
const journalController = require('../controllers/journalController');

router.delete('/entry/:entryId', entryController.deleteEntry);
router.post(
  '/entry',
  entryController.verifyOrCreateFood,
  entryController.createEntry,
  (req, res) => {
    console.log('foodFdcId is ', res.locals.foodFdcId);
    res.status(200).json({ entryId: res.locals.entryId });
  }
);
//delete entry
// router.delete('/entry', );

//TODO: Get req to entry to populate all the entries for the day
router.get('/entry', entryController.getAllEntries, (req, res) => {
  // console.log('entries is ', res.locals.entries);
  res.status(200).json({ entries: res.locals.entries });
});

router.get('/dashboard', dashboardController.getData, (req, res) => {
  res.status(200).json(res.locals.data);
});

router.post('/dateofEntry', entryController.getAllEntries, (req, res) => {
  res.status(200).json({ entries: res.locals.entries });
});

router.get('/journalEntry/:date', journalController.getJournalEntry, (req, res) => {
  res.status(200).json({journalEntry: res.locals.journalEntry});
});

router.post('/createJournalEntry', journalController.createJournalEntry, (req, res) => {
  res.status(200).json({journalEntry: res.locals.journalEntry});
});

module.exports = router;
