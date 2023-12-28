const express = require('express');
const groceriesRoute = require('./routes/groceries');
const bookMarket = require('./routes/booksMarket');
const app = express();
const PORT = 3001;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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