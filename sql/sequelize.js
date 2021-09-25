const { createTestScheduler } = require('@jest/core');
const { Sequelize, DataTypes, Model } = require('sequelize');
//Passing a connection URI to connect 
const sequelize = new Sequelize('postgres://hkpbdxsc:ZKe3ogq8nIcjThZCsZ-eg6zbHPIIjERW@fanny.db.elephantsql.com/hkpbdxsc');

//testing connection 
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

//Creating models

//User Model
const Users = sequelize.define('Users', {
  //Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hashsalt: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  tableName: "Users"
});

//Foods Model 

const Foods = sequelize.define('Foods', {
  //Model attributes are defined here
  fdcId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  foodName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  metaData: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  freezeTableName: true,
});

//Entries Table 

const Entries = sequelize.define('Entries', {
  //Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATEONLY, //Date Without time
    defaultValue: DataTypes.NOW
  }
},{
  freezeTableName: true,
});
//Relationships
//One to many Users to Entries 
Users.hasMany(Entries, {as: 'entries'}) // users.getEntries() -> to get the entries 
Entries.belongsTo(Users); // adds a usersId attribute to Entries to hold the primary key value for Users 
//One to many Foods to Entries 
Foods.hasMany(Entries, {as: 'entries'}); // foods.getEntries()
Entries.belongsTo(Foods); // adds a foodsId attribute to Entries to hold the primary key value for Foods

//tested creating the tables 


// async function createUser() {
//   await sequelize.sync({ force: true }); //creates all the tables 
//   const user = await Users.create({
//     name: 'John Doe', 
//     userName: 'jdoe',
//     email: 'jdoe@gmail.com',
//     password: 'hjashdja',
//     hashsalt: 'jahskdjhasidlak03490394'

//   });
//   console.log("auto created id", user.id);
//   const users = await Users.findAll();
//   console.log(users.every(user => user instanceof Users)); // true
//   console.log("All users:", JSON.stringify(users, null, 2));
// }
// createUser();