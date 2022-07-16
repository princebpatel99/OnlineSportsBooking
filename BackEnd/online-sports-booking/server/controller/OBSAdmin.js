const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var OSBAdmin = require('../model/OBSAdmin');


router.get('/', (req, res) => {
    OSBAdmin.find({}, function (err, data) {
        if (!err) {
            res.send(JSON.stringify(data))
        }
    })
});

router.post('/filter', (req, res) => {
    let filter = req.body.filter;
    
    OSBAdmin.find(filter, function (err, data) {
        if (!err) {
            res.send(JSON.stringify(data))
        }
        else{
            res.send(JSON.stringify({isSuccess:false,message:err.toString()}))
        }
    })
});

router.get('/:id', (req, res) => {
    OSBAdmin.find({_id:req.params.id}, function (err, data) {
        if (!err) {
            res.send(JSON.stringify(data))
        }
    })
});

router.post('/', (req, res) => {
    var obj = new OSBAdmin();
    obj.fullName = req.body.fullName;
    obj.email = req.body.email;
    obj.mobile = req.body.mobile;
    obj.password = req.body.password;

    obj.save((err, doc) => {
        if (!err) {
            var json = JSON.stringify(doc);
            res.send(json);
        }
        else {
            res.send(JSON.stringify({ isSuccess: false, message: err.toString() }));
        }
    });
});

router.put('/:id', (req, res) => {
    var obj = {};
    req.body.fullName ? obj.fullName = req.body.fullName : false;
    req.body.email ? obj.email = req.body.email : false;
    req.body.mobile ? obj.mobile = req.body.mobile : false;
    req.body.password ? obj.password = req.body.password : false;
    OSBAdmin.findByIdAndUpdate(req.params.id,
        obj, function (err, data) {
            if (err) {
                let output = { isSuccess: false, message: err.toString() }
                res.send(JSON.stringify(output));
            }
            else {
                let output = { isSuccess: true, message: 'Successfully Updated' }
                res.send(JSON.stringify(output));
            }
        });
});

router.delete('/:id', (req, res) => {
    OSBAdmin.findByIdAndDelete((req.params.id), 
    function(err, data) {
        if (err) {
            let output = { isSuccess: false, message: err.toString() }
            res.send(JSON.stringify(output));
        }
        else {
            let output = { isSuccess: true, message: 'Successfully Deleted' }
            res.send(JSON.stringify(output));
        }
    }); 
});

module.exports = router;