/**
 * Register the endpoints
 */

import Express from 'express';
import {
  getPlaylists,
  addPlaylist,
  updatePlaylist,
  deletePlaylist,
} from './crudPlaylist.js';
import PlaylistDb from '../../lib/PlaylistDb.js';

const app = Express.Router();

const playlistDb = new PlaylistDb();

// Get all playlists
app.get('/', (req, res) => getPlaylists(playlistDb, req, res));

// Add a playlist
app.post('/', (req, res) => addPlaylist(playlistDb, req, res));

// Update a playlist
app.put('/:id', (req, res) => updatePlaylist(playlistDb, req, res));

// Delete a playlist
app.delete('/:id', (req, res) => deletePlaylist(playlistDb, req, res));

export default app;
