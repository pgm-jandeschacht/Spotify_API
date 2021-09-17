/**
 * Register the endpoints
 */

import Express from 'express';
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from './crudUser.js';
import UserDb from '../../lib/UserDb.js';

const app = Express.Router();

const userDb = new UserDb();

// Get the users
app.get('/', (req, res) => getUsers(userDb, req, res));

// Add a user
app.post('/', (req, res) => addUser(userDb, req, res));

// Update a user
app.put('/:id', (req, res) => updateUser(userDb, req, res));

// Delete a user
app.delete('/:id', (req, res) => deleteUser(userDb, req, res));

export default app;
