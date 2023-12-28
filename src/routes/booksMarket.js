const {Router} = require('express');
const router = Router();

const bookList = [
    {
        bookName: 'Learn Js',
        pages: 233,
    },
    {
        bookName: 'php For losers',
        pages: 133,
    },
    {
        bookName: 'Node And ExpressJs',
        pages: 343,
    },
];

// ----------------------
// GET Method
router.get("/bookMarket", (req, res) => {
    console.log(req.query);
    const {pages} = req.query;
    const parsedPages = parseInt(pages);
    if(!isNaN(parsedPages)) {
        const filteredBookList = bookList.filter((b)=> b.pages <= parsedPages);
        res.send(filteredBookList);
    } else {
        res.send(bookList);
    }
})

// ----------------------
// POST Method
router.post("/bookMarket", (req, res) => {
    console.log(req.body);
    bookList.push(req.body);
    res.status(201).send();
});

module.exports = router;