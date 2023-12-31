const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/expressTuts')
.then(()=>console.log('connected To DB'))
.catch((error)=>console.log(error));