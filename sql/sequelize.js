const { Sequelize } = require('sequelize');
const UserModel = require('./models/User.js');
const FoodModel = require('./models/Food.js');
const EntryModel = require('./models/Entry.js');
// const dotenv = require('dotenv')

// dotenv.config();

//Passing a connection URI to connect 
const sequelize = new Sequelize(process.env.PG_URL);

const Users = UserModel(sequelize,Sequelize);
const Foods = FoodModel(sequelize,Sequelize);
const Entries = EntryModel(sequelize,Sequelize);
//testing connection 
// async function testConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// };

// testConnection();
//Relationships
//One to many Users to Entries 
Users.hasMany(Entries, {as: 'entries'}) // users.getEntries() -> to get the entries 
Entries.belongsTo(Users); // adds a usersId attribute to Entries to hold the primary key value for Users 
//One to many Foods to Entries 
Foods.hasMany(Entries, {as: 'entries'}); // foods.getEntries()
Entries.belongsTo(Foods); // adds a foodsId attribute to Entries to hold the primary key value for Foods

// //creating tables
// async function createTables() {
//   await sequelize.sync({ force: true });
// }

// createTables();

//test case for creating users

async function createRecords() {
  await sequelize.sync({ force: true });
   //creates all the tables 
  const user = await Users.create({
    name: 'John Doe', 
    userName: 'jdoe',
    email: 'jdoe@gmail.com',
    password: 'hjashdja',
    hashsalt: 'jahskdjhasidlak03490394'

  });
  console.log("auto created id", user.id);
  const banana = await Foods.create({
    fdcId:'1468381', 
    foodName: 'banana'
  });
  const firstEntry = await Entries.create({
    UserId: 1,
    FoodFdcId:'1468381'
  })
  const users = await Users.findAll();
  console.log(users.every(user => user instanceof Users)); // true
  console.log("All users:", JSON.stringify(users, null, 2));
}
createRecords();
