/**
 * Writing to and getting data from playlists database
 */

import { v4 as uuidv4 } from 'uuid';
import knexSongs from '../../db/knexSongs.js';
import Logger from './Logger.js';

export default class PlaylistDb {
  /**
  * Add playlist to database
  *
  * @param {*} title
  * @param {*} songs
  */
  async add(title, songs) {
    try {
      const playlist = await knexSongs('playlists').insert({
        id: uuidv4(),
        title,
        userId: 1,
        createdAt: new Date(),
        modifiedAt: new Date(),
        songs: [songs],
      });
      return playlist;
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
  * Change a playlist in database
  *
  * @param {*} id
  * @param {*} title
  * @param {*} songs
  */
  async update(id, title, songs) {
    try {
      return await knexSongs('playlists').where('id', id).update({ title, songs });
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
  * Delete song from database
  *
  * @param {*} id
  */
  async delete(id) {
    try {
      return await knexSongs('playlists').where('id', id).del();
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
  * Get all playlists from database
  */
  async get(userId) {
    try {
      const songs = await knexSongs('playlists').select('*');
      return songs;
    } catch (e) {
      Logger.error(e.message);
    }
  }
}

// .where('userId', userId)