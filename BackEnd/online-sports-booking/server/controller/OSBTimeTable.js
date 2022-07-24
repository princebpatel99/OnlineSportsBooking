const express = require('express');
var router = express.Router();
var OSBTournament = require('../model/OSBTournament');
const loginUser = require('./loginUserDetails');
const findTeamByID = require('./OSBListTeam').findTeamByID;



router.get('/:id', (req, res) => {
    if (req.headers.authorization === process.env.Authorization) {
        OSBTournament.find({ _id: req.params.id }, function (err, data) {
            if (!err) {
                res.send(JSON.stringify(data[0].schedule))
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

router.get('/:id/:schedule', async (req, res) => {
    let loginDetails = await loginUser.getDetails(req.headers.loginuser)
    if (loginDetails._id) {
        if (req.headers.authorization === process.env.Authorization) {
            let result  = await getByID(req.params.id,req.params.schedule);
            res.send(result);
            // OSBTournament.find({ _id: req.params.id }, function (err, data) {
            //     if (!err) {
            //         var newObj = new OSBTournament(data[0]);
            //         let result = [];
            //         newObj.schedule.forEach(function (a) {
            //             if (a._id == req.params.schedule) {
            //                 result.push(a);
            //             }
            //         });
            //         res.send(JSON.stringify(result));
            //     }
            //     else {
            //         res.send(JSON.stringify({ isSuccess: false, message: err.toString() }))
            //     }
            // });


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

            let team1 = await findTeamByID(req.params.id, req.body.teamOne);
            let team2 = await findTeamByID(req.params.id, req.body.teamTwo);

            let obj = {};
            obj.teamOne = JSON.parse(team1)[0];
            obj.teamTwo = JSON.parse(team2)[0];
            obj.ground = req.body.ground;
            obj.StartDate = req.body.StartDate;
            obj.EndDate = req.body.EndDate;
            obj.CreatedBy = loginDetails;
            obj.Created = new Date();
            obj.ModifiedBy = loginDetails;
            obj.Modified = new Date()

            OSBTournament.updateOne({ _id: req.params.id },
                { $push: { schedule: obj } }, function (err, data) {
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

router.put('/:id/:schedule', async (req, res) => {
    let loginDetails = await loginUser.getDetails(req.headers.loginuser)
    if (loginDetails._id) {
        if (req.headers.authorization === process.env.Authorization) {

            let team1, team2;
            if (req.body.teamOne) {
                team1 = await findTeamByID(req.params.id, req.body.teamOne);
            }
            if (req.body.teamTwo) {
                team2 = await findTeamByID(req.params.id, req.body.teamTwo);
            }

            let result = await getByID(req.params.id,req.params.schedule);

            let obj = JSON.parse(result)[0];
            req.body.teamOne ? obj.teamOne = JSON.parse(team1)[0] : false;
            req.body.teamTwo ? obj.teamTwo = JSON.parse(team2)[0] : false;

            req.body.ground ? obj.ground = req.body.ground : false;
            req.body.StartDate ? obj.StartDate = req.body.StartDate : false;
            req.body.EndDate ? obj.EndDate = req.body.EndDate : false;
            obj.ModifiedBy = loginDetails;
            obj.Modified = new Date()

            OSBTournament.updateOne({ "schedule._id": req.params.schedule },
                { '$set': { 'schedule.$': obj } }, function (err, data) {
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

router.delete('/:id/:schedule', async (req, res) => {
    let loginDetails = await loginUser.getDetails(req.headers.loginuser)
    if (loginDetails._id) {
        if (req.headers.authorization === process.env.Authorization) {
            try {
                OSBTournament.find({ _id: req.params.id }, function (err, data) {
                    if (!err) {
                        var newObj = new OSBTournament(data[0]);
                        newObj.schedule.forEach(function (a) {
                            if (a._id == req.params.schedule) {
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

async function getByID(id,sch) {
    return new Promise(function (resolve, reject) {
        try {
            OSBTournament.find({ _id: id }, function (err, data) {
                if (!err) {
                    var newObj = new OSBTournament(data[0]);
                    let result = [];
                    newObj.schedule.forEach(function (a) {
                        if (a._id == sch) {
                            result.push(a);
                        }
                    });
                    resolve(JSON.stringify(result));
                }
                else {
                    resolve(JSON.stringify({ isSuccess: false, message: err.toString() }))
                }
            });
        } catch (err) {
            resolve({})
        }
    });
}
module.exports = router;