/**
 * Function that will give us 100% certainty that the data coming from the client is a song item
 */

export default (request) => {
  try {
    const { song } = request.body;

    if (song == null) {
      throw new Error('The song object was not set.');
    }

    if ((song.title == null || song.title.length === 0)
      && (song.artist == null || song.artist.length === 0)
      && (song.URI == null || song.URI.length === 0)) {
      throw new Error('The song object does not contain anything.');
    }

    if (song.title != null) {
      song.title = song.title.trim();
    }

    if (song.artist != null) {
      song.artist = song.artist.trim();
    }

    if (song.URI != null) {
      song.URI = song.URI.trim();
    }

    return song;
  } catch (e) {
    throw new Error('Something went wrong...');
  }
};
