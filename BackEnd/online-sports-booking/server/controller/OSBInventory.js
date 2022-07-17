const express = require('express');
var router = express.Router();
var OSBInventory = require('../model/OSBInventory');
const loginUser = require('./loginUserDetails')


router.get('/', (req, res) => {
    if (req.headers.authorization === process.env.Authorization) {
        OSBInventory.find({}, function (err, data) {
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
        OSBInventory.find(filter, function (err, data) {
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
        OSBInventory.find({ _id: req.params.id }, function (err, data) {
            if (!err) {
                res.send(JSON.stringify(data))
            }
        })
    }
    else {
        res.send(JSON.stringify({ isSuccess: false, message: 'Authorization Token is not Valid' }))
    }
});

router.post('/', async (req, res) => {
    let loginDetails = await loginUser.getDetails(req.headers.loginuser)
    if (loginDetails._id) {
        if (req.headers.authorization === process.env.Authorization) {
            var obj = new OSBInventory();
            obj.name = req.body.name;
            obj.qty = req.body.qty;
            obj.Invoice = req.body.Invoice;
            obj.DateOfPurchase = req.body.DateOfPurchase;
            obj.CreatedBy = loginDetails;
            obj.Created = new Date();
            obj.ModifiedBy = loginDetails;
            obj.Modified = new Date()

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
    }
    else {
        res.send(JSON.stringify({ isSuccess: false, message: 'Login user is not Valid' }))
    }
});

router.put('/:id', async (req, res) => {
    let loginDetails = await loginUser.getDetails(req.headers.loginuser)
    if (loginDetails._id) {
        if (req.headers.authorization === process.env.Authorization) {
            var obj = {};
            req.body.name ? obj.name = req.body.name : false;
            req.body.qty ? obj.qty = req.body.qty : false;
            req.body.Invoice ? obj.Invoice = req.body.Invoice : false;
            req.body.DateOfPurchase ? obj.DateOfPurchase = req.body.DateOfPurchase : false;
            obj.ModifiedBy = loginDetails;
            obj.Modified = new Date();
            OSBInventory.findByIdAndUpdate(req.params.id,
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
    }
    else {
        res.send(JSON.stringify({ isSuccess: false, message: 'Login user is not Valid' }))
    }
});

router.delete('/:id', (req, res) => {
    if (req.headers.authorization === process.env.Authorization) {
        OSBInventory.findByIdAndDelete((req.params.id),
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