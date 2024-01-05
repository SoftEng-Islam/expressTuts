const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../database/schemas/User');
const { comparePassword } = require('../utils/helpers');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id,done) => {
    console.log(id);
});

passport.use(
    new Strategy({
        usernameField: 'username'
    }, async (username, password, done) => {
        console.log(username);
        console.log(password);
        try {
            if (!username || !password) {
                // done(new Error('bad request'), null);
                throw new Error('missing credentials');
            }
            const userDB = await User.findOne({ username });
            if (!userDB) throw new Error('User not found');
            const isValid = comparePassword(password, userDB.password);
            if (isValid) {
                console.log('Authenticated Successfully!');
                done(null, userDB);
            } else {
                console.log('Invalid Authentication');
                done(null,null);
            }
        } catch(err) {
            console.log(err);
            done(err,null);
        }
    })
);