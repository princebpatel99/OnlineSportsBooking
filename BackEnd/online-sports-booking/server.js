const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
dotenv.config( { path : 'config.env'} );
const bodyparser = require('body-parser');
const OSBRegister = require('./server/controller/OSBRegister');
const sendEmail = require('./server/controller/sendEmail');

const PORT = process.env.PORT || 8080;

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.get('/',(req,res)=>{
    res.send('Open');
});
app.listen(PORT);


app.use(cors({
    origin: '*'
}));

app.use('/api/OSBRegister',OSBRegister);
app.use('/api/sendEmail',sendEmail);