const express = require('express');
var router = express.Router();
var OSBListTeam = require('../model/OSBListTeam');
var OSBTournament = require('../model/OSBTournament');
const loginUser = require('./loginUserDetails');
const ObjectID = require('mongodb').ObjectID;


router.get('/:id', (req, res) => {
    if (req.headers.authorization === process.env.Authorization) {
        OSBTournament.find({ _id: req.params.id }, function (err, data) {
            if (!err) {
                res.send(JSON.stringify(data[0].team))
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

router.get('/:id/:team', async (req, res) => {
    let loginDetails = await loginUser.getDetails(req.headers.loginuser)
    if (loginDetails._id) {
        if (req.headers.authorization === process.env.Authorization) {
            let output = await findTeamByID(req.params.id,req.params.team);
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
            obj.TeamName = req.body.TeamName;
            obj.Status = req.body.Status;
            obj.CreatedBy = loginDetails;
            obj.Created = new Date();
            obj.ModifiedBy = loginDetails;
            obj.Modified = new Date()

            OSBTournament.updateOne({ _id: req.params.id },
                { $push: { team: obj } }, function (err, data) {
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

router.put('/:id/:team', async (req, res) => {
    let loginDetails = await loginUser.getDetails(req.headers.loginuser)
    if (loginDetails._id) {
        if (req.headers.authorization === process.env.Authorization) {
            let obj = {};
            req.body.TeamName ? obj.TeamName = req.body.TeamName : false;
            req.body.Status ? obj.Status = req.body.Status : false;
            obj.ModifiedBy = loginDetails;
            obj.Modified = new Date();
            OSBTournament.updateOne({ "team._id": req.params.team },
                { '$set': { 'team.$': obj } }, function (err, data) {
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

router.delete('/:id/:team', async (req, res) => {
    let loginDetails = await loginUser.getDetails(req.headers.loginuser)
    if (loginDetails._id) {
        if (req.headers.authorization === process.env.Authorization) {
            try {
                OSBTournament.find({ _id: req.params.id }, function (err, data) {
                    if (!err) {
                        var newObj = new OSBTournament(data[0]);
                        newObj.team.forEach(function (a) {
                            if (a._id == req.params.team) {
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
            OSBTournament.find({ _id: id }, function (err, data) {
                if (!err) {
                    var newObj = new OSBTournament(data[0]);
                    let result = [];
                    newObj.team.forEach(function (a) {
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
module.exports = { router, findTeamByID };