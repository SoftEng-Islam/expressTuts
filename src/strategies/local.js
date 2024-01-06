const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../database/schemas/User');
const { comparePassword } = require('../utils/helpers');

passport.serializeUser((user, done) => {
    console.log('serializing user');
    console.log(user);
    done(null, user.id);
});
passport.deserializeUser(async (id,done) => {
    console.log('dserializing user');
    console.log(id);
    try {
        const user = await User.findOne(id);
        if(!user) throw new Error('User not found');
        done(null, user);
        console.log(user);
    } catch (err) {
        console.log(err);
        done(err,null);
    }
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