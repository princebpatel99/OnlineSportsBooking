const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var OSBAdmin = require('../model/OSBRegister');


router.get('/', (req, res) => {
    if (req.headers.authorization === process.env.Authorization) {
        OSBAdmin.find({}, function (err, data) {
            if (!err) {
                res.send(JSON.stringify(data))
            }
        });
    }
    else {
        res.send(JSON.stringify({ isSuccess: false, message: 'Authorization Token is not Valid' }))
    }
});

router.post('/filter', (req, res) => {
    if (req.headers.authorization === process.env.Authorization) {
        let filter = req.body.filter;
        OSBAdmin.find(filter, function (err, data) {
            if (!err) {
                res.send(JSON.stringify(data))
            }
            else {
                res.send(JSON.stringify({ isSuccess: false, message: err.toString() }))
            }
        })
    }
    else {
        res.send(JSON.stringify({ isSuccess: false, message: 'Authorization Token is not Valid' }))
    }
});

router.get('/:id', (req, res) => {
    if (req.headers.authorization === process.env.Authorization) {
        OSBAdmin.find({ _id: req.params.id }, function (err, data) {
            if (!err) {
                res.send(JSON.stringify(data))
            }
        })
    }
    else {
        res.send(JSON.stringify({ isSuccess: false, message: 'Authorization Token is not Valid' }))
    }
});

router.post('/', (req, res) => {
    if (req.headers.authorization === process.env.Authorization) {
        var obj = new OSBAdmin();
        obj.fullName = req.body.fullName;
        obj.email = req.body.email;
        obj.mobile = req.body.mobile;
        obj.password = req.body.password;
        obj.gender = req.body.gender;
        obj.status = req.body.status;
        obj.role = req.body.role;

        obj.save((err, doc) => {
            if (!err) {
                var json = JSON.stringify(doc);
                res.send(json);
            }
            else {
                res.send(JSON.stringify({ isSuccess: false, message: err.toString() }));
            }
        });
    }
    else {
        res.send(JSON.stringify({ isSuccess: false, message: 'Authorization Token is not Valid' }))
    }
});

router.put('/:id', (req, res) => {
    if (req.headers.authorization === process.env.Authorization) {
        var obj = {};
        req.body.fullName ? obj.fullName = req.body.fullName : false;
        req.body.email ? obj.email = req.body.email : false;
        req.body.mobile ? obj.mobile = req.body.mobile : false;
        req.body.password ? obj.password = req.body.password : false;
        req.body.gender ? obj.gender = req.body.gender : false;
        req.body.status ? obj.status = req.body.status : false;
        req.body.role ? obj.role = req.body.role : false;
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
    }
    else {
        res.send(JSON.stringify({ isSuccess: false, message: 'Authorization Token is not Valid' }))
    }
});

router.delete('/:id', (req, res) => {
    if (req.headers.authorization === process.env.Authorization) {
        OSBAdmin.findByIdAndDelete((req.params.id),
            function (err, data) {
                if (err) {
                    let output = { isSuccess: false, message: err.toString() }
                    res.send(JSON.stringify(output));
                }
                else {
                    let output = { isSuccess: true, message: 'Successfully Deleted' }
                    res.send(JSON.stringify(output));
                }
            });
    }
    else {
        res.send(JSON.stringify({ isSuccess: false, message: 'Authorization Token is not Valid' }))
    }
});

module.exports = router;