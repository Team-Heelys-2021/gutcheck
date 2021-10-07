const { DataTypes } = require("sequelize");

module.exports = function (sequelize, Datatypes) {
  //Entries Table

  const EntryModel = sequelize.define(
    "Entries",
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
      foodId: {
        type: DataTypes.INTEGER, 
      }
    },
    {
      freezeTableName: true,
    }
  );
  return EntryModel;
};
