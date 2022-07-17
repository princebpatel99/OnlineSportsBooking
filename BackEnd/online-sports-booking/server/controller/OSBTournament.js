const express = require('express');
var router = express.Router();
var OSBTournament = require('../model/OSBTournament');
const loginUser = require('./loginUserDetails')


router.get('/', (req, res) => {
    if (req.headers.authorization === process.env.Authorization) {
        OSBTournament.find({}, function (err, data) {
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
        OSBTournament.find(filter, function (err, data) {
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
        OSBTournament.find({ _id: req.params.id }, function (err, data) {
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
            var obj = new OSBTournament();
            obj.TournamentName = req.body.TournamentName;
            obj.Sport = req.body.Sport;
            obj.noOfTeam = req.body.noOfTeam;
            obj.dateOfTournament = req.body.dateOfTournament;
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
            req.body.TournamentName ? obj.TournamentName = req.body.TournamentName : false;
            req.body.Sport ? obj.Sport = req.body.Sport : false;
            req.body.noOfTeam ? obj.noOfTeam = req.body.noOfTeam : false;
            req.body.dateOfTournament ? obj.dateOfTournament = req.body.dateOfTournament : false;
            obj.ModifiedBy = loginDetails;
            obj.Modified = new Date();
            OSBTournament.findByIdAndUpdate(req.params.id,
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
        OSBTournament.findByIdAndDelete((req.params.id),
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