const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(PORT, ()=> {
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

app.get("/", (req, res) => {
    res.send(books);
});

app.post("/", (req, res)=> {
    console.log(req.body);
    // res.send(201);
    res.status(201).send();
})