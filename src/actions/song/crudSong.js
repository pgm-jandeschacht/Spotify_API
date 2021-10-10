/**
 * All the crud operation actions together
 */

import parseSong from './parseSong.js';

/**
 *
 * Getting songs
 *
 * @param {*} song
 * @param {*} request
 * @param {*} response
 */
export const getSongs = async (song, request, response) => {
  try {
    const dbSongs = await song.get();
    response.status(200).json({ songs: dbSongs });
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
};

/**
 * Create a new song
 *
 * @param {*} song
 * @param {*} request
 * @param {*} response
 */
export const addSong = async (song, request, response) => {
  try {
    const { title, artist, URI } = parseSong(request, response);
    const newSong = await song.add(title, artist, URI);
    response.status(201).json({ song: newSong });
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
};

/**
 * Update an existing song
 *
 * @param {*} song
 * @param {*} request
 * @param {*} response
 */
export const updateSong = async (song, request, response) => {
  try {
    const { title, artist, URI } = parseSong(request);
    const { id } = request.params;
    const updatedSong = await song.update(id, title, artist, URI);
    response.status(200).json({ song: updatedSong });
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
};

/**
 * Delete a song
 *
 * @param {*} song
 * @param {*} request
 * @param {*} response
 */
export const deleteSong = async (song, request, response) => {
  try {
    const { id } = request.params;
    await song.delete(id);
    response.status(204).end();
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
};
