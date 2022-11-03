const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../model/userModel');

const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;

passport.use(
    new jwtStrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            // jwtFromRequest: extractJwt.fromUrlQueryParameter('secret_token')
            jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken() // Use this if you are using Bearer token
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);

// Create and save the user into the database and send the user information
// to the next middleware upon success else throws an error
passport.use(
    'signup',
    new localStrategy(
        {
            email: 'email',
            password: 'password',
        },
        async (email, password, done) => {
            try {
                const user = await UserModel.create({ email, password });

                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

// Authenticate the user with the email and password and send the user info to the next
// middleware if found, else throw an error
passport.use(
    'login',
    new localStrategy(
        {
            email: 'email',
            password: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await UserModel.findOne({ email });

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }

                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);