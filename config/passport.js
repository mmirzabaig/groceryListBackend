const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: '797038845956-i168jiphh91h5ljr6pd9u3scc94l0qu5.apps.googleusercontent.com',
  clientSecret: 'YOanZbcgouurONg5nEvLIY0AW',
  callbackURL: 'http://localhost:3000/oauth2callback'
}, (accessToken, refreshToken, profile, cb) => {
  // a user has logged in with OAuth
}));
