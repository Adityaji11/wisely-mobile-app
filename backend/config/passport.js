const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const { User } = require('../src/models');
const Logs = require('../src/utils/Logs');
const Helper = require('../src/utils/Helper');
const Accounts = require('../src/utils/Accounts');


const LOCAL_STRATEGY_CONFIG = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false
};

/**
 * Configuration object for JWT strategy
 */
const JWT_STRATEGY_CONFIG = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    passReqToCallback: false
};

// Serialize user for session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user from session
passport.deserializeUser(async (user, done) => {
    done(null, user);
});

// Passport strategy for Basic authentication
passport.use(new BasicStrategy(
    async (username, password, done) => {

        try {

            // Find user by username
            const user = await User.findOne({ "api.apiKey": username, "api.secretKey": password });

            if (!user) {
                return done('Incorrect credentials.', false);
            }

            var [err, response] = await Helper.to(Accounts.getUserById(user.user_id));

            if (err) {
                throw err
            }

            if (response.status === 'error') {
                throw response.message;
            }

            const accountUser = response.data;

            if (!accountUser) {
                throw "User not exist!";
            }

            done(null, accountUser);
        } catch (err) {
            Logs.error(err);
            return done(null, false, { message: 'User not found!' });
        }
    }
));

//Jwt strategy
passport.use('jwt', new JwtStrategy(JWT_STRATEGY_CONFIG, async (payload, done) => {
    try {

        const user = await User.findOne({ user_id: payload.id });

        if (!user) {
            return done('Incorrect credentials.', false);
        }

        var [err, response] = await Helper.to(Accounts.getUserById(user.user_id));

        if (err) {
            throw err
        }

        if (response.status === 'error') {
            throw response.message;
        }

        const accountUser = response.data;

        if (!accountUser) {
            throw "User not exist!";
        }

        done(null, accountUser);
    } catch (err) {
        Logs.error(err);
        return done(null, false, { message: 'User not found!' });
    }
}));

/**
 * As we're not comparing the password that's why commented this Passport local strategy for username/password authentication
 * It will be handled by the Account application.
 */
// passport.use(new LocalStrategy(
//     LOCAL_STRATEGY_CONFIG,
//     async (email, password, done) => {
//         try {
//             let user = await User.findOne({ email });

//             if (!user) {
//                 return done('Incorrect username or password.', false);
//             }

//             const isMatch = await bcrypt.compare(password, user.password);

//             if (!isMatch) {
//                 return done('Incorrect username or password.', false);
//             }

//             return done(null, user);
//         } catch (err) {
//             Logs.error(err);
//             return done(null, false, { message: 'Internal server error.' });
//         }
//     }
// ));