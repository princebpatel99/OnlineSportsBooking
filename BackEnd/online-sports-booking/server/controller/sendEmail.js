const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var OSBAdmin = require('../model/OSBRegister');


router.get('/authenticate/:id', (req, res) => {
   
    OSBAdmin.find({ _id: req.params.id }, function (error, data) {
        if (!error) {
            var obj = new OSBAdmin(data[0]);
            obj.isVarified = true;
            obj.save();
            res.send('Email Verification is Successfull')
        }
    });
});

router.post('/verify/:id', (req, res) => {
    if (req.headers.authorization === process.env.Authorization) {
        OSBAdmin.find({ _id: req.params.id }, function (error, data) {
            if (!error) {
                try{
                let fullName = data[0].fullName;
                let toEmail = data[0].email;
                var transporter = nodemailer.createTransport({
                    host: "smtp-mail.outlook.com", // hostname
                    secureConnection: false, // TLS requires secureConnection to be false
                    port: 587, // port for secure SMTP
                    tls: {
                        ciphers: 'SSLv3'
                    },
                    auth: {
                        user: process.env.ServiceAccount,
                        pass: process.env.ServiceAccountPassword
                    }
                });

                var mailOptions = {
                    from: '"My Sports Club " <' + process.env.ServiceAccount + '>', // sender address (who sends)
                    to: toEmail, // list of receivers (who receives)
                    subject: 'Verify Your Email', // Subject line
                    text: 'Hello ' + fullName, // plaintext body
                    html: '<br> Please verify your account by clicking on below link <br/> <a href="' + process.env.HostURL + '/api/sendEmail/authenticate/' + req.params.id + '">Verify Now</a>' // html body
                };

                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        res.send(JSON.stringify({ isSuccess: false, message: err.toString() }))
                    }
                    else {
                        res.send(JSON.stringify({ isSuccess: true, message: 'Successfully Sent Email' }))
                    }
                });
                }
                catch(ex){
                    es.send(JSON.stringify({ isSuccess: false, message: ex.toString() }))
                }
            }
            else {
                res.send(JSON.stringify({ isSuccess: false, message: error.toString() }))
            }
        });
    }
    else {
        res.send(JSON.stringify({ isSuccess: false, message: 'Authorization Token is not Valid' }))
    }
});




module.exports = router;