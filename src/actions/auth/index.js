import Express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import Logger from '../../lib/Logger.js';
import UserDb from '../../lib/UserDb.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const LocalStrategy = passportLocal.Strategy;
const userData = new UserDb();

const app = Express.Router();

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
  async (username, password, done) => {
    Logger.info(username);
    Logger.info(password);

    // Get user from database
    const user = await userData.findOne(username);

    // Check if user is found
    if (!user) {
      return done(null, false, { message: "User not found in database" })
    }

    // Check on valid password
    if (!await isPassWordValid(password, user.password)) {
      return done(null, false, { message: "Password incorrect" })
    }

    // Return the existing and authenticated user
    return done(null, user);
  }
));

// Login
app.post('/login', (req, res) => {
  // Do authentication
  passport.authenticate('local', (error, user, info) => {
    // console.log(user)
    if (error) {
      res.status(401).send(info);
    } else if (!user) {
      res.status(401).send(info);
    } else {

      const token = jwt.sign(user, process.env.JWT_UNIQUE_KEY, {
        expiresIn: parseInt(process.env.JWT_LIFETIME)
      });

      res.status(200).json({
        success: true,
        token: token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    }
  })(req, res);
})

// Hash password
app.post('/hashpass', (req, res) => {

  bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUNDS)).then(function(hash) {
    res.status(200).send(hash);
  });

});

app.get('/', (req, res) => {
  res.status(200).json({
    "message": "Everything is fine"
  });
});

export default app;

const isPassWordValid = async (userPassword, dbPassword) => {
  const match = await bcrypt.compare(userPassword, dbPassword);
  return match;
};
