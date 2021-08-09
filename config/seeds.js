require('dotenv').config();
const db = require('./connection');
const { User } = require('../models');

db.once('open', async () => {

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  await User.create({
    firstName: 'Mat',
    lastName: 'Schutlz',
    email: 'mattschultz@gmail.com',
    password: 'password12345'
  });

  await User.create({
    firstName: 'Peter',
    lastName: 'Bruckner',
    email: 'admin@gmail.com',
    password: 'password',
    bio: 'hi my name is peter and i love tattoos',
    social: 'peterbrcukner08@gmail.com'
  });


  console.log('users seeded');

  process.exit();
});
