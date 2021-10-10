# Spotify clone
 
 This is a spotify clone with no front end. You can add, change and delete songs and playlists as a user, as an admin you can also add, change and delete users. This was the first time making a back end application of this size. This was an assingment for Artevelde.

**Technologies used:** Javascript, Chalk, EsLint, DotEnv, Passport, Knex, Uuid, SQLite3, Faker, Express, JWT, Nodemon

## Usage

### Install npm packages
``npm install``

### Login as admin or user
The administrators username is **admin** and the password is **adminPassword**.

To use the API as a user the username is **user** and the password is **userPassword**.

To login you need the endpoint ``localhost:6001/auth/login``.
To login you need to add the following to body (don't forget to set the type of content to JSON):

```json
{
    "username": "your username",
    "password": "your password"
}
```

After this you will get a token which you can use in the following endpoints.

## Songs
To be able to add, change or delete songs you need to be logged in as the administrator. To get all the songs you can just be a user.

Keep in mind that you need to be logged in and that you have to add your token to the bearer token in authorization.

### Get all songs
The endpoint to get all songs is ``localhost:6001/songs``.

### Add a song
The endpoint to add a song is ``localhost:6001/songs``.
To add a song you need to add the following to body (don't forget to set the type of content to JSON):

```json
{
 "song": {
  "title": "Song title",
  "artist": "Artist of the song",
  "URI": "Spotify URI"
 }
}
```

### Change a song
The endpoint to change a song is ``localhost:6001/songs/:id``.
After ``songs/`` you add the id of the song you want to change.
To change a song you need to add the following to body (don't forget to set the type of content to JSON):

```json
{
 "song": {
  "title": "Song title",
  "artist": "Artist of the song",
  "URI": "Spotify URI"
 }
}
```

### Delete a song
The endpoint to delete a song is ``localhost:6001/songs/:id``.
After ``songs/`` you add the id of the song you want to delete.

## Playlists
To be able to add, change or delete playlists you need to be logged in as the administrator or a user.

Keep in mind that you need to be logged in and that you have to add your token to the bearer token in authorization.

### Get all playlists
The endpoint to get all playlists is ``localhost:6001/playlists``.

### Add a playlist
The endpoint to add a playlist is ``localhost:6001/playlists``.
To add a playlist you need to add the following to body (don't forget to set the type of content to JSON):

```json
{
 "playlist": {
  "title": "Playlist title",
  "songs": ["Song_id, Song_id, ..."]
 }
}
```

### Change a playlist
The endpoint to change a playlist is ``localhost:6001/playlists/:id``.
After ``playlists/`` you add the id of the playlist you want to change.
To change a playlist you need to add the following to body (don't forget to set the type of content to JSON):

```json
{
 "playlist": {
  "title": "Playlist title",
  "songs": ["Song_id, Song_id, ..."]
 }
}
```

### Delete a playlist
The endpoint to delete a playlist is ``localhost:6001/playlists/:id``.
After ``playlists/`` you add the id of the playlist you want to delete.

## Users
To be able to add, change or delete users you need to be logged in as the administrator or a user.

Keep in mind that you need to be logged in and that you have to add your token to the bearer token in authorization.

### Get all Users
The endpoint to get all users is ``localhost:6001/users``.

### Add a user
The endpoint to add a user is ``localhost:6001/users``.
To add a user you don't need to be logged in.
To add a user you need to add the following to body (don't forget to set the type of content to JSON):

```json
{
 "user": {
  "username": "your username",
  "password": "your password",
  "email": "your email"
 }
}
```

### Change a user
The endpoint to change a user is ``localhost:6001/users/:id``.
After ``users/`` you add the id of the user you want to change.
To change a user you need to add the following to body (don't forget to set the type of content to JSON):

```json
{
 "user": {
  "username": "your username",
  "password": "your password",
  "email": "your email"
 }
}
```

### Delete a user
The endpoint to delete a user is ``localhost:6001/users/:id``.
After ``users/`` you add the id of the user you want to delete.


## Hash A password
The endpoint to hash a password is ``localhose:6001/auth/hash``.
In body you add the following: 

```json
{
    "password": "your password"
}
```

After you have done that, you will receive a hashed password, this you then add to the database of the users.
