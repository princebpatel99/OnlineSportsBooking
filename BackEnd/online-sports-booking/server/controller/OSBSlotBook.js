const express = require('express');
var router = express.Router();
var OSBSlotBook = require('../model/OSBSlotBook');
const loginUser = require('./loginUserDetails')


router.get('/', (req, res) => {
    if (req.headers.authorization === process.env.Authorization) {
        OSBSlotBook.find({}, function (err, data) {
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
        OSBSlotBook.find(filter, function (err, data) {
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
        OSBSlotBook.find({ _id: req.params.id }, function (err, data) {
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
            var obj = new OSBSlotBook();
            obj.Date = req.body.Date;
            obj.From = req.body.From;
            obj.To = req.body.To;
            obj.GroundName = req.body.GroundName;
            obj.Sports = req.body.Sports;
            obj.Status = req.body.Status;
            obj.BookBy = req.body.BookBy;
            obj.isTournament = req.body.isTournament;
            obj.tournamentID = req.body.tournamentID;
            obj.MatchId = req.body.MatchId;
            obj.totalPeople = req.body.totalPeople;
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
            req.body.Date ? obj.Date = req.body.Date : false;
            req.body.From ? obj.From = req.body.From : false;
            req.body.To ? obj.To = req.body.To : false;
            req.body.GroundName ? obj.GroundName = req.body.GroundName : false;
            req.body.Sports ? obj.Sports = req.body.Sports : false;
            req.body.Status ? obj.Status = req.body.Status : false;
            req.body.BookBy ? obj.BookBy = req.body.BookBy : false;
            req.body.isTournament ? obj.isTournament = req.body.isTournament : false;
            req.body.tournamentID ? obj.tournamentID = req.body.tournamentID : false;
            req.body.MatchId ? obj.MatchId = req.body.MatchId : false;
            req.body.totalPeople ? obj.totalPeople = req.body.totalPeople : false;
            
            obj.ModifiedBy = loginDetails;
            obj.Modified = new Date();
            OSBSlotBook.findByIdAndUpdate(req.params.id,
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
        OSBSlotBook.findByIdAndDelete((req.params.id),
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