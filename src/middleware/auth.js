import passport from 'passport';
import passportJWT from 'passport-jwt';
import dotenv from 'dotenv';
import Logger from '../lib/Logger.js';

dotenv.config();

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

// Setting the options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_UNIQUE_KEY
}

// Config passport jwt
passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
  try {
    Logger.info(`${jwt_payload.username} is doing a request`);
    return done(null, jwt_payload);
  } catch (error) {
    return done(null, error);
  }
}));

export default (req, res, next) => {

  // To read the users you don't need to be logged in
  if (req.method == 'GET') {
    next();
    return false;
  };

  // No need to be logged in to add a user
  if (req.method == 'POST' && req.baseUrl == '/users') {
    next();
    return false;
  }

  passport.authenticate('jwt', { session: false }, (error, user, info) => {
    // Checking if there is an error, is there is an user and if the user is admin or not
    if (error || !user || (req.baseUrl == '/songs' && user.id != 1)) {
      res.status(401).json(info);
    } else {
      next();
    };
  })(req, res, next);
};
