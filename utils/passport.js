const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('../models/User');
require('dotenv').config();

const secret = process.env.JWT_SECRET

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

passport.use(
    new JwtStrategy(opts, (payload, done) => {
        User.findById(payload._id)
            .then(user => {
                if (user) {
                    return done(null, user)
                }
                return done(null, false)
            })
            .catch(err => console.log(err));
    })
)