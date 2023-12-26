const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.url);
    next();
});


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

const books = [
    {
        item: 'harry potter'
    },
    {
        item: 'LordoftheFlies'
    },
];

app.get("/books",
    (req, res, next) => {
        console.log('before handling request.');
        next();
    },
    (req, res, next) => {
        res.send(books);
        next();
    },
    (req, res, next) => {
        console.log('Finished Executing GET Request.');
        next()
    },
    (req, res, next) =>{
        console.log('The end');
    }
);

app.post("/books", (req, res, next) => {
    console.log(req.body);
    books.push(req.body);
    res.status(201).send();
});