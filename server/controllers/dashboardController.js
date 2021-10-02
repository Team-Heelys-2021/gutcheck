const dashboardController = {};
const {models: {Foods,Entries}} = require('../../sql/sequelize');
const getDate = require('./entryController')

dashboardController.getData = async (req, res, next) => {
  const today = getDate();
  const userId = req.user.uid; 
  const entries =  Entries.findAll({
    where: {
      userId: userId, 
      date: today
    },
    group: {
      
    }
  })
}; 

module.exports = dashboardController;