const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = require('../config');

passport.serializeUser((user, done) => {
  console.log('Serializing user:', user);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log('Deserializing user ID:', id);
    const user = await User.findById(id);
    if (!user) {
      console.log('User not found');
      return done(null, false);
    }
    console.log('Found user:', user);
    done(null, user);
  } catch (err) {
    console.error('Deserialize error:', err);
    done(err);
  }
});

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existing = await User.findOne({ googleId: profile.id });
    if (existing) return done(null, existing);
    const user = await User.create({ googleId: profile.id, email: profile.emails && profile.emails[0] && profile.emails[0].value, name: profile.displayName, avatar: profile.photos && profile.photos[0] && profile.photos[0].value });
    done(null, user);
  } catch (err) {
    done(err);
  }
}));

module.exports = passport;
