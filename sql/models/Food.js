const { DataTypes } = require("sequelize");

module.exports = function (sequelize, Datatypes) {
  //Foods Model

  const FoodModel = sequelize.define(
    "Foods",
    {
      //Model attributes are defined here
      fdcId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      foodName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      metaData: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return FoodModel;
};
