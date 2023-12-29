const  {Router} = require('express');
const router = Router();


router.post('/auth/login', (req, res) => {
    const {username, password} = req.body;
    if(username && password) {
        if(req.session.user) {
            res.send('You are already logged in!');
        } else {
            req.session.user = {
                username
            };
            res.send(req.session);
        }
    } else {
        res.send(401);
    }
})

module.exports = router;