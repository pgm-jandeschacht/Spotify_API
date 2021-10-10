/**
 * Function that will give us 100% certainty that the data coming from the client is a playlist item
 */

export default (request) => {
  try {
    const { playlist } = request.body;

    if (playlist == null) {
      throw new Error('The playlist object was not set.');
    }

    if ((playlist.title == null || playlist.title.length === 0)
      && (playlist.songs == null || playlist.songs.length === 0)) {
      throw new Error('The playlist object does not contain anything.');
    }

    if (playlist.title != null) {
      playlist.title = playlist.title.trim();
    }

    return playlist;
  } catch (e) {
    throw new Error('Something went wrong...');
  }
};
