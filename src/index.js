/**
 * Main application
 */

import Express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import Logger from './lib/Logger.js';
import registerSongEndpoints from './actions/song/registerSongEndpoints.js';
import registerPlaylistEndpoints from './actions/playlist/registerPlaylistEndpoints.js';
import registerUserEndpoints from './actions/users/registerUserEndpoints.js';
import customMiddleware from './middleware/index.js';
import authenticateEndpoints from './actions/auth/index.js';

// Init dotenv
dotenv.config();

// Create a new express application
const app = Express();

// Add json body parser
app.use(bodyParser.json());

// Add middleware
app.use('/songs', ...customMiddleware, registerSongEndpoints);
app.use('/playlists', ...customMiddleware, registerPlaylistEndpoints);
app.use('/users', ...customMiddleware, registerUserEndpoints);

app.use('/auth', authenticateEndpoints);

// Start listening on a port
app.listen(process.env.PORT, () => {
  Logger.info(`Server is listening to port ${process.env.PORT}`);
});

console.log('Starting the server...');
