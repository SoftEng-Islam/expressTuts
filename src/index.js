const express = require('express');
const app = express();
const PORT = 3001;

app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
    res.send({
        item: 'harry potter'
    })
});

app.post("")