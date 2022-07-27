const express = require('express');
var router = express.Router();
var OSBInventoryTxn = require('../model/OSBInventoryTxn');

var OSBInventory = require('../model/OSBInventory');
const loginUser = require('./loginUserDetails')


router.get('/:id', (req, res) => {
    if (req.headers.authorization === process.env.Authorization) {
        OSBInventory.find({ _id: req.params.id }, function (err, data) {
            if (!err) {
                res.send(JSON.stringify(data[0].transaction))
            }
        });
    }
    else {
        res.send(JSON.stringify({ isSuccess: false, message: 'Authorization Token is not Valid' }))
    }
});

router.post('/filter', (req, res) => {
    if (req.headers.authorization === process.env.Authorization) {
        res.send(JSON.stringify({ isSuccess: true, message: 'API is not created' }))
    }
    else {
        res.send(JSON.stringify({ isSuccess: false, message: 'Authorization Token is not Valid' }))
    }
});

router.get('/:id/:txn', async (req, res) => {
    let loginDetails = await loginUser.getDetails(req.headers.loginuser)
    if (loginDetails._id) {
        if (req.headers.authorization === process.env.Authorization) {
            let output = await findTeamByID(req.params.id,req.params.txn);
            res.send(output);
        }
        else {
            res.send(JSON.stringify({ isSuccess: false, message: 'Authorization Token is not Valid' }))
        }
    }
    else {
        res.send(JSON.stringify({ isSuccess: false, message: 'Login user is not Valid' }))
    }
});

router.post('/:id', async (req, res) => {
    let loginDetails = await loginUser.getDetails(req.headers.loginuser)
    if (loginDetails._id) {
        if (req.headers.authorization === process.env.Authorization) {
            // var obj = new OSBListTeam();
            let obj = {};
            obj.qty = req.body.qty;
            obj.purchaseDate = req.body.purchaseDate;
            obj.returnDate = req.body.returnDate;
            obj.CreatedBy = loginDetails;
            obj.Created = new Date();
            obj.ModifiedBy = loginDetails;
            obj.Modified = new Date()

            OSBInventory.updateOne({ _id: req.params.id },
                { $push: { transaction: obj } }, function (err, data) {
                    if (err) {
                        let output = { isSuccess: false, message: err.toString() }
                        res.send(JSON.stringify(output));
                    }
                    else {
                        res.send(JSON.stringify(obj));
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

router.put('/:id/:txn', async (req, res) => {
    let loginDetails = await loginUser.getDetails(req.headers.loginuser)
    if (loginDetails._id) {
        if (req.headers.authorization === process.env.Authorization) {
            let obj = {};
            req.body.qty ? obj.qty = req.body.qty : false;
            req.body.purchaseDate ? obj.purchaseDate = req.body.purchaseDate : false;
            req.body.returnDate ? obj.returnDate = req.body.returnDate : false;
            obj.ModifiedBy = loginDetails;
            obj.Modified = new Date();
            OSBInventory.updateOne({ "transaction._id": req.params.txn },
                { '$set': { 'transaction.$': obj } }, function (err, data) {
                    if (err) {
                        let output = { isSuccess: false, message: err.toString() }
                        res.send(JSON.stringify(output));
                    }
                    else {
                        res.send(JSON.stringify(obj));
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

router.delete('/:id/:txn', async (req, res) => {
    let loginDetails = await loginUser.getDetails(req.headers.loginuser)
    if (loginDetails._id) {
        if (req.headers.authorization === process.env.Authorization) {
            try {
                OSBInventory.find({ _id: req.params.id }, function (err, data) {
                    if (!err) {
                        var newObj = new OSBInventory(data[0]);
                        newObj.transaction.forEach(function (a) {
                            if (a._id == req.params.txn) {
                                a.remove();
                            }
                        })
                        newObj.save();
                        let output = { isSuccess: true, message: "Successfully Deleted" }
                        res.send(JSON.stringify(output));
                    }
                    else {
                        res.send(JSON.stringify(data))
                    }
                });
            }
            catch (err) {
                let output = { isSuccess: false, message: err.toString() }
                res.send(JSON.stringify(output));
            }
        }
        else {
            res.send(JSON.stringify({ isSuccess: false, message: 'Authorization Token is not Valid' }))
        }
    }
    else {
        res.send(JSON.stringify({ isSuccess: false, message: 'Login user is not Valid' }))
    }
});

async function findTeamByID(id, teamID) {
    return new Promise(function (resolve, reject) {
        try {
            OSBInventory.find({ _id: id }, function (err, data) {
                if (!err) {
                    var newObj = new OSBTournament(data[0]);
                    let result = [];
                    newObj.transaction.forEach(function (a) {
                        if (a._id == teamID) {
                            result.push(a);
                        }
                    });
                    resolve(JSON.stringify(result));
                }
                else {
                    resolve(JSON.stringify({ isSuccess: false, message: err.toString() }));
                }
            });
        } catch (err) {
            resolve({})
        }
    });
}

module.exports = router;