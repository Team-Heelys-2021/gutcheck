const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entryController');

router.post(
  '/entry',
  entryController.verifyOrCreateFood,
  entryController.createEntry,
  (req, res) => {
    res.status(200).json({ foodFdcId: res.locals.foodFdcId });
  }
);
//delete entry 
// router.delete('/entry', ); 

router.get('/dashboard', (req, res) => {
  res.status(200).json([
    {
      date: '2021-09-29',
      foods: [
        {
          foodsId: 6,
          fdcId: 721056,
          foodName: 'spinach',
        },
        {
          foodsId: 4,
          fdcId: 1889244,
          foodName: 'pepper',
        },
      ],
    },
    {
      date: '2021-09-28',
      foods: [
        {
          foodsId: 5,
          fdcId: 386410,
          foodName: 'quinoa',
        }
      ],
    },
    {
      date: '2021-09-27',
      foods: [
        {
          foodsId: 7,
          fdcId: 360294 ,
          foodName: 'brown rice',
        }
      ],
    },
    {
      date: '2021-09-26',
      foods: [
        {
          foodsId: 1,
          fdcId: 1648210,
          foodName: 'apple',
        },
        {
          foodsId: 2,
          fdcId: 1468381,
          foodName: 'banana',
        },
      ],
    },
    {
      date: '2021-09-25',
      foods: [
        {
          foodsId: 1,
          fdcId: 1648210,
          foodName: 'apple',
        },
        {
          foodsId: 2,
          fdcId: 1468381,
          foodName: 'banana',
        },
      ],
    },
    {
      date: '2021-09-24',
      foods: [
        {
          foodsId: 3,
          fdcId: 1864680,
          foodName: 'orange',
        },
      ],
    },
  ]);
});

module.exports = router;
