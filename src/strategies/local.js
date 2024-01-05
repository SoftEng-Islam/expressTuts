const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../database/schemas/User');
const { comparePassword } = require('../utils/helpers');


passport.use(
    new Strategy({
        usernameField: 'username'
    }, async (username, password, done) => {
        console.log(username);
        console.log(password);
        if (!username || !password) {
            // done(new Error('bad request'), null);
            throw new Error('missing credentials');
        }
        const userDB = await User.fineOne({ username });
        if (!userDB) throw new Error('User not found');
        const isValid = comparePassword(password, userDB.password);
        if (isValid) {
            console.log('Authenticated Successfully!');
            req.session.user = userDB;
            return res.sendStatus(200);
        } else {
            console.log('failed to Authenticate');
            return res.sendStatus(401);
        }
    })
);