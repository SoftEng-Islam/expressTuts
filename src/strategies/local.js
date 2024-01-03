const passport = require('passport');
const { Strategy } = require('passport-local');



passport.use(
    new Strategy({
        usernameField: 'username'
    }, (username, password, done) =>{

    })
)