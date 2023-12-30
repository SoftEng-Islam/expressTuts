const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const groceriesRoute = require('./routes/groceries');
const bookMarket = require('./routes/booksMarket');
const authRoute = require('./routes/auth');


const app = express();
const PORT = 3001;

mongoose.connect('mongodb://localhost:27017/expressTuts')
.then(()=>console.log('connected To DB'))
.catch((error)=>console.log(error));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use((req,res,next)=>{
    console.log(req.url);
    next();
});

// Prefix with api word
app.use('/api', groceriesRoute);
app.use('/api', bookMarket);
app.use('/api', authRoute);

app.use((req,res, next)=>{
    if(req.session.user) next();
    else res.status(401).send();
})


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

// https://google.com/?q=java&filterBy=