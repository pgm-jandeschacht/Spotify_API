/**
 * All the crud operation actions together
 */

import parsePlaylist from './parsePlaylist.js';

/**
* Getting playlists
*
* @param {*} playlist
* @param {*} request
* @param {*} response
*/
export const getPlaylists = async (playlist, request, response) => {
  try {
    const dbPlaylist = await playlist.get();
    response.status(200).json({ playlists: dbPlaylist });
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
};

/**
* Create a new playlist
*
* @param {*} playlist
* @param {*} request
* @param {*} response
*/
export const addPlaylist = async (playlist, request, response) => {
  try {
    const { title, songs } = parsePlaylist(request, response);
    const newPlaylist = await playlist.add(title, songs );
    response.status(201).json({ playlist: newPlaylist });
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
};

/**
* Update an existing playlist
*
* @param {*} playlist
* @param {*} request
* @param {*} response
*/
export const updatePlaylist = async (playlist, request, response) => {
  try {
    const { title, songs } = parsePlaylist(request);
    const { id } = request.params;
    const updatedPlaylist = await playlist.update(id, title, songs);
    response.status(200).json({ playlist: updatedPlaylist });
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
};

/**
* Delete a playlist
*
* @param {*} playlist
* @param {*} request
* @param {*} response
*/
export const deletePlaylist = async (playlist, request, response) => {
  try {
    const { id } = request.params;
    await playlist.delete(id);
    response.status(204).end();
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
};
