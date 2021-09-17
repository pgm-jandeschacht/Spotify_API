import faker from 'faker';
import UserDb from '../lib/UserDb.js';
import Logger from '../lib/Logger.js'

const usersDb = new UserDb();

const createUsers = (amount) => {
  const usersPlain = [];
  const users = [];
  let amountUsers = 0
  // As long the amount of users doesn't meet the given amount, keep on faking
  while(amountUsers < amount) {

    // Create new user
    const user = [
      faker.internet.userName(Math.round(Math.random())),
      faker.internet.password(),
      faker.internet.exampleEmail()
    ];
    // Check if unique
    if(usersPlain.indexOf(user) < 0) {
      usersPlain.push(user);
      users.push(user);
      amountUsers++;
    }
  }

  // Return the given amount of users
  return users;
};

const seedUsers = (users) => {
  const ids = users.map(async (user) => {
    const id = await usersDb.add(...user);
    return id;
  })

  return Promise.all(ids);
};

const seed = async () => {

  const users = createUsers(75);
  const ids = await seedUsers(users);
  Logger.warning(`Created ${users.length} users!`);
}

seed();
