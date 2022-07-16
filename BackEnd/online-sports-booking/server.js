const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
dotenv.config( { path : 'config.env'} );

const bodyparser = require('body-parser');

const OBSAdmin = require('./server/controller/OBSAdmin');

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

app.use('/api/OBSAdmin',OBSAdmin)