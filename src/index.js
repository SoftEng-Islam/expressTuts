const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const groceriesRoute = require('./routes/groceries');
const bookMarket = require('./routes/booksMarket');
const app = express();
const PORT = 3001;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(session({
    secret: "R444g4g5h5hhtyy4twetryhtrhj5ju5",
    resave: false,
    saveUninitialized: false
}));


app.use((req,res,next)=>{
    console.log(req.url);
    next();
});

// Prefix with api word
app.use('/api', groceriesRoute);
app.use('/api', bookMarket);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

// https://google.com/?q=java&filterBy=