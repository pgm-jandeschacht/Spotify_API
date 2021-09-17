import knex from 'knex';

// Configuration file to connect with sqlite db
const config = {
  client: 'sqlite3',
  connection: {
    filename: './db/songs.sqlite3',
  },
  useNullAsDefault: true,
};

// Initiate the knex library with the config
const knexSongs = knex(config);

export default knexSongs;
