const { DataTypes } = require('sequelize');

module.exports = function (sequelize, Datatypes) {
  //Entries Table

  const JournalEntryModel = sequelize.define(
    'JournalEntries',
    {
      //Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATEONLY, //Date Without time
        defaultValue: DataTypes.NOW,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
          type: DataTypes.STRING,
          allowNull: true,
      }
    },
    {
      freezeTableName: true,
    }
  );
  return EntryModel;
};
