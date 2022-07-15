const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config( { path : 'config.env'} );

const bodyparser = require('body-parser');
const connectDB = require('./server/database/connection');
const User = require('./server/controller/controller');
connectDB();
const PORT = process.env.PORT || 8080;

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.get('/',(req,res)=>{
    res.send('Open');
});


app.listen(PORT);

app.use('/employee',User)