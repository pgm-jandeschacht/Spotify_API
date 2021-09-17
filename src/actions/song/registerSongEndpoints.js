/**
 * Register the endpoints
 */

import Express from 'express';
import {
  getSongs,
  addSong,
  updateSong,
  deleteSong,
} from './crudSong.js';
import SongDb from '../../lib/SongDb.js';

const app = Express.Router();

const songDb = new SongDb();

// Get the songs
app.get('/', (req, res) => getSongs(songDb, req, res));

// Add a song
app.post('/', (req, res) => addSong(songDb, req, res));

// Update a song
app.put('/:id', (req, res) => updateSong(songDb, req, res));

// Delete a song
app.delete('/:id', (req, res) => deleteSong(songDb, req, res));

export default app;
