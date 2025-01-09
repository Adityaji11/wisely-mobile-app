const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../Model/userModel');

// Configure Passport to use Local Strategy
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: 'Invalid email or password' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return done(null, false, { message: 'Invalid email or password' });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOneAndUpdate(
        { googleId: profile.id },
        { name: profile.displayName, email: profile.emails[0].value },
        { upsert: true, new: true }
      );
      return done(null, user);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOneAndUpdate(
        { facebookId: profile.id },
        { name: `${profile.name.givenName} ${profile.name.familyName}`, email: profile.emails[0].value },
        { upsert: true, new: true }
      );
      return done(null, user);
    }
  )
);

// Serialize user for session
passport.serializeUser((user, done) => done(null, user.id));

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});


module.exports = passport;
