/**
 * Function that will give us 100% certainty that the data coming from the client is a user item
 */

export default (request) => {
  try {
    const { user } = request.body;

    if (user == null) {
      throw new Error('The user object was not set.');
    }

    if ((user.username == null || user.username.length === 0)
      && (user.password == null || user.password.length === 0)
      && (user.email == null || user.email.length === 0)) {
      throw new Error('The user object does not contain anything.');
    }

    if (user.username != null) {
      user.username = user.username.trim();
    }

    if (user.password != null) {
      user.password = user.password.trim();
    }

    if (user.email != null) {
      user.email = user.email.trim();
    }

    return user;
  } catch (e) {
    throw new Error('Something went wrong...');
  }
};
