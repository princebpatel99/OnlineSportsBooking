const express = require('express');
var router = express.Router();
var OSBListTeam = require('../model/OSBListTeam');
const loginUser = require('./loginUserDetails')


router.get('/', (req, res) => {
    if (req.headers.authorization === process.env.Authorization) {
        OSBListTeam.find({}, function (err, data) {
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
        OSBListTeam.find(filter, function (err, data) {
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
        OSBListTeam.find({ _id: req.params.id }, function (err, data) {
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
            var obj = new OSBListTeam();
            obj.tournamentId = req.body.tournamentId;
            obj.tournamentName = req.body.tournamentName;
            obj.teamName = req.body.teamName;
            obj.playerName = req.body.playerName;
            obj.status = req.body.status;
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
            req.body.tournamentId ? obj.tournamentId = req.body.tournamentId : false;
            req.body.tournamentName ? obj.tournamentName = req.body.tournamentName : false;
            req.body.teamName ? obj.teamName = req.body.teamName : false;
            req.body.playerName ? obj.playerName = req.body.playerName : false;
            req.body.status ? obj.status = req.body.status : false;
            obj.ModifiedBy = loginDetails;
            obj.Modified = new Date();
            OSBListTeam.findByIdAndUpdate(req.params.id,
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
        OSBListTeam.findByIdAndDelete((req.params.id),
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