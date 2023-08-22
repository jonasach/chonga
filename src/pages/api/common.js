const passport = require('passport');
const session = require('express-session');
const OnshapeStrategy = require('passport-onshape');
const config = require('./config');

// Passport strategy setup using Onshape
passport.use(new OnshapeStrategy({
  clientID: config.oauthClientId,
  clientSecret: config.oauthClientSecret,
  callbackURL: config.oauthCallbackUrl,
  authorizationURL: `${config.oauthUrl}/oauth/authorize`,
  tokenURL: `${config.oauthUrl}/oauth/token`,
  userProfileURL: `${config.oauthUrl}/api/users/sessioninfo`
}, (accessToken, refreshToken, profile, done) => {
  profile.accessToken = accessToken;
  profile.refreshToken = refreshToken;
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Session middleware configuration
export const sessionMiddleware = session({
  // Configuration details here...
});

// Passport initialization
export const passportInitialize = passport.initialize();
export const passportSession = passport.session();

// Function to refresh access token
export const refreshAccessToken = async (user) => {
  // Logic to refresh the access token here...
};
