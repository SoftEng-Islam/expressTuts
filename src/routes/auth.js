const  {Router} = require('express');
const router = Router();


const passport = require('passport');
const {hashPassword, comparePassword} = require('../utils/helpers');

const User = require('../database/schemas/User');


// router.post('/auth/login', async (req, res) => {
//     const {username, password} = req.body;
//     if(!username || !password) return res.sendStatus(400);
//     const userDB = await User.findOne({username});
//     if(!userDB) return res.sendStatus(401);

//     const isValid = comparePassword(password, userDB.password);
//     if(isValid) {
//         console.log('Authenticated Successfully!');
//         req.session.user = userDB;
//         return res.sendStatus(200);
//     } else {
//         console.log('failed to Authenticate');
//         return res.sendStatus(401);
//     }

//     // if(username && password) {
//     //     if(req.session.user) {
//     //         res.send('You are already logged in!');
//     //     } else {
//     //         req.session.user = {
//     //             username
//     //         };
//     //         res.send(req.session);
//     //     }
//     // } else {
//     //     res.send(401);
//     // }
// })

router.post('/auth/login', passport.authenticate('local'), (req, res) => {
    console.log('Logged in!');
    res.sendStatus(200);
    res.redirect('/');

});

router.post('/auth/register', async (req,res) =>{
    const {username, email} = req.body;
    const userDB = await User.findOne({$or:[{username}, {email}]});
    if(userDB) {
        res.sendStatus(400).send({msg: 'User already exists!'});
    } else {
        const password = hashPassword(req.body.password);
        console.log(password);
        const newUser = await User.create({username,password,email});
        newUser.save();
        res.sendStatus(201);
    }
})

module.exports = router;