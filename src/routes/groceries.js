const {Router} = require('express');

const router = Router();


const groceryList = [
    {
        item: 'harry potter'
    },
    {
        item: 'LordoftheFlies'
    },
    {
        item: 'milk'
    },
];


router.get("/groceries",
    (req, res, next) => {
        console.log('before handling request.');
        next();
    },
    (req, res, next) => {
        res.cookie('visited', true, {
            maxAge: 60000
        });
        res.send(groceryList);
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

router.get('/groceries/:item', (req, res) =>{
    console.log(req.cookies);
    const {item} = req.params;
    const groceryItem = groceryList.find((g) => g.item === item);
    console.log(item);
    res.send(groceryItem);
    res.status(200).send();
});



// ----------------------
// POST Method
router.post("/groceries", (req, res, next) => {
    console.log(req.body);
    books.push(req.body);
    res.status(201).send();
});

module.exports = router;