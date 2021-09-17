/**
 * Writing to and getting data from song database
 */

import knexSongs from '../../db/knexSongs.js';
import Logger from './Logger.js';

export default class UserDb {
  /**
   * find users in database to database
   *
   * @param {*} username
   */
  async findOne(username) {
    try {
      return await knexSongs('users').where({ username: username }).select('*').first();
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
   * Add users to database
   *
   * @param {*} username
   * @param {*} password
   * @param {*} email
   */
   async add(username, password, email) {
    try {
      const user = await knexSongs('users').insert({
        username,
        password,
        email
      });
      return user;
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
   * Change user in database
   *
   * @param {*} id
   * @param {*} username
   * @param {*} password
   * @param {*} email
   */
   async update(id, username, password, email) {
    try {
      return await knexSongs('users').where('id', id).update({ username, password, email });
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
   * Delete user from database
   *
   * @param {*} id
   */
   async delete(id) {
    try {
      return await knexSongs('users').where('id', id).del();
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
   * Get all users from database
   */
   async get() {
    try {
      const users = await knexSongs('users').select('*');
      return users;
    } catch (e) {
      Logger.error(e.message);
    }
  }
}

  
