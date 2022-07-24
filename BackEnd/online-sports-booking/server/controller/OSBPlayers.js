const express = require('express');
var router = express.Router();
var OSBPlayers = require('../model/OSBPlayers');
var OSBTournament = require('../model/OSBTournament');
const loginUser = require('./loginUserDetails');
const ObjectId = require('mongodb').ObjectID;


router.get('/:id/:team', async (req, res) => {
    let loginDetails = await loginUser.getDetails(req.headers.loginuser)
    if (loginDetails._id) {
        if (req.headers.authorization === process.env.Authorization) {
            OSBTournament.find({ _id: req.params.id }, function (err, data) {
                if (!err) {
                    let output = [];
                    data[0].team.forEach(item => {
                        if (item._id == req.params.team) {
                            output.push(item.Player);
                        }
                    });
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

router.post('/filter', async (req, res) => {
    let loginDetails = await loginUser.getDetails(req.headers.loginuser)
    if (loginDetails._id) {
        if (req.headers.authorization === process.env.Authorization) {
            res.send(JSON.stringify({ isSuccess: true, message: "API is not created" }))
        }
        else {
            res.send(JSON.stringify({ isSuccess: false, message: 'Authorization Token is not Valid' }))
        }
    }
    else {
        res.send(JSON.stringify({ isSuccess: false, message: 'Login user is not Valid' }))
    }
});

router.get('/:id/:team/:player', async (req, res) => {
    let loginDetails = await loginUser.getDetails(req.headers.loginuser)
    if (loginDetails._id) {
        if (req.headers.authorization === process.env.Authorization) {
            OSBTournament.find({ _id: req.params.id }, function (err, data) {
                try {
                    if (!err) {
                        let output = [];
                        data[0].team.forEach(item => {
                            if (item._id == req.params.team) {
                                item.Player.forEach(play => {
                                    if (play._id == req.params.player) {
                                        output.push(play);
                                    }
                                })
                            }
                        });
                        res.send(JSON.stringify(output));
                    }
                    else {
                        res.send(err.toString())
                    }
                } catch (err) {
                    res.send(JSON.stringify({ isSuccess: false, message: err.toString() }))
                }
            })
        }
        else {
            res.send(JSON.stringify({ isSuccess: false, message: 'Authorization Token is not Valid' }))
        }
    }
    else {
        res.send(JSON.stringify({ isSuccess: false, message: 'Login user is not Valid' }))
    }
});

router.post('/:id/:team', async (req, res) => {

    let loginDetails = await loginUser.getDetails(req.headers.loginuser)
    if (loginDetails._id) {
        if (req.headers.authorization === process.env.Authorization) {

            let obj = {};
            obj.PlayerName = req.body.PlayerName;
            obj.Status = req.body.Status;
            obj.CreatedBy = loginDetails;
            obj.Created = new Date();
            obj.ModifiedBy = loginDetails;
            obj.Modified = new Date()

            OSBTournament.find({ _id: req.params.id }, function (err, data) {
                if (!err) {
                    var newObj = new OSBTournament(data[0]);
                    newObj.team.forEach(function (a) {
                        if (a._id == req.params.team) {
                            a.Player.push(obj);
                        }
                    })
                    newObj.save();
                    res.send(JSON.stringify(newObj))
                }
                else {
                    res.send(JSON.stringify(data))
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

router.put('/:id/:team/:player', async (req, res) => {
    let loginDetails = await loginUser.getDetails(req.headers.loginuser)
    if (loginDetails._id) {
        if (req.headers.authorization === process.env.Authorization) {

            OSBTournament.find({ _id: req.params.id }, function (err, data) {
                if (!err) {
                    var newObj = new OSBTournament(data[0]);
                    newObj.team.forEach(function (a) {
                        if (a._id == req.params.team) {
                            a.Player.forEach(play => {
                                if (play._id == req.params.player) {
                                    req.body.PlayerName ? play.PlayerName = req.body.PlayerName : false;
                                    req.body.Status ? play.Status = req.body.Status : false;
                                    play.ModifiedBy = loginDetails;
                                    play.Modified = new Date();
                                }
                            });
                        }
                    })
                    newObj.save();
                    res.send(JSON.stringify(newObj))
                }
                else {
                    res.send(JSON.stringify(data))
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

router.delete('/:id/:team/:player', async (req, res) => {
    let loginDetails = await loginUser.getDetails(req.headers.loginuser)
    if (loginDetails._id) {
        if (req.headers.authorization === process.env.Authorization) {
            OSBTournament.find({ _id: req.params.id }, function (err, data) {
                if (!err) {
                    var newObj = new OSBTournament(data[0]);
                    newObj.team.forEach(function (a) {
                        if (a._id == req.params.team) {
                            a.Player.forEach(play => {
                                if (play._id == req.params.player) {
                                    play.remove();
                                }
                            });
                        }
                    })
                    newObj.save();
                    let output = { isSuccess: false, message: "Successfully Deleted" }
                    res.send(JSON.stringify(output));
                }
                else {
                    res.send(JSON.stringify(data))
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

module.exports = router;