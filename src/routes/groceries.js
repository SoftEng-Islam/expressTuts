const {Router} = require('express');

const router = Router();


const groceryList = [
    {
        item: 'harry potter',
        quantity: 3
    },
    {
        item: 'LordoftheFlies',
        quantity: 5
    },
    {
        item: 'milk',
        quantity: 10
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



router.get('/groceries/cart', (req, res) => {
    const {cart} = req.session;
    console.log('cart');
    if(!cart) {
        res.send('Yu have no cart session');
    } else {
        res.send(cart)
    }
});
router.post('/groceries/cart/item', (req, res) => {
    const {item, quantity} = req.body;
    const cartItem = {item, quantity};
    console.log(cartItem);
    // res.send(req.sessionID);
    const {cart} = req.session;
    if(cart) {
        req.session.cart.items.push(cartItem);
    } else {
        req.session.cart = {
            items: [cartItem],
        }
    }
    res.status(201).send();
})

module.exports = router;