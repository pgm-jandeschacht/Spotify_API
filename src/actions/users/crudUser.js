/**
 * All the crud operation actions together
 */

 import parseUser from './parseUser.js';

 /**
  *
  * Getting users
  *
  * @param {*} user
  * @param {*} request
  * @param {*} response
  */
 export const getUsers = async (user, request, response) => {
   try {
     const dbUsers = await user.get();
     response.status(200).json({ users: dbUsers });
   } catch (e) {
     response.status(500).json({ error: e.message });
   }
 };
 
 /**
  * Create a new user
  *
  * @param {*} user
  * @param {*} request
  * @param {*} response
  */
 export const addUser = async (user, request, response) => {
   try {
     const { username, password, email } = parseUser(request, response);
     const newUser = await user.add(username, password, email);
     response.status(201).json({ user: newUser });
   } catch (e) {
     response.status(500).json({ error: e.message });
   }
 };
 
 /**
  * Update an existing user
  *
  * @param {*} user
  * @param {*} request
  * @param {*} response
  */
 export const updateUser = async (user, request, response) => {
   try {
     const { username, password, email } = parseUser(request);
     const { id } = request.params;
     const updatedUser = await user.update(id, username, password, email);
     response.status(200).json({ user: updatedUser });
   } catch (e) {
     response.status(500).json({ error: e.message });
   }
 };
 
 /**
  * Delete a user
  *
  * @param {*} user
  * @param {*} request
  * @param {*} response
  */
 export const deleteUser = async (user, request, response) => {
   try {
     const { id } = request.params;
     await user.delete(id);
     response.status(204).end();
   } catch (e) {
     response.status(500).json({ error: e.message });
   }
 };
 