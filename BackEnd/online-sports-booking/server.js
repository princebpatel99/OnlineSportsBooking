const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
dotenv.config( { path : 'config.env'} );
const bodyparser = require('body-parser');


const OSBGame = require('./server/controller/OSBGame');
const OSBGround = require('./server/controller/OSBGround');
const OSBInventory = require('./server/controller/OSBInventory');
const OSBInventoryTxn = require('./server/controller/OSBInventoryTxn');
const OSBListTeam = require('./server/controller/OSBListTeam');
const OSBMatchTeam = require('./server/controller/OSBMatchTeam');
const OSBRegister = require('./server/controller/OSBRegister');
const OSBSlotBook = require('./server/controller/OSBSlotBook');
const OSBSports = require('./server/controller/OSBSports');
const OSBTournament = require('./server/controller/OSBTournament');
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

app.use('/api/OSBGame',OSBGame);
app.use('/api/OSBGround',OSBGround);
app.use('/api/OSBInventory',OSBInventory);
app.use('/api/OSBInventoryTxn',OSBInventoryTxn);
app.use('/api/OSBListTeam',OSBListTeam);
app.use('/api/OSBMatchTeam',OSBMatchTeam);
app.use('/api/OSBRegister',OSBRegister);
app.use('/api/OSBSlotBook',OSBSlotBook);
app.use('/api/OSBSports',OSBSports);
app.use('/api/OSBTournament',OSBTournament);
app.use('/api/sendEmail',sendEmail);
