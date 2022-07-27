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

            let result = await bookASlot(req.body.FromDate, req.body.ToDate, req.body.FromTime, req.body.ToTime, req.body.GroundName, req.body.Sports, req.body.Status, req.body.BookBy, req.body.isTournament, req.body.tournamentID, req.body.totalPeople, loginDetails)
            res.send(result);
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

async function bookASlot(From, To, fromTime, totime, Ground, Sports, Status, BookBy, isTournament, tournamentID, totalPeople, loginDetails) {
    return new Promise(async function (resolve, reject) {

        let slot = await checkIsAvailable(From, To, fromTime, totime, Ground);
        if (JSON.stringify(slot) === JSON.stringify({}) || slot) {
            var obj = new OSBSlotBook();
            obj.FromDate = new Date(From);
            obj.ToDate = new Date(To);
            obj.FromTime = fromTime;
            obj.ToTime = totime;
            obj.GroundName = Ground;
            obj.Sports = Sports;
            obj.Status = Status;
            obj.BookBy = BookBy;
            obj.isTournament = isTournament;
            obj.tournamentID = tournamentID;
            obj.totalPeople = totalPeople;
            obj.CreatedBy = loginDetails;
            obj.Created = new Date();
            obj.ModifiedBy = loginDetails;
            obj.Modified = new Date();

            obj.save((err, doc) => {
                if (!err) {
                    // var json = JSON.stringify(doc);
                    resolve(JSON.stringify({ isSuccess: true, message: "Successfully Booked a slot" }));
                }
                else {
                    resolve(JSON.stringify({ isSuccess: false, message: err.toString() }));
                }
            });
        }
        else {
            console.log(slot)
            resolve(JSON.stringify({ isSuccess: false, message: "Slot is not available" }));
        }
    });
}
function checkIsAvailable(FromDate, ToDate, fTime, tTime, Ground) {
    

    return new Promise(function (resolve, reject) {
        let filter = { $and: [{ FromDate: { $lte: new Date(FromDate) } }, { ToDate: { $gte: new Date(FromDate) } }, { GroundName: Ground }] }
        let filter2 = { $and: [{ FromDate: { $lte: new Date(ToDate) } }, { ToDate: { $gte: new Date(ToDate) } }, { GroundName: Ground }] }
        let filterQuery = { $or: [filter, filter2] }

        try {
            OSBSlotBook.find(filterQuery, function (err, data) {
                if (!err) {
                    let isAvailable = false;
                    // console.log("Data",data)
                    if (data.length == 0) {
                        isAvailable = true;
                    }
                    console.log(data)
                    // else {

                    //     let dbMinFromDate = data.reduce((acc, element) => {
                    //         let dbFromDate = new Date(element.FromDate);
                    //         dbFromDate.setHours(element.FromTime.split(":")[0]);
                    //         dbFromDate.setMinutes(element.FromTime.split(":")[1]);

                    //         if (dbFromDate < acc) {
                    //             acc = dbFromDate;
                    //         }
                    //         return acc;
                    //     }, new Date());

                    //     let dbMaxToDate = data.reduce((acc, element) => {
                    //         let dbToDate = new Date(element.ToDate);
                    //         dbToDate.setHours(element.ToTime.split(":")[0]);
                    //         dbToDate.setMinutes(element.ToTime.split(":")[1]);

                    //         if (dbToDate > acc) {
                    //             acc = dbToDate;
                    //         }
                    //         return acc;
                    //     }, new Date());

                    //     let arr = [];
                    //     var x = data.filter((x) => { return });
                    //     function filterDate(date) {

                    //     }
                    //     data.forEach(element => {
                    //         let dbFromDate = new Date(element.FromDate);
                    //         dbFromDate.setHours(element.FromTime.split(":")[0]);
                    //         dbFromDate.setMinutes(element.FromTime.split(":")[1]);

                    //         let dbToDate = new Date(element.ToDate);
                    //         dbToDate.setHours(element.ToTime.split(":")[0]);
                    //         dbToDate.setMinutes(element.ToTime.split(":")[1]);

                    //         let userFromDate = new Date(FromDate);
                    //         userFromDate.setHours(fTime.split(":")[0])
                    //         userFromDate.setMinutes(fTime.split(":")[1])

                    //         let userToDate = new Date(ToDate);
                    //         userToDate.setHours(tTime.split(":")[0])
                    //         userToDate.setMinutes(tTime.split(":")[1])


                    //         if ((userFromDate <= dbMinFromDate && userToDate <= dbMaxToDate) || (userFromDate >= dbMinFromDate && userToDate >= dbMaxToDate)) {
                    //             isAvailable = true;
                    //         }

                    //         // if(new Date (element.FromDate+' '+element.FromTime) >= new Date(FromDate+' '+fTime) && new Date(element.ToDate+' '+element.ToTime) <= new Date(ToDate+' '+tTime)){
                    //         //     isAvailable = true;
                    //         // }
                    //     });
                    // }
                    resolve(isAvailable)
                }
                else {
                    console.log(err)
                    resolve({})
                }
            })
        } catch (err) {
            console.log(err)
            resolve({})
        }
    });
}
module.exports = router;