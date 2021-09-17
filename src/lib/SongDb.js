/**
 * Writing to and getting data from song database
 */

import { v4 as uuidv4 } from 'uuid';
import knexSongs from '../../db/knexSongs.js';
import Logger from './Logger.js';

export default class SongDb {
  /**
   * Add songs to database
   *
   * @param {*} title
   * @param {*} artist
   * @param {*} URI
   */
  async add(title, artist, URI) {
    try {
      const song = await knexSongs('songs').insert({
        id: uuidv4(),
        title,
        artist,
        URI,
        createdAt: new Date(),
      });
      return song;
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
   * Change song in database
   *
   * @param {*} id
   * @param {*} title
   * @param {*} artist
   * @param {*} URI
   */
  async update(id, title, artist, URI) {
    try {
      return await knexSongs('songs').where('id', id).update({ title, artist, URI });
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
      return await knexSongs('songs').where('id', id).del();
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
   * Get all songs from database
   */
  async get() {
    try {
      const songs = await knexSongs('songs').select('*');
      return songs;
    } catch (e) {
      Logger.error(e.message);
    }
  }
}
